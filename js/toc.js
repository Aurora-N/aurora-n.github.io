(function(){
  $(".widget-wrap.toc .widget").html($(".toc-article").html());
  var position = $('.widget-wrap.toc').position().top;
  $(window).scroll(function(){
    $(".widget-wrap.toc").css({
      "position":"relative",
      "top":($("body,html").scrollTop() - position > 0) ? $("body,html").scrollTop() - position : 0
    });
  });
})();

// hexo.extend.tag.register('toc', function(args, content) {
//   const headings = document.querySelectorAll('.content h1, .content h2, .content h3, .content h4, .content h5, .content h6');
//   let toc = '<ul>';

//   headings.forEach((heading, index) => {
//     const id = heading.id || `toc-${index}`;
//     heading.id = id;

//     const level = parseInt(heading.tagName.charAt(1), 10);
//     toc += `<li class="toc-level-${level}"><a href="#${id}">${heading.textContent}</a></li>`;
//   });

//   toc += '</ul>';
//   return { toc: toc };
// });