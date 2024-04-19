module.exports = {
  "base": "/reco/",
  "title": "Mercury",
  "description": "",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "主页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时间线",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "文档",
        "icon": "reco-message",
        "items": [
          {
            "text": "群辉",
            "link": "/docs/synology/frps"
          },
          {
            "text": "参考",
            "link": "/docs/ref/ref"
          },
        ]
      },
      {
        "text": "关于",
        "icon": "reco-message",
        "items": [
          {
            "text": "关于",
            "link": "/docs/about/about",
            "icon": "reco-faq"
          },
          {
            "text": "GitHub",
            "link": "https://github.com/MercuryEdge",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "sidebar": {
      "/docs/synology/": [
        "frps",
        "obs"
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    "friendLink": [
      // {
        // "title": "vuepress-theme-reco",
        // "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        // "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        // "link": "https://vuepress-theme-reco.recoluan.com"
      // }
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "更新时间",
    "author": "Mercury",
    "authorAvatar": "/avatar.png",
    // "record": "津ICP备2021005489号-1",
    "startYear": "2023",
    "subSidebar": 'auto',
    "sidebarDepth": 1,
    "timezoneOffset": 8 * 60 * 60 * 1000,
    "smoothScroll": "true"
  },
  "markdown": {
    "lineNumbers": true
  },
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  }
}