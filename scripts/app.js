/* Manage top bar design depending on scroll position */

var lastKnownScrollPosition = 0;
var ticking = false;

function setMenubarColor(scrollPos) {
  document.querySelector('#toggleMenu').classList.remove('open');
  document.querySelector('aside').classList.remove('open');

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

window.addEventListener('hashchange', function () {
  window.scrollTo(window.scrollX, window.scrollY - 50);
});

document.querySelector('#toggleMenu').addEventListener('click', function() {
  if (document.querySelector('aside').classList.contains('open')) {
    document.querySelector('aside').classList.remove('open');
    this.classList.remove('open');
    setMenubarColor(window.scrollY);
  } else {
    document.querySelector('aside').classList.add('open');
    this.classList.add('open');
    document.querySelector('#nav').classList.remove('with-scroll');
  }
});

/* Google Analytics */

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', '{{ site.google-analytics.id }}', 'auto');
ga('send', 'pageview');

/* Leaflet map */

var mymap = L.map('mapid', { dragging: false, scrollWheelZoom: false }).setView([40.3478149, -3.6963], 15);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  id: 'mapbox.streets'
}).addTo(mymap);

L.marker([40.3478149, -3.6963]).addTo(mymap)
  .bindPopup('<b>La N@ve</b><br />Calle Cifuentes, 5, 28021 Madrid').openPopup();
