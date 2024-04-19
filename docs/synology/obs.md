---
title: OBS + WHIP搭建直播网页
date: 2024-01-27
tags:
 - 直播
categories:
 - 群晖 
# sidebar: auto
---
::: tip
[网页地址](live.tjwxsty.cn:6677)

[容器链接](https://registry.hub.docker.com/r/ossrs/srs/)

Docker容器Tag：

    ossrs/srs:5

:::

## 参数配置
![](./img/240107_2_1.png)

## 前端直播页面

### 群晖WebStation配置
![](./img/240107_2_2.png)

html页面备份地址:

    /volume1/Review/live.rar

url填写后端容器推流地址
![](./img/240107_2_3.png)

## OBS配置
下载指定版本的OBS并安装插件备份地址：

    /volume1/Review/obs-beta.rar

### 参数配置
服务选择 ```WHIP```

服务器地址

    http://live.tjwxsty.cn:1985/rtc/v1/whip/?app=live&stream=livestream

![](./img/240107_2_4.png)

