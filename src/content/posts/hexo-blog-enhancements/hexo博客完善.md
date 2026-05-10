---
title: Hexo博客完善-实现目录和访问次数
published: 2025-05-18 14:10:11
category: 心得与笔记
tags: ["Hexo", "Vivia"]
description: "使用Hexo与Vivia主题的一些记录。"
---

> 本篇文章来源于[目录和访问次数提问的issue #1](https://github.com/Aurora-N/aurora-n.github.io/issues/1)，是本博客进行一些自定义配置的记录

由于要对主题内部文件进行修改，因此不推荐使用`npm install hexo-theme-vivia`来安装，推荐通过Git的方式将主题源代码clone到`/themes/vivia`目录下：

[Via Git](https://github.com/saicaca/hexo-theme-vivia?tab=readme-ov-file#1-install-the-theme)

```shell
# Clone the theme into the /themes/vivia directory
git clone https://github.com/saicaca/hexo-theme-vivia.git themes/vivia
  
# Install the required dependencies
npm install colorjs.io stylus hexo-symbols-count-time
```

## 增加文章目录

1. 前往`themes/vivia/layout/_partial/`目录，在`post`目录下新增`toc.ejs`文件：

   ```ejs
   <div class="toc-parent">
     <div id="toc" class="toc-article">
       <h2 class="toc-title">目录</h2>
       <%- toc(post.content, {list_number: true}) %>
     </div>
   </div>
   ```

   关于toc辅助函数的配置，可以参考[Hexo文档-辅助函数](https://hexo.io/zh-cn/docs/helpers#toc)

2. 编辑`themes/vivia/layout/_partial/article.ejs`文件，找到`<div class="e-content article-entry" itemprop="articleBody"></div>`标签，增加目录相关代码：

   ```ejs
   <!-- Table of Contents -->
   <% if (post.toc) { %>
     <%- partial('post/toc') %>
   <% } %>
   ```

   即：

   ```diff
         <div class="e-content article-entry" itemprop="articleBody">
           <% if (post.excerpt && index){ %>
             <%- post.excerpt %>
           <% } else if (is_home() && !post.excerpt && theme.home.style != 'detail') { %>
             <div class="truncate-text">
               <% if(description){ %>
                 <%- strip_html(post.description) %>
               <% } else{ %>
                 <%- truncate(strip_html(post.content), {length: 500}) %>
               <% } %>
             </div>
           <% } else { %>
   +          <!-- Table of Contents -->
   +          <% if (post.toc) { %>
   +            <%- partial('post/toc') %>
   +          <% } %>
             <%- post.content %>
           <% } %>
         </div>
   ```

3. 接下来可以选择给目录添加一些样式：

   前往`themes/vivia/source/css/_partial/`目录，新增样式文件`post-toc.styl`，可以自行对目录样式进行调整：

   ```stylus
   .toc-parent {
       position:relative;
   }
   
   .toc-article {
       padding: 0em;
   }
   
   .toc-article .toc-title{
       font-weight: none;
   }
   
   #toc .toc {
       padding: 0
   }
   
   #toc li , .toc li {
       list-style-type: none
   }
   
   #toc ol {
       margin: 0;
   }
   
   #toc .toc-child {
       padding-left: 1.5em
   }
   ```

4. 编辑`themes/vivia/source/css/style.styl`文件，引入刚才新增的样式：

   ```stylus
   @import "_partial/post-toc"
   ```

5. 目录默认不显示，只需要在帖子.md文件头部引入`toc: true`即可显示目录：

   ```diff
   ---
   title: 示例
   date: 2023-09-08 21:32:48
   categories: 随笔
   tags: 记录心情
   photos: covers/示例/1.png
   + toc: true
   ---
   ```

   

## 引入不蒜子插件统计文章浏览量

由于是纯静态网站，可以使用[不蒜子插件](https://busuanzi.ibruce.info/)来统计文章浏览量。

1. 打开`themes/vivia/layout/_partial/article.ejs`文件编辑

2. 在文件头部引入不蒜子插件：

   ```ejs
   <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
   ```

3. 找到`<div class='meta-info-bar'></div>`标签，在`<div class="wordcount need-seperator meta-info"></div>`标签后面添加以下代码：

   ```ejs
   <!-- busuanzi-counter -->
   <% if (index == false){ %>
     <%/*如果是在首页就不显示阅读量*/%>
     <div class="readcount need-seperator meta-info">
       <span id="busuanzi_container_page_pv">阅读<span id="busuanzi_value_page_pv"></span>次</span>
     </div>
   <% } %>
   ```

   即：

   ```diff
           <div class='meta-info-bar'>
             <%- partial('post/date', {class_name: 'meta-info', date_format: null}) %>
             <div class="need-seperator meta-info">
               <%- partial('post/category') %>
             </div>
             <div class="wordcount need-seperator meta-info">
               <%- symbolsCount(post) %> <%- __('words') %>
             </div>
   +          <!-- busuanzi-counter -->
   +          <% if (index == false){ %>
   +            <%/*如果是在首页就不显示阅读量*/%>
   +            <div class="readcount need-seperator meta-info">
   +              <span id="busuanzi_container_page_pv">阅读<span id="busuanzi_value_page_pv"></span>次</span>
   +            </div>
   +          <% } %>
           </div>
   ```

4. 上面的步骤完成后，文章的访问量就可以正常显示了，如果需要在底部显示网站访客量和浏览次数，可以编辑`themes/vivia/layout/_partial/footer.ejs`文件：

   在文件第一行加上以下代码引入不蒜子插件：

   ```ejs
   <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
   ```

   前面已经在`article.ejs`文件中引入了，为什么要在此处引入？

   我对Hexo不太熟悉，猜测是进入网站首页后，如果不点击文章进入文章页面，`article.ejs`文件就不会被加载，写在它里面引入不蒜子插件的代码还没有被执行，就会导致不点进文章页面就看不到底部统计量的情况，因此把引入不蒜子插件的代码写在`footer.ejs`中。

   **同时还要删除先前在`article.ejs`文件中的那一行引入代码，避免造成冲突**。

5. 找到`<footer id="footer"></footer>`标签，在其中引入统计的代码即可：

   ```diff
   <footer id="footer">
     <% if (theme.sidebar === 'bottom'){ %>
       <%- partial('_partial/sidebar') %>
     <% } %>
     <div id="footer-info" class="inner">
       <% if (theme.copyright){ %>
         <%- render(theme.copyright, 'pug'); %>
       <% } %>
       &copy; <%= date(new Date(), 'YYYY') %> <%= theme.author || config.author || config.title %><br>
       <%= __('powered_by') %> <a href="https://hexo.io/" target="_blank">Hexo</a> & Theme <a href="https://github.com/saicaca/hexo-theme-vivia">Vivia</a>
   +    <span id="busuanzi_container_site_pv">
   +      🌏本站总访问量<span id="busuanzi_value_site_pv"></span>次 |
   +    </span>
   +    <span id="busuanzi_container_site_uv">
   +      🧑‍💻本站访客数<span id="busuanzi_value_site_uv"></span>人次
   +    </span>
     </div>
   </footer>
   ```

   到这里应该就可以正常显示目录和访问次数统计了～