/*
  代码来源自以下，

  change for npm modules.
  by Luiz Estácio.

  json-format v.1.1
  http://github.com/phoboslab/json-format

  Released under MIT license:
  http://www.opensource.org/licenses/mit-license.php
*/
(function() {

  var p = [];

  var indentConfig = {
    tab: {
      char: '\t',
      size: 1
    },
    space: {
      char: ' ',
      size: 4
    }
  };

  var configDefault = {
    type: 'tab'
  };

  var push = function(m) {
    return '\\' + p.push(m) + '\\';
  };

  var pop = function(m, i) {
    return p[i - 1]
  };

  var tabs = function(count, indentType) {
    return new Array(count + 1).join(indentType);
  };

  // JSON格式化三条规则：
  // {、[：后加换行，该类型每次换行，后面每行内容要增加两个空格
  // }、]：前加换行，该类型每次换行，后面每行内容（包括自身）减少两个空格
  // ,：后加换行
  function format(json, indentType) {

    p = [];

    var out = "";
    var indent = 0;

    // Extract backslashes and strings
    json = json
      .replace(/\\./g, push)
      .replace(/(".*?"|'.*?')/g, push)
      .replace(/\s+/, '');

    // Indent and insert newlines
    for (var i = 0; i < json.length; i++) {

      var c = json.charAt(i);

      switch (c) {
        case '{':
        case '[':
          out += c + "\n" + tabs(++indent, indentType);
          break;

        case '}':
        case ']':
          out += "\n" + tabs(--indent, indentType) + c;
          break;

        case ',':
          out += ",\n" + tabs(indent, indentType);
          break;

        case ':':
          out += ": ";
          break;

        default:
          out += c;
          break;

      }
    }

    // Strip whitespace from numeric arrays and put backslashes 
    // and strings back in
    out = out
      .replace(/\[[\d,\s]+?\]/g, function(m) {
        return m.replace(/\s/g, '');
      })
      .replace(/\\(\d+)\\/g, pop) // strings
      .replace(/\\(\d+)\\/g, pop); // backslashes in strings

    return out;

  };

  function jsonFormat(json, config) {

    config = config || configDefault;
    var indent = indentConfig[config.type];

    if (indent == null) {
      throw new Error('Unrecognized indent type: "' + config.type + '"');
    }

    var indentType = new Array((config.size || indent.size) + 1).join(indent.char);

    return format(JSON.stringify(json), indentType);

  }

  if (typeof define === 'function') {
    define(function() {
      return jsonFormat;
    });
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = jsonFormat;
  }

  function isInWindow() {
    return 'undefined' !== typeof window && /^\[object (?:Window|DOMWindow|global)\]$/.test(toString.call(window));
  }
  if (isInWindow()) {
    window.util = window.util || {}
    window.util.jsonFormat = jsonFormat;
  }

})()
