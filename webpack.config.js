const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

// 文件清理
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

// 源代码路径
const src = `${__dirname}/src`;

// 文件后缀正则
const suffix = /\.(m)?js$/;


function getFileInfo(path) {

  path = fs.realpathSync(path);

  // 文件名作为键，相对于配置文件的相对路径作为值
  let key = path.split('/');
  key = key[key.length - 1].replace(suffix, '');
  let val = path.replace(__dirname, '.');

  return {
    [key]: val
  };
}

function generateEntry(path) {

  let fileInfo = {};

  let dir = fs.readdirSync(path);
  let stat;
  for (let item of dir) {
    let p = `${path}/${item}`;
    stat = fs.statSync(p);
    if (stat.isFile()) {
      (p.endsWith('.mjs') || p.endsWith('.js')) && Object.assign(fileInfo, getFileInfo(p));
    } else {
      Object.assign(fileInfo, generateEntry(p));
    }
  }

  return fileInfo;
}

function getDate() {
  function addZero(val) {
    val = val + '';
    return val[1] ? val : `0${val}`;
  }
  let d = new Date();
  return `${d.getFullYear()}${addZero(d.getMonth() + 1)}${addZero(d.getDate())}${addZero(d.getHours())}${addZero(d.getMinutes())}`;
}

function getRelativePath(path, name) {
  let dir = fs.readdirSync(path);
  let p, stat, fileInfo, result;
  for (let item of dir) {
    p = `${path}/${item}`;
    stat = fs.statSync(p);
    if (stat.isFile()) {
      if ((p.endsWith('.mjs') || p.endsWith('.js'))) {
        fileInfo = getFileInfo(p);
        // console.log(fileInfo, name, fileInfo[name]);
        if (fileInfo[name])
          return fileInfo[name];
      }
    } else {
      result = getRelativePath(p, name);
      if (result)
        return result;
    }
  }
}

function getEntryPath(src, files) {
  return files.map(name => {
    return getRelativePath(src, name);
  })
}

module.exports = (env, args) => {

  let options;

  let files = process.env.FILES && process.env.FILES.trim() || '';
  if (files === '') {
    // 没有指定文件，默认对所有文件独立打包
    options = {
      entry: generateEntry(src),
      output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].min.js',
      }
    };
  } else {
    // 指定了文件，则只对指定文件合并打包
    options = {
      entry: {
        main: getEntryPath(src, files.split(',')),
      },
      output: {
        path: path.join(__dirname, 'dist'),
        filename: `${getDate()}-min.js`,
      }
    };
  }

  console.log(options);

  return {
    ...options,
    module: {
      rules: [{
        test: suffix,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      }],
    },
    plugins: [
      new CleanWebpackPlugin(),
    ],
    mode: 'production',
  }
}
