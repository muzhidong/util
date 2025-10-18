// 文件导出
(function(context) {

  if (!(/^\[object (?:Window|DOMWindow|global)\]$/.test(toString.call(context)))) return;

  const exportFile = function(fileName, blob) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  }

  const html2word = function (fileName, html) {
    const blob = new Blob([html], { type: 'application/msword' });
    exportFile(fileName, blob);
  }

  context.util = context.util || {}
  context.util.exportFile = exportFile;
  context.util.html2word = html2word;

})(window);
