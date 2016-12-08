
jQuery(document).ready(function($){

    /*********Theme PAth*********/

    var cbx_path = window.location.protocol + '//' + window.location.host;
    var pathArray = window.location.pathname.split( '/' );
    for (i = 1; i < (pathArray.length - 1); i++) {
        cbx_path += '/';
        cbx_path += pathArray[i];

    }

    /*********Theme Path End*********/


    /********************************************
     *** Simple Google Maps Plugin
     *********************************************/

    //Defining CbMaps Maps Plugins
    $.fn.CbMaps = function (options) {

        var $lz_map_selector = this;
        var settings = $.extend(true, {}, $.fn.CbMaps.defaults, options);
        google.maps.event.addDomListener(window, 'load', function() {

            $lz_map_selector.each(function(index) {
                //Create Jquery Object of Current Item
                var elem = $($lz_map_selector);
                //console.log(elem);
                var gmOptions = {};//GoogleMapOptions

                if ($.isArray(settings.mapOptions.center)) {
                    var center = (settings.mapOptions.center.hasOwnProperty(index)) ? settings.mapOptions.center[index] : false;
                } else {
                    var center = (settings.mapOptions.center === true) ? true : false;
                }

                if (center) {
                    var cbNewLat = ($.isArray(settings.mapOptions.latitude) && settings.mapOptions.latitude.hasOwnProperty(index)) ? settings.mapOptions.latitude[index] : settings.mapOptions.latitude;


                    var cbNewLong = ($.isArray(settings.mapOptions.longitude) && settings.mapOptions.longitude.hasOwnProperty(index)) ? settings.mapOptions.longitude[index] : settings.longitude;
                    gmOptions.center = new google.maps.LatLng(cbNewLat, cbNewLong);
                }

                if ($.isArray(settings.mapOptions.zoom)) {
                    gmOptions.zoom = (settings.mapOptions.zoom.hasOwnProperty(index)) ? settings.mapOptions.zoom[index] : 8;
                } else {
                    gmOptions.zoom = settings.mapOptions.zoom;;
                }

                if ($.isArray(settings.mapOptions.mapType)) {
                    gmOptions.mapTypeId = (settings.mapOptions.mapType.hasOwnProperty(index)) ? settings.mapOptions.mapType[index] : google.maps.MapTypeId.ROADMAP;
                } else {
                    gmOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
                }

                if ($.isArray(settings.mapOptions.icon)) {
                    gmOptions.markerIcon = (settings.mapOptions.icon.hasOwnProperty(index)) ? settings.mapOptions.icon[index] : null;
                } else {
                    gmOptions.markerIcon = (typeof settings.mapOptions.icon == 'undefined') ? null : settings.mapOptions.icon;
                }

                if ($.isArray(settings.mapOptions.scrollwheel)) {
                    gmOptions.scrollwheel = (settings.mapOptions.scrollwheel.hasOwnProperty(index)) ? settings.mapOptions.scrollwheel[index] : false;
                } else {
                    gmOptions.scrollwheel = (typeof settings.mapOptions.scrollwheel == 'undefined') ? false : settings.mapOptions.scrollwheel;
                }

                if ($.isArray(settings.mapOptions.infoWindow) && settings.mapOptions.infoWindow.length > 0) {
                    gmOptions.title = (settings.mapOptions.infoWindow.hasOwnProperty(index)) ? settings.mapOptions.infoWindow[index].title : null;
                    gmOptions.content = (settings.mapOptions.infoWindow.hasOwnProperty(index)) ? settings.mapOptions.infoWindow[index].content : null;
                } else {
                    gmOptions.title = settings.mapOptions.infoWindowTitle;
                    gmOptions.content = settings.mapOptions.infoWindowContent;
                }

                var contentString = '<div id="content"><h1 id="firstHeading" class="firstHeading">' + gmOptions.title + '</h1><div id="bodyContent"><p>' + gmOptions.content + '</p></div></div>';
                var CbMap = new google.maps.Map(elem[0], gmOptions);

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                var CbMarker = new google.maps.Marker({
                    position: gmOptions.center,
                    map: CbMap,
                    title:gmOptions.title,
                    icon: gmOptions.markerIcon
                });

                google.maps.event.addListener(CbMarker, 'click', function() {
                    infowindow.open(CbMap,CbMarker);
                });

            });
        });

        function toggleBounce() {

            if (CbMarker.getAnimation() != null) {
                CbMarker.setAnimation(null);
            } else {
                CbMarker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }
        //return this;
    };





    var $mapref = $('#map_canvas');
    var maptitle = $mapref.data('title');
    var maplat = $mapref.data('lat');
    var maplng = $mapref.data('lng');
    var mapcontent = $mapref.data('content');

    var boxText = "<div class='cbx-map-text'>";
    boxText += mapcontent;
    boxText += "</div>";



    // Show google Maps
    $('#map_canvas').CbMaps({
        mapOptions: {
            latitude: [maplat],
            longitude: [maplng],
            center: true,
            scrollwheel: false,
            zoom: 17,
            mapType: 'satellite', //google.maps.MapTypeId.ROADMAP
            icon: cbx_path + '/assets/img/map-icon.png',
            infoWindow: [{
                title: maptitle,
                content: boxText

            }]
        }
    });


    /********************************************
     *** End Simple Codeboxr Google Maps Plugin
     *********************************************/



    // -------------------------------------------------------------
    // WOW
    // -------------------------------------------------------------
    var wow = new WOW(
        {
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:       0,          // distance to the element when triggering the animation (default is 0)
            mobile:       false,       // trigger animations on mobile devices (default is true)
            live:         true,       // act on asynchronously loaded content (default is true)
            callback:     function(box) {
                // the callback is fired every time an animation is started
                // the argument that is passed in is the DOM node being animated
            }
        }

    );
    wow.init();

    // -------------------------------------------------------------
    // WOW END
    // -------------------------------------------------------------

    // -------------------------------------------------------------
    // COUNTDOWN START

    //get the values from data attributes
    var cbxcountdown = $('#cbxcountdown');
    var countdown_year  = cbxcountdown.data('year');
    var countdown_month = cbxcountdown.data('month');
    var countdown_day   = cbxcountdown.data('day');

    // -------------------------------------------------------------
    if ( $('.lz-circular-countdown-container').length ) {
        $('.lz-circular-countdown-container').final_countdown({
            now: Date.now()/1000,
            end: new Date(countdown_year, countdown_month, countdown_day).getTime()/1000,
            selectors: {
                value_seconds: '.lz-circular-clock-seconds .lz-circular-val',
                canvas_seconds: 'lz-circular-canvas_seconds',
                value_minutes: '.lz-circular-clock-minutes .lz-circular-val',
                canvas_minutes: 'lz-circular-canvas_minutes',
                value_hours: '.lz-circular-clock-hours .lz-circular-val',
                canvas_hours: 'lz-circular-canvas_hours',
                value_days: '.lz-circular-clock-days .lz-circular-val',
                canvas_days: 'lz-circular-canvas_days'
            }
        });
    }

    // -------------------------------------------------------------
    // COUNTDOWN END
    // -------------------------------------------------------------


    //smooth scroll
    $('.gotome').smoothScroll(
        {
            speed: 600
        }
    );

    /*Menu Scroll start*/
    var s = $("#menu-offscroll");
    var pos = s.position();
    var scrollmenu = $("#menu-offscroll");
    var scrollmenu_pos = scrollmenu.position();
    var windowpos = $(window).scrollTop();

    if(windowpos - scrollmenu_pos.top > 0){
        s.addClass("menu-onscroll");
    }
    else{
        s.removeClass("menu-onscroll");
    }

    $(window).scroll(function() {
        windowpos = $(window).scrollTop();
        if(windowpos - scrollmenu_pos.top > 0){
            s.addClass("menu-onscroll");
        }
        else{
            s.removeClass("menu-onscroll");
        }
    });
    /*Menu Scroll end*/

});//jQuery DOM READY END
