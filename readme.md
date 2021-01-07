## 收集或总结常用工具函数
- 只适于浏览器宿主环境的工具函数放在browser文件夹下

- 不分环境的工具函数放在common文件夹下

- dist文件夹存放压缩过的工具函数

	比如压缩./browser/device.js文件，可执行如下命令，

	```bash
	FILE_PATH='./browser' FILE_NAME='device' npm run minify
	```

	最后在dist文件夹下生成device.min.js文件。

	注：压缩的代码中不支持ES6，如箭头函数、扩展运算符、模板表达式、解构赋值、for...in语句

- test.html和test.js用于检验压缩的工具函数

