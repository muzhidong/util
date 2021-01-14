(function(context) {

	// 保证数组中所有元素值唯一
	Array.prototype.unique = function() {

		//n为hash表，r为临时数组
		var n = {},
			r = [];

		//遍历当前数组
		for (var i = 0; i < this.length; i++) {
			//如果hash表中没有当前项
			if (!n[this[i]]) {
				//存入hash表
				n[this[i]] = true;
				//把当前数组的当前项push到临时数组里面 
				r.push(this[i]);
			}
		}

		return r;

	}

})(this)