(function() {

  const generateUUID = function() {
    // bits 12-15 of the time_hi_and_version field to 0010
    // bits 6-7 of the clock_seq_hi_and_reserved to 01
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0;
      var v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  /**
   * LRU缓存
   * FIFO队列，当插入新数据时，插到尾部，并检查是否超过队列长度，若是则删除头部数据；当访问旧数据时，会将其移动到队列尾部
   * 适合热点数据缓存，不适合偶发性、周期性批量操作
   */
  class LRUCache {
    maxCount = 0;
    lruQueue = [];

    constructor(maxCount) {
      this.maxCount = maxCount;
    }

    get(key) {
      const idx = this.lruQueue.findIndex(cache => cache.key === key);
      if (idx > -1) {
        const arr = this.lruQueue.splice(idx, 1);
        this.lruQueue.push(arr[0]);
        return arr[0].value;
      } else {
        return null;
      }
    }

    set(value) {
      const key = generateUUID();
      this.lruQueue.push({
        key,
        value,
      })
      if (this.lruQueue.length > this.maxCount) {
        this.lruQueue.shift();
      }
      return key;
    }

    print(ignore) {
      ignore && console.log('LRU Cache:')
      console.log(this.lruQueue.map(cache => cache));
    }
  }

  /**
   * 双队列缓存
   * 1.当插入新数据时，插入FIFO队列，若数据在FIFO队列中一直未被访问，则最终按FIFO规则淘汰；
   * 2.当数据在FIFO队列中被再次访问，则将数据移到LRU队列头部；
   * 3.当数据在LRU队列中中被再次访问，则将数据迁移到LRU队列头部，若数据在LRU队列中一直未被访问，则最终按LRU规则淘汰；
   * 根据使用频率和时间智能化淘汰，对批量突发图片的缓存污染有良好的防范能力。
   */

  // TODO:暂不支持根据缓存大小做限制
  class DoubleQueueCache{
    maxCount = 0;
    queue = [];
    LRUCache = null;
    // 存储数据在FIFO、LRU两队列的映射，key是FIFO队列的uuid,value是LRU队列的uuid
    hashMap = {};

    constructor(maxCount, LRUMaxCount) {
      this.maxCount = maxCount;
      this.LRUCache = new LRUCache(LRUMaxCount);
    }

    get(key) { 
      const idx = this.queue.findIndex(cache => cache.key === key);
      if (idx === -1) {
        const value = this.LRUCache.get(this.hashMap[key]);
        if (value !== null) {
          return value;
        } else {
          return null;
        }
      } else {
        const cache = this.queue.splice(idx, 1);
        const value = cache[0].value;
        Object.assign(this.hashMap, {
          [key]: this.LRUCache.set(value),
        });
        return value;
      }
    }

    set(value) { 
      const key = generateUUID();
      this.queue.push({
        key,
        value,
      })
      if (this.queue.length > this.maxCount) {
        this.queue.shift();
      }
      return key;
    }

    print() {
      console.group('Double Queue Cache:')
      console.log(this.queue.map(cache => cache.value));
      this.LRUCache.print(true);
      console.groupEnd();
    }
  }

  const CACHE = {
    LRUCache,
    DoubleQueueCache
  }

  if (typeof define === 'function') {
    define(function() {
      return CACHE;
    });
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CACHE;
  }
  // 是否处于window环境
  function isInWindow() {
    return 'undefined' !== typeof window && /^\[object (?:Window|DOMWindow|global)\]$/.test(toString.call(window));
  }
  if (isInWindow()) {
    window.util = window.util || {}
    for (let key in CACHE) {
      window.util[key] = CACHE[key];
    }
  }

})()
