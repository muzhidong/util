// 文件导出
(function(context) {

	if (typeof window === 'undefined') return;

	const exportFile = function(fileName, blob) {
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = fileName;
		link.click();
		link.remove();
		URL.revokeObjectURL(link.href);
	};

	window.exportFile = exportFile;

})(this);