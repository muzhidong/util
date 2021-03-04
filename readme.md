## 收集或总结常用工具函数
- 适用于浏览器环境的工具函数置于src/browser文件夹

- 通用工具函数置于src/common文件夹

- build文件夹存放打包好的工具函数

	执行如下命令，

	```bash
	npm run build
	```

  也可以指定需要的工具函数，如打包common文件夹下util、querystring两个文件，

  ```base
  FILES=util,querystring npm run build
  ```

	在build文件夹会生成XXX.min.js文件，XXX表示当前时间，精确到秒。

- test文件夹用于存放编写单元测试（暂未集成单元测试）

- doc文件夹用于存放说明文档

## 存在问题
- 部分工具函数存在隐患，可通过TODO:/FIXME:搜索
