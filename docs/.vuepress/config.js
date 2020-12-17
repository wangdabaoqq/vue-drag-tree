const pkg =require('../../package.json')
module.exports = {
  title: pkg.name,
  description: '快速搭建第三方库',
  base: '/',
  themeConfig: {
    nav: [
        { text: '主页', link: '/' },
        { text: '简介', link: '/guide/introduction' },
        { text: '测试', link: '/lib/test' },
      ],
    sidebar:{
        '/guide/':[
          {
            title:'简介',
            collapsable: false,
            children: [
              {
                title:'介绍',
                path: 'introduction',
                collapsable: false,
              }
            ]
          }
        ],
         '/lib/':[
          {
            title:'测试',
            collapsable: false,
            children: [
              {
                title:'使用说明',
                path: 'test',
                collapsable: false,
              }
            ]
          }
        ]
      },
    sidebarDepth: 1
  },
  plugins: [
      // 回到顶部
      '@vuepress/back-to-top',

      // 放大
      ['@vuepress/medium-zoom',{selector: 'img'}]
   ]
}
