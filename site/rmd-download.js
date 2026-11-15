(function () {
  function downloadFromBlob(link) {
    fetch(link.href)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Unable to fetch R Markdown source.");
        }
        return response.text();
      })
      .then(function (text) {
        var filename =
          link.getAttribute("data-filename") ||
          link.getAttribute("download") ||
          "source.Rmd";
        var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        setTimeout(function () {
          URL.revokeObjectURL(url);
        }, 1000);
      })
      .catch(function () {
        window.location.href = link.href;
      });
  }

  document.addEventListener("click", function (event) {
    if (event.defaultPrevented || event.button !== 0) {
      return;
    }
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    var target = event.target;
    if (!target || typeof target.closest !== "function") {
      return;
    }
    var link = target.closest(".rmd-download a");
    if (!link) {
      return;
    }
    event.preventDefault();
    downloadFromBlob(link);
  });
})();
