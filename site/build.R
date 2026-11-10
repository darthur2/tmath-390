#!/usr/bin/env Rscript

# Render the Module 5 R Markdown site into docs/site.
args <- commandArgs(trailingOnly = FALSE)
script_arg <- args[grep("^--file=", args)]
if (length(script_arg) > 0) {
  script_path <- sub("^--file=", "", script_arg[1])
  setwd(normalizePath(file.path(dirname(script_path), "..")))
}

if (!requireNamespace("rmarkdown", quietly = TRUE)) {
  stop("The rmarkdown package is required to build the site.")
}
if (!requireNamespace("yaml", quietly = TRUE)) {
  stop("The yaml package is required to build the site.")
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
  writeLines(html, html_path, useBytes = TRUE)
}

invisible(file.copy(
  "site/styles.css",
  file.path(out_root, "styles.css"),
  overwrite = TRUE
))

message("Rendered site to ", out_root)
