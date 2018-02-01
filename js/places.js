var myLocations = [{

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
    {
        name: "Museum of Moving Image",
        lat: 40.756359,
        long: -73.923930

},
    {
        name: "Pio Pio",
        lat: 40.726286,
        long: -73.870681
}
];

var map;
var clientID;
var clientSecret;

var Location = function (data) {
    var self = this;
    this.name = data.name;
    this.lat = data.lat;
    this.long = data.long;
    this.street = "";
    this.city = "";

    this.visible = ko.observable(true);

    this.infoWindow = new google.maps.InfoWindow({
        content: self.contentString
    });

    // Foursquare api keys
    var foursquareURL = 'https://api.foursquare.com/v2/venues/search?ll=' + this.lat + ',' + this.long + '&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20171214 ' + '&query=' + this.name;

    $.getJSON(foursquareURL).done(function (data) {
        var results = data.response.venues[0];

        self.street = results.location.formattedAddress[0];
        self.city = results.location.formattedAddress[1];

    }).fail(function () {
        alert("There was an error with the Foursquare API call. Please refresh the page.");
    });
    // Infowindow including street and city info
    this.contentString = '<div class="info-window-content"><div class="title"><b>' + data.name + "</b></div>" +
        '<div class="content">' + self.street + "</div>" +
        '<div class="content">' + self.city + "</div>"
    this.infoWindow = new google.maps.InfoWindow({
        content: self.contentString
    });

    // placing markers on map
    this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(data.lat, data.long),
        map: map,
        title: data.name
    });

    this.showMarker = ko.computed(function () {
        if (this.visible() === true) {
            this.marker.setMap(map);
        } else {
            this.marker.setMap(null);
        }
        return true;
    }, this);

    this.marker.addListener('click', function () {
        self.contentString = '<div class="info-window-content"><div class="title"><b>' + data.name + "</b></div>" +
            '<div class="content">' + self.street + "</div>" +
            '<div class="content">' + self.city + "</div>";


        self.infoWindow.setContent(self.contentString);

        self.infoWindow.open(map, this);

        // bouncing effect of pointer map
        self.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
            self.marker.setAnimation(null);
        }, 2100);
    });

    this.bounce = function (place) {
        google.maps.event.trigger(self.marker, 'click');
    };
};

function AppViewModel() {
    var self = this;

    this.searchTerm = ko.observable("");

    this.locationList = ko.observableArray([]);
    // center of map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {
            lat: 40.754920,
            lng: -73.911046
        }
    });

    // sandbox api keys for foursquare
    clientID = "BV2OKB2MZGH34QUZT2YCQLWLPY2RCNGPDQZYANDWR0MWUJTM";
    clientSecret = "RMMUEA230Z2POLUTYCZWSFWIQJO0KMJEQ1TZSEZIHQH2IYH2";

    myLocations.forEach(function (locationItem) {
        self.locationList.push(new Location(locationItem));
    });
    // search locations filter
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

    this.mapElem = document.getElementById('map');
    this.mapElem.style.height = window.innerHeight - 50;
}

function startApp() {
    ko.applyBindings(new AppViewModel());
}
// function will run to alert user of error loading map
function googleError() {
    alert("Google Maps failed to load the requested page. Please refresh the page.");
}
