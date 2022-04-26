module.exports = {
  // 页面标题
  title: "will笔记",
  // 网页描述
  description: "记录工作中的常见知识点",
  // dest: "./myBlog",
  base: "/will-notes/",
  head: [
    // 页面icon
    ["link", { rel: "icon", href: "/logo.png" }],
  ],
  // 端口号
  port: 8000,
  markdown: {
    // 代码块行号
    lineNumbers: true,
  },
  themeConfig: {
    // 最后更新时间
    lastUpdated: "最后更新时间",
    // 所有页面自动生成侧边栏
    sidebar: "auto",
    // 仓库地址 页面不显示 github
    // repo: 'https://github.com/weixinfei123/myBlog.git',
    // 仓库链接label
    repoLabel: "gitHub",
    // 编辑链接
    editLinks: true,
    // 编辑链接label
    editLinkText: "编辑此页",
    // 导航
    nav: [
      { text: "javascript", link: "/javascript/" },
      // { text: "javaScript", link: "/javascript/core/prototype.md" },
      // { text: "typeScript", link: "/typescript/" },
      {
        text: "常用框架",
        items: [
          { text: "Vue", link: "/frame/vue/" },
          { text: "React", link: "/frame/react/" },
        ],
      },
      {
        text: "更多知识",
        items: [
          { text: "typeScript", link: "/more/typescript/" },
          { text: "面试", link: "/more/interview/" },
          { text: "vscode", link: "/more/vscode/" },
          { text: "精品分享", link: "/more/share/" },
          { text: "轮子库", link: "/more/tools/" },
          { text: "网址收藏", link: "/more/website/" },
        ],
      },
      // { text: "问题集锦", link: "/problem/" },
      // { text: "基础配置功能", link: "/common/" },
    ],
    sidebar: {
      "/javascript/": [
        {
          title: "基础",
          collapsable: false, // false 意味着展开  true 关闭展开
          children: [
            "/javascript/core/js-1prototype.md",
            "/javascript/core/js-2作用域.md",
            "/javascript/core/js-3执行上下文.md",
            "/javascript/core/js-4事件循环.md",
            "/javascript/core/type-change.md",
          ],
        },
        {
          title: "深入",
          collapsable: false,
          children: [
            "/javascript/core/js-new模拟实现.md",
            "/javascript/core/js-problem.md",
            "/javascript/core/js-函数作用域-执行上下文-作用域链.md",
            "/javascript/core/js-工具方法.md",
            "/javascript/core/js-server.md",
          ],
        },
      ],
      "/frame/react/": [
        {
          title: "基础",
          collapsable: false, // false 意味着展开  true 关闭展开
          children: [
            "/frame/react/base/jsx.md",
            "/frame/react/base/react组件.md",
            "/frame/react/base/state.md",
            "/frame/react/base/props.md",
            "/frame/react/base/lifeCycle.md",
            "/frame/react/base/ref.md",
            "/frame/react/base/context.md",
          ],
        },
        {
          title: "优化",
          collapsable: false,
          children: ["/frame/react/optimize/渲染控制.md", "/frame/react/optimize/渲染调优.md", "/frame/react/optimize/bigData.md"],
        },
        {
          title: "原理",
          collapsable: false,
          children: ["/frame/react/tenet/event.md"],
        },
      ],
      // "/": "/javascript/core/prototype.md",
      // "/problem/": [
      //   {
      //     title: "vscode",
      //     collapsable: false,
      //     children: ["/problem/vscode/"],
      //   },
      //   {
      //     title: "javascript",
      //     // collapsable: true,
      //     children: ["/problem/javascript/js.md", "/problem/javascript/test.md"],
      //   },
      //   {
      //     title: "css",
      //     collapsable: true,
      //     children: ["/problem/css/css1.md", "/problem/css/css2.md"],
      //   },
      //   {
      //     title: "vue",
      //     collapsable: true,
      //     children: ["/problem/vue.md"],
      //   },
      //   {
      //     title: "uniapp",
      //     collapsable: true,
      //     children: ["/problem/uniapp.md"],
      //   },
      //   {
      //     title: "nginx",
      //     collapsable: true,
      //     children: ["/problem/nginx.md"],
      //   },
      //   {
      //     title: "git",
      //     collapsable: true,
      //     children: ["/problem/git.md"],
      //   },
      // ],
    },
  },
  // plugins: ['vuepress-plugin-export'],
  configureWebpack: {
    resolve: {
      // 静态资源的别名
      alias: {
        "@vuepress": "../images/vuepress",
        "@vue": "../images/vue",
        "@interview": "../images/interview",
      },
    },
  },
};
