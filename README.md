# whistle.config

[whistle](http://wproxy.org/whistle/) 插件，监听项目根目录的配置文件并动态注册 whistle 匹配规则。

## 使用指南

1. 安装并启动 whistle： [安装启动](http://wproxy.org/whistle/install.html) 、[配置 HTTPS](http://wproxy.org/whistle/webui/https.html)
2. 安装本插件：`npm i -g whistle.config`
3. 进入你的项目根目录，新建 `whistle.conf` 文件，在其中配置 [whistle 匹配规则](http://wproxy.org/whistle/pattern.html)
4. 在项目启动时并行运行 `whistle.config`，如：`whistle.confg & umi dev`
   - `whistle.confg` 命令会监听配置文件，并将其规则注册至 whistle 中。

## Example

在确保完成上述 1、2 步骤后，下载并运行示例项目。

```shell
git clone git@github.com:lei4519/whistle.config.example.git &&
cd whistle.config.example &&
yarn &&
yarn start
```

## 查看已注册的规则

两种方式（本质都一样）：

1. 访问 `https://local.whistlejs.com/plugin.config/`

2. 访问 `https://local.whistlejs.com`，左侧菜单 -> plugins -> config

   ![image-20210810145512453](https://gitee.com/lei451927/picture/raw/master/images/image-20210810145512453.png)



正常情况下通过 `ctrl + c` 等方式关闭进程时会将当前项目注册的规则删除掉，但是如果直接关机或关终端的方式则来不及执行操作。

插件启动时会开启一个进程定时（1分钟）检查 `whistle.config` 命令启动的进程是否还存活，如果进程已经结束则会将命令删除。

如果需要立刻删除命令，也可以自行在查看页面中点击对应规则的删除按钮进行删除。
