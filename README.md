# whistle.config

[whistle](http://wproxy.org/whistle/) 插件，监听项目根目录的配置文件并动态注册 whistle 匹配规则。

## 使用指南

1. 安装并启动 whistle： [安装启动](http://wproxy.org/whistle/install.html) 、[配置HTTPS](http://wproxy.org/whistle/webui/https.html)
2. 安装本插件：`npm i -g whistle.config`
3. 进入你的项目根目录，新建 `whistle.conf` 文件，在其中配置 [whistle 匹配规则](http://wproxy.org/whistle/pattern.html) 
4. 在项目启动时并行运行 `whistle.config`，如：`whistle.confg & umi dev`
    - `whistle.confg` 命令会监听配置文件，并将其规则注册至 whistle 中。
  
## Example

在确保完成上述 1、2 步骤后，下载并运行示例项目。
```shell
git clone git@github.com:lei4519/whistle.config.example.git
&& cd whistle.config.example
&& yarn add
&& yarn start
```
