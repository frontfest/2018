/* Manage top bar design depending on scroll position */

var lastKnownScrollPosition = 0;
var ticking = false;

function setMenubarColor(scrollPos) {
  if (scrollPos > 70) {
    document.querySelector('#nav').classList.add('with-scroll');
  } else {
    document.querySelector('#nav').classList.remove('with-scroll');
  }
}

window.addEventListener('scroll', function (e) {
  lastKnownScrollPosition = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function () {
      setMenubarColor(lastKnownScrollPosition);
      ticking = false;
    });
  }
  ticking = true;
});

/* Google Analytics */

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', '{{ site.google-analytics.id }}', 'auto');
ga('send', 'pageview');
