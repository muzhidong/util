(function() {

  // 保证数组中所有元素值唯一，
  // 兼容了值为NaN和引用类型的情景
  Array.prototype.unique = function(key = "") {

    var hash = {};
    var temp = [];
    var k = key;

    for (var i = 0; i < this.length; i++) {
      if (!k) {
        if(toString.call(this[i]) === '[object Object]'){
          k = JSON.stringify(this[i]);
        }else{
          k = this[i];
        }  
      } else {
        k = this[i][key]
      }
  
      if (!hash[k]) { 
        hash[k] = true;
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

  // 插入有序数组后仍有序
  Array.prototype.insertSorted = function(value) {
    let low = 0;
    let high = this.length;
    let mid;
    while (low < high) {
      // like (num / 2) but faster
      mid = (low + high) >>> 1;
      if (this[mid] < value) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    this.splice(low, 0, value);
    return this;
  }

})()
