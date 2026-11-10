(function () {
  "use strict";

  var glossary = window.TMATH_GLOSSARY || {};
  var match = window.location.pathname.match(/module_(\d+)\/([^/]+\.html)$/);
  if (!match) return;

  var key = "module_" + match[1] + "/" + match[2];
  var pageTerms = glossary[key];
  if (!pageTerms) return;

  var isGlossaryPage = /definitions_and_examples\.html$/.test(key);

  function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function normalizeTerm(value) {
    return value
      .replace(/[’‘]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function regexTerm(value) {
    return escapeRegex(value)
      .replace(/['’]/g, "['’]")
      .replace(/["“”]/g, '["“”]');
  }

  var terms = Object.keys(pageTerms).map(function (term) {
    return {
      term: term,
      lower: term.toLowerCase(),
      text: pageTerms[term].text,
      remaining: 1
    };
  }).sort(function (a, b) {
    return b.term.length - a.term.length;
  });

  if (!terms.length) return;

  var byLower = {};
  terms.forEach(function (entry) {
    var key = normalizeTerm(entry.term);
    if (!byLower[key]) byLower[key] = entry;
  });

  var pattern = new RegExp(
    "(?<![A-Za-z0-9])(" + terms.map(function (entry) {
      return regexTerm(entry.term);
    }).join("|") + ")(?![A-Za-z0-9])",
    "gi"
  );

  function isSkipped(node) {
    var element = node.parentElement;
    while (element) {
      var tag = element.tagName;
      if (/^(CODE|PRE|SCRIPT|STYLE|A|H1|H2|H3|H4|H5|H6|BUTTON|TEXTAREA|INPUT|SELECT|OPTION)$/.test(tag)) {
        return true;
      }
      if (element.classList && (
        element.classList.contains("glossary-term") ||
        element.classList.contains("MathJax") ||
        element.classList.contains("math")
      )) {
        return true;
      }
      if (tag && /^MJX-/.test(tag)) return true;
      element = element.parentElement;
    }
    return false;
  }

  function makeSpan(text, description) {
    var span = document.createElement("span");
    span.className = "glossary-term";
    span.title = description;
    span.textContent = text;
    return span;
  }

  function wrapPlainText(text) {
    var fragment = document.createDocumentFragment();
    var lastIndex = 0;
    var found = false;
    var localPattern = new RegExp(pattern.source, "gi");
    var m;

    while ((m = localPattern.exec(text)) !== null) {
      var matched = m[0];
      var entry = byLower[normalizeTerm(matched)];
      if (!entry || entry.remaining <= 0) continue;

      if (m.index > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, m.index)));
      }
      fragment.appendChild(makeSpan(matched, entry.text));
      entry.remaining -= 1;
      lastIndex = m.index + matched.length;
      found = true;
    }

    if (!found) return null;
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
    return fragment;
  }

  function processTextNode(node) {
    if (isGlossaryPage) return;
    var value = node.nodeValue.replace(/\s+/g, " ");
    if (!value || !value.trim() || isSkipped(node)) return;
    if (!node.parentElement || !node.parentElement.closest("strong, b")) return;
    node.nodeValue = value;

    var mathPattern = /(\$\$[\s\S]*?\$\$|\\\([\s\S]*?\\\))/g;
    var parts = value.split(mathPattern);
    if (parts.length === 1) {
      var replacement = wrapPlainText(value);
      if (replacement) node.parentNode.replaceChild(replacement, node);
      return;
    }

    var fragment = document.createDocumentFragment();
    var changed = false;

    parts.forEach(function (part, index) {
      if (!part) return;
      if (index % 2 === 1) {
        fragment.appendChild(document.createTextNode(part));
        return;
      }
      var wrapped = wrapPlainText(part);
      if (wrapped) {
        fragment.appendChild(wrapped);
        changed = true;
      } else {
        fragment.appendChild(document.createTextNode(part));
      }
    });

    if (changed) node.parentNode.replaceChild(fragment, node);
  }

  function unboldRepeatedTerms(root) {
    var highlighted = terms
      .filter(function (entry) { return entry.remaining === 0; })
      .map(function (entry) { return normalizeTerm(entry.term); });

    var bolds = root.querySelectorAll("strong, b");
    Array.prototype.forEach.call(bolds, function (element) {
      if (element.querySelector(".glossary-term")) return;
      var text = element.textContent.replace(/\s+/g, " ").trim();
      var normalized = normalizeTerm(text);
      var entry = byLower[normalized];
      var shouldUnbold = entry && entry.remaining === 0;

      if (!shouldUnbold && normalized.indexOf(" ") === -1) {
        shouldUnbold = highlighted.some(function (term) {
          return term.indexOf(normalized + " ") === 0;
        });
      }

      if (shouldUnbold) {
        element.style.fontWeight = "normal";
      }
    });
  }

  function wrapGlossaryHeadings(root) {
    if (!/definitions_and_examples\.html$/.test(key)) return;
    var headings = root.querySelectorAll("h2");
    Array.prototype.forEach.call(headings, function (heading) {
      var text = heading.textContent.replace(/\s+/g, " ").trim();
      var entry = byLower[normalizeTerm(text)];
      if (!entry) return;
      heading.textContent = "";
      heading.classList.add("glossary-entry-heading");
      var span = makeSpan(text, entry.text);
      span.classList.add("glossary-heading-term");
      heading.appendChild(span);
    });
  }

  function run() {
    var root = document.querySelector(".wrap") || document.body;
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(processTextNode);
    if (!isGlossaryPage) {
      unboldRepeatedTerms(root);
    }
    wrapGlossaryHeadings(root);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
