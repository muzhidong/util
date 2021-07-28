(function() {

  // 保证数组中所有元素值唯一，
  // 兼容了值为NaN和引用类型的情景
  Array.prototype.unique = function() {

    var hash = {};
    var temp = [];
    var val;

    for (var i = 0; i < this.length; i++) {
  
      if(toString.call(this[i]) === '[object Object]'){
        val = JSON.stringify(this[i]);
      }else{
        val = this[i];
      }

      if (!hash[val]) { 
        hash[val] = true;
        temp.push(this[i]);
      }

    }

    return temp;

  }

  // 数组乱序
  // Fisher–Yates shuffle 洗牌算法：先从数组末尾开始，选取最后一个元素，与数组中随机一个位置的元素交换位置。然后在已经排好的最后一个元素以外的位置中，随机产生一个位置，让该位置元素与倒数第二个元素进行交换
  Array.prototype.shuffle = function() {
    let len = this.length;
    let i;
    while (len) {
        i = (Math.random() * len--) >>> 0;
        [this[len], this[i]] = [this[i], this[len]]
    }
    return this;
  }

})()
