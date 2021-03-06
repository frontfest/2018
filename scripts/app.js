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
// 
// (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//             (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//         m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
// })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
//
// ga('create', '{{ site.google-analytics.id }}', 'auto');
// ga('send', 'pageview');

/* Leaflet map */

window.addEventListener('load', function() {
  var mymap = L.map('mapid', { dragging: false, scrollWheelZoom: false }).setView([40.3492, -3.698], 16);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(mymap);

  L.marker([40.3478149, -3.6963])
    .addTo(mymap)
    .bindPopup('<img style="width: 100px" src="../images/lanave-logo.png">')
    .openPopup();

  var cercaniasIcon = L.icon({
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Cercanias_Logo.svg/450px-Cercanias_Logo.svg.png',
      iconSize:     [32, 32], // size of the icon
      iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
      popupAnchor:  [16, 16] // point from which the popup should open relative to the iconAnchor
  });

  L.marker([40.35072, -3.70535], {icon: cercaniasIcon}).addTo(mymap).bindPopup('<strong>Puente Alcocer</strong><br />Cercanías C5');

  var metroIcon = L.icon({
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/MetroMadridLogo.svg/768px-MetroMadridLogo.svg.png',
      iconSize:     [48, 30], // size of the icon
      iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
      popupAnchor:  [24, 15] // point from which the popup should open relative to the iconAnchor
  });

  L.marker([40.35135, -3.69315], {icon: metroIcon}).addTo(mymap).bindPopup('<strong>Villaverde Bajo - Cruce</strong><br />Metro L3');

});
