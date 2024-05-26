---
title: Nginx 反向代理 MinIO
date: 2024-05-26
tags:
 - 对象存储
categories:
 - 群晖 
# sidebar: auto
---

::: tip
Docker容器Tag

    MinIO/MinIO

    nginx
:::
# 部署 MinIO

MinIO默认后台管理界面: **<http://0.0.0.0:9900>**

MinIO API: **<http://0.0.0.0:9000>**

例如下载`oss bucket`中的`demo.pptx`文件

    http://0.0.0.0:9000/oss/demo.pptx

::: danger
由于API接口为http请求，在https页面中不可用.

因此使用Nginx进行反向代理，使得可以在https页面发起https请求访问MinIO.
:::

# Nginx 配置步骤

## 配置一个 Nginx 容器

### 映射容器端口

|本地端口|容器端口|类型|
|---|---|---|
|9443|443|tcp|
|9880|80|tcp|

### 映射容器目录

|本地文件夹|容器文件夹|类型|
|---|---|---|
|docker/nginx-oss|/etc/nginx|rw|

## 准备一个域名，并下载SSL证书
::: tip
### 域名: oss.demo.cloud

### 证书: oss-demo-cloud.pem

### 密钥: oss-demo-cloud.key
:::

## 配置 Nginx 的配置文件

### 进入 docker/nginx-oss 目录
    /etc/nginx/                                                                                                                                
    |-- fastcgi_params                                                              
    |-- mime.types                                                                  
    |-- nginx.conf                                                                  
    |-- scgi_params                                                                 
    `-- uwsgi_params 

### 创建 cert 目录，并将证书及密钥放入 cert 目录中

### 创建 conf.d 目录，并创建 default.conf 文件，编写配置

    server {
    listen       80;
    listen  [::]:80;
    listen 443 ssl;
    server_name oss.demo.cloud;
    ssl_certificate /etc/nginx/cert/oss-demo-cloud.pem;
    ssl_certificate_key /etc/nginx/cert/oss-demo-cloud.key;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        proxy_pass http://oss.demo.cloud:9000;
        proxy_set_header  Host       $host;
        proxy_set_header  X-Real-IP    $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    }
	
    error_page  404              /404.html;

    error_page  500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
        }
    }

### 完成后的目录结构如下

    /etc/nginx/                                                                     
    |-- cert                                                                        
    |   |-- oss-demo-cloud.key                                                                 
    |   `-- oss-demo-cloud.pem                                                                 
    |-- conf.d                                                                      
    |   `-- default.conf                                                            
    |-- fastcgi_params                                                              
    |-- mime.types                                                                  
    |-- nginx.conf                                                                  
    |-- scgi_params                                                                 
    `-- uwsgi_params 

### 运行 Nginx 容器

## 测试在 https 页面中使用 MinIO 访问存储对象

### 新建一个 Html 页面，设置 video 标签的 src 为 OSS 中的文件

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>OSS测试</title>
    </head>
    <style>
    	body{
    		margin:0;
    		padding:0;
    		background-color:black;
    	}
    	video{
    		width:100vw;
    		height:100vh;
    	}
    </style>
    <body>
        <video src="https://oss.demo.cloud:9443/oss/test.mp4" muted autoplay>Video For Test</video>
    </body>
    </html>

### 如果能正常播放，则配置成功.