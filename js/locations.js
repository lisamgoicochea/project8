// global map marker
var map;

// places displayed on map
var places = [{

        name: "Astoria Park",
        lat: 40.779679,
        long: -73.921443

},
    {
        name: "Cheesecake Factory",
        lat: 40.734364,
        long: -73.868982

},
    {
        name: "Frank Sinatra School of the Arts",
        lat: 40.756341,
        long: -73.925144
},
    {
        name: "Gantry Plaza State Park",
        lat: 40.745524,
        long: -73.958695
},
    {   name: "LaGuardia Community College",
        lat: 40.744560,
        long: -73.934726

},
    {
        name: "Mount Sinai Queens",
        lat: 40.768068,
        long: -73.924838

},
    {
        name: "Pio Pio",
        lat: 40.726286,
        long: -73.870681
}
];

var place = function (data) {
    var self = this;
    this.name = data.name;
    this.lat = data.lat;
    this.long = data.long;
    this.street = '';
    this.city = '';

    // makes markers visible
    this.visible = ko.observable(true);
};
    // foursquare api request that stores it in it's own variables
    $.getJSON(foursquareURL).done(function (data) {
        var results = data.response.venues[0];

        self.street = results.location.formattedAddress[0];
        self.city = results.location.formattedAddress[1];

    }).fail(function () {
        alert("Error with Foursquare API call. Refresh page to reload.");
    });

    // on click infowindow content
    this.contentString = '<div class="info-window-content"><div class="title"><b>' + data.name + "</b></div>" +
        '<div class="content">' + self.street + "</div>" +
        '<div class="content">' + self.city + "</div>";

    // content for infowindow
    this.infoWindow = new google.maps.InfoWindow({content: self.contentString});

    // placing markers on map
    this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(data.lat, data.long),
        map: map,
        title: data.name
    });

    // selected marker is visible
    this.showMarker = ko.computed(function () {
        if (this.visible() === true) {
            this.marker.setMap(map);
        } else {
            this.marker.setMap(null);
        }
        return true;
    }, this);

    // click listener which opens up infowindow
    this.marker.addListener('click', function () {
        self.contentString = '<div class="info-window-content"><div class="title"><b>' + data.name + "</b></div>" +
            '<div class="content">' + self.street + "</div>" +
            '<div class="content">' + self.city + "</div>";


        self.infoWindow.setContent(self.contentString);

        self.infoWindow.open(map, this);

        // bouncing effect of on marker
        this.toggleBounce = function () {
        self.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
            self.marker.setAnimation(null);
        }, 1414);
    };

    this.bounce = function (place) {
        google.maps.event.trigger(self.marker, 'click');
    };
});
// renders map on screen
function AppViewModel() {
    'use strict';

    var self = this;

    this.searchTerm = ko.observable('');

    this.locationList = ko.observableArray([]);

function AppViewModel() {

	var self = this;
	this.searchTerm = ko.observable('');

	//map styles
    var mapStyles = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#004990"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#af79a7"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#460a87"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#d12f29"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -84
            },
            {
                "lightness": 44
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fc821e"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#f1a0f7"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#3ed6c6"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#3e7ad6"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "##9afc44"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#bd73ef"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f12fc1"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f24a30"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#edbb3d"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#715bff"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#15ef86"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#40f4f7"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#216ef2"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#42c2f4"
            }
        ]
    }
];

    // center of map and map style
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.754920,
            lng: -73.911046
        },
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        mapTypeControl: false
    });

    // foursquare api keys
    var apiKey = 'BV2OKB2MZGH34QUZT2YCQLWLPY2RCNGPDQZYANDWR0MWUJTM';
    var apiSecret = 'RMMUEA230Z2POLUTYCZWSFWIQJO0KMJEQ1TZSEZIHQH2IYH2';

    // foursquare API link to call
    var foursquareURL = 'https://api.foursquare.com/v2/venues/search?ll=' + this.lat + ',' + this.long + '&client_id=' + apiKey + '&client_secret=' + apiSecret + '&v=20171214 ' + '&query=' + this.name;

    // locations list
    places.forEach(function (locationItem) {
    this.locationList.push(new Location(locationItem));
    });
    // search locations filter showing exact item results from location list
    this.filteredList = ko.computed(function () {
        var filter = self.searchTerm().toLowerCase();
        if (!filter) {
            self.locationList().forEach(function (locationItem) {
                locationItem.visible(true);
            });
            return self.locationList();
        } else {
            return ko.utils.arrayFilter(self.locationList(), function (locationItem) {
                var string = locationItem.name.toLowerCase();
                var result = (string.search(filter) >= 0);
                locationItem.visible(result);
                return result;
            });
        }
    }, self);

  /*  // toggles list view
    this.listToggle = function() {
      if(self.toggleSymbol() === 'hide') {
        self.toggleSymbol('show');
      } else {
        self.toggleSymbol('hide');
      }
    };
    */

    this.mapElem = document.getElementById('map');
    this.mapElem.style.height = window.innerHeight - 44;
}

function beginApp() {
    ko.applyBindings(new AppViewModel());
}
// error handling
function mapError() {
    alert("Failed to load requested page. Refresh to reload.");
    console.log("Failed to load requested page. Refresh to reload.");
}
