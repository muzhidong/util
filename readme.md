## 收集或总结常用工具函数
- 适用于浏览器环境的工具函数置于src/browser文件夹

- 通用工具函数置于common文件夹

- build文件夹存放打包好的工具函数

	比如压缩./browser/device.js文件，可执行如下命令，

	```bash
	FILES='hanzi2pinyin,querystring,time,util' npm run build
	```

	在build文件夹会生成device.min.js文件。

- test文件夹用于存放编写单元测试
