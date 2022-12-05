# 前端工具函数集录

## 项目结构

```text
- build                    打包目录             
- doc                      说明文档目录
- src                      
-- browser                 存放仅适用于浏览器使用的工具函数目录
-- common                  存放适用于浏览器和Node环境下的通用工具函数目录
- test                     单元测试用例目录
- .babelrc.json            babel配置
- .editorconfig            编辑器配置
- .gitignore               git忽略文件配置
- jest.config.js           jest配置
- jsdoc.config.json        jsdoc配置
- package.json             包配置
- README.md                README
- webpack.config.js        webpack打包配置
```

## 如何按需选择、快速使用

执行下面命令，打包工具

```bash
npm run build
```

此时在build文件夹生成所有工具，每个工具以XXX.min.js命名，XXX表示工具名称。

也可以指定需要的工具函数，比如只需打包common下的util、querystring两个工具，命令如下，

```bash
FILES=util,querystring npm run build
```

此时在build文件夹会生成XXX.min.js文件，XXX表示当前时间，精确到秒。

## 存在问题
- 部分工具函数存在隐患，可通过TODO:/FIXME:搜索
