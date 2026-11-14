#!/usr/bin/env Rscript

# Render the course R Markdown site into docs/site.
args <- commandArgs(trailingOnly = FALSE)
script_arg <- args[grep("^--file=", args)]
if (length(script_arg) > 0) {
  script_path <- sub("^--file=", "", script_arg[1])
  setwd(normalizePath(file.path(dirname(script_path), "..")))
}
project_root <- getwd()

if (!requireNamespace("rmarkdown", quietly = TRUE)) {
  stop("The rmarkdown package is required to build the site.")
}
if (!requireNamespace("yaml", quietly = TRUE)) {
  stop("The yaml package is required to build the site.")
}
if (!requireNamespace("xml2", quietly = TRUE)) {
  stop("The xml2 package is required to build the site.")
}

add_class <- function(node, cls) {
  existing <- xml2::xml_attr(node, "class")
  if (is.na(existing) || !nzchar(existing)) {
    xml2::xml_set_attr(node, "class", cls)
  } else if (!grepl(paste0("(^|\\s)", cls, "(\\s|$)"), existing)) {
    xml2::xml_set_attr(node, "class", trimws(paste(existing, cls)))
  }
}

transform_glossary <- function(html) {
  doc <- xml2::read_html(html)

  body <- xml2::xml_find_first(doc, "//body")
  if (inherits(body, "xml_missing")) {
    return(html)
  }
  add_class(body, "glossary-page")

  entries <- xml2::xml_find_all(
    doc,
    "//div[contains(@class, 'section') and contains(@class, 'level2')]"
  )

  last_letter <- ""
  for (entry in entries) {
    h2 <- xml2::xml_find_first(entry, "./h2")
    if (inherits(h2, "xml_missing")) {
      next
    }

    term <- trimws(xml2::xml_text(h2))
    if (!nzchar(term)) {
      next
    }

    letter <- toupper(substr(term, 1, 1))
    if (!identical(letter, last_letter)) {
      node <- xml2::read_xml(
        paste0('<h2 class="glossary-letter">', letter, "</h2>")
      )
      xml2::xml_add_sibling(entry, node, .where = "before")
      last_letter <- letter
    }

    xml2::xml_set_name(h2, "h3")
    add_class(entry, "glossary-entry")
  }

  labels <- xml2::xml_find_all(
    doc,
    "//div[contains(@class, 'glossary-entry')]//strong"
  )
  for (node in labels) {
    text <- trimws(xml2::xml_text(node))
    if (grepl("^(Definition|Source|Example [0-9]+|By hand|In R):$", text)) {
      xml2::xml_set_name(node, "span")
      add_class(node, "glossary-label")
    }
  }

  source_labels <- xml2::xml_find_all(
    doc,
    paste0(
      "//div[contains(@class, 'glossary-entry')]//p/",
      "span[contains(@class, 'glossary-label') and ",
      "starts-with(normalize-space(.), 'Source:')]"
    )
  )
  for (node in source_labels) {
    add_class(xml2::xml_parent(node), "glossary-source")
  }

  as.character(doc)
}

config <- yaml::read_yaml("site/_site.yml")
output_options <- config$output$html_document
output_options$css <- normalizePath("site/styles.css")
output_format <- do.call(rmarkdown::html_document, output_options)

out_root <- "docs/site"
unlink(out_root, recursive = TRUE)
dir.create(out_root, recursive = TRUE, showWarnings = FALSE)

rmd_files <- list.files(
  "site",
  pattern = "\\.Rmd$",
  recursive = TRUE,
  full.names = TRUE
)

for (input in rmd_files) {
  relative <- sub("^site/", "", input)
  out_dir <- file.path(out_root, dirname(relative))
  dir.create(out_dir, recursive = TRUE, showWarnings = FALSE)
  output_file <- sub("\\.Rmd$", ".html", basename(input))
  message("Rendering ", input)
  rmarkdown::render(
    input = input,
    output_format = output_format,
    output_file = output_file,
    output_dir = out_dir,
    quiet = TRUE
  )

  html_path <- file.path(out_dir, output_file)
  html <- paste(readLines(html_path, warn = FALSE), collapse = "\n")
  html <- gsub(
    "(?s)<!-- dynamically load mathjax for compatibility with self-contained -->.*?</script>",
    '<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"></script>',
    html,
    perl = TRUE
  )
  html <- gsub(
    "(?s)<span class=\"math inline\">(.*?)</span>",
    "\\1",
    html,
    perl = TRUE
  )
  html <- gsub("<span class=\"math display\">\\[", "$$", html, fixed = TRUE)
  html <- gsub("\\]</span>", "$$", html, fixed = TRUE)

  if (grepl("definitions_and_examples\\.html$", html_path)) {
    html <- transform_glossary(html)
  }

  rel_dir <- dirname(relative)
  depth <- if (identical(rel_dir, ".")) 0L else length(strsplit(rel_dir, "/")[[1]])
  prefix <- strrep("../", depth)
  script_tags <- paste0(
    '<script src="', prefix, 'glossary-terms.js"></script>\n',
    '<script src="', prefix, 'glossary-highlight.js"></script>\n'
  )
  html <- sub("</body>", paste0(script_tags, "</body>"), html, fixed = TRUE)
  writeLines(html, html_path, useBytes = TRUE)
}

invisible(file.copy(
  c("site/styles.css", "site/glossary-terms.js", "site/glossary-highlight.js"),
  out_root,
  overwrite = TRUE
))

m6_reading_files <- c(
  "site/module_6/why_sample_means_vary.Rmd",
  "site/module_6/when_does_the_central_limit_theorem_apply.Rmd",
  "site/module_6/sampling_distributions_in_practice.Rmd",
  "site/module_6/definitions_and_examples.Rmd"
)
m6_reading_dir <- file.path(project_root, "docs/module_6/reading_materials")
dir.create(m6_reading_dir, recursive = TRUE, showWarnings = FALSE)
for (input in m6_reading_files) {
  input_path <- file.path(project_root, input)
  base <- sub("\\.Rmd$", "", basename(input))
  rmarkdown::render(
    input = input_path,
    output_format = rmarkdown::html_document(
      self_contained = TRUE,
      css = file.path(project_root, "site/styles.css")
    ),
    output_file = paste0(base, ".html"),
    output_dir = m6_reading_dir,
    quiet = TRUE
  )
  unlink(file.path(m6_reading_dir, paste0(base, "_files")), recursive = TRUE)
  rmarkdown::render(
    input = input_path,
    output_format = rmarkdown::md_document(variant = "gfm"),
    output_file = paste0(base, ".md"),
    output_dir = m6_reading_dir,
    quiet = TRUE
  )
  md_path <- file.path(m6_reading_dir, paste0(base, ".md"))
  md_text <- paste(readLines(md_path, warn = FALSE), collapse = "\n")
  md_text <- gsub(paste0(m6_reading_dir, "/"), "", md_text, fixed = TRUE)
  writeLines(md_text, md_path, useBytes = TRUE)
}

root_index <- file.path(out_root, "index.html")
if (file.exists(root_index)) {
  root_html <- paste(readLines(root_index, warn = FALSE), collapse = "\n")
  root_html <- gsub(
    '(href|src)="(?!https?://|//|#|mailto:|data:|/|\\.\\.?/)',
    '\\1="site/',
    root_html,
    perl = TRUE
  )
  writeLines(root_html, file.path("docs", "index.html"), useBytes = TRUE)
}

message("Rendered site to ", out_root)
