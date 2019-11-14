// JavaScript source code//

var map = L.map('map').setView([61.0, 34.0], 6.5);
var layer = L.tileLayer("https://api.mapbox.com/styles/v1/daniechka/ck24jvom61vac1cpm042d4zmc/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGFuaWVjaGthIiwiYSI6ImNrMjRodWNpcDBqbnMzbXFtODNxbng1MTYifQ.WDyV5effgA0SZNWEc2sG-g").addTo(map);
var layerLabels;

var myStyle = {
    "color": "yellow",
    "weight": 3,
    "opacity": 0.7
};

var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name":"Санкт-Петербург",
        "popupContent":"Hello world and hell world - what a subtle yet huge difference!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [30.3, 59.93]
    }
};

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    } else if (feature.properties && feature.properties.Name) {
        layer.bindPopup(feature.properties.Name);
    };
}; 

L.geoJSON(geojsonFeature, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, myStyle);
    }
}).addTo(map);

var myJSONlayer = {
    "type": "FeatureCollection",
    "name": "areasofinterest",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { "type": "Feature", "properties": { "id": 1, "Name": "Ладожские Шхеры", "Area": null }, "geometry": { "type": "Polygon", "coordinates": [[[30.619248725914638, 61.711604720189328], [30.709075741810434, 61.857124650513377], [31.115939284397275, 61.851516492184892], [31.315408099107053, 61.641409817659472], [31.197840387125794, 61.586773234411105], [30.841174294598371, 61.680287425478369], [30.673409132557694, 61.675273708147245], [30.619248725914638, 61.711604720189328]]] } },
        { "type": "Feature", "properties": { "id": 2, "Name": "Олонецкий заказник", "Area": null }, "geometry": { "type": "Polygon", "coordinates": [[[32.840208026828066, 60.700421826866446], [32.804294113152046, 60.777660677554017], [32.967702420377954, 60.843342663207601], [33.2029385549559, 60.797817483470155], [33.122132249184844, 60.729408175813113], [32.937175593753331, 60.699543044430122], [32.840208026828066, 60.700421826866446]]] } },
        { "type": "Feature", "properties": { "id": 3, "Name": "Вепсский лес", "Area": null }, "geometry": { "type": "Polygon", "coordinates": [[[34.485493572917321, 60.485265318758785], [34.70558695460948, 60.541932159547137], [35.172862134202077, 60.448545700459569], [35.172862134202077, 60.448545700459569], [35.206722654462403, 60.07568066720944], [35.061122417342972, 60.008045374567985], [34.702200902583449, 60.002967141997537], [34.698814850557412, 60.111133769774973], [34.576916977620222, 60.119569364093309], [34.576916977620222, 60.136434070117069], [34.536284353307821, 60.139805974305567], [34.48210752089129, 60.244163696169977], [34.556600665464018, 60.366611703626944], [34.485493572917321, 60.485265318758785]]] } },
        { "type": "Feature", "properties": { "id": 4, "Name": "Кенозерский нацпарк", "Area": null }, "geometry": { "type": "Polygon", "coordinates": [[[37.916900047417926, 61.935743798956189], [37.960115605122851, 61.943875218526806], [38.336090957155662, 61.927610214289011], [38.271267620598273, 61.584039121458389], [37.852076710860551, 61.668240843950343], [37.916900047417926, 61.935743798956189]]] } }
    ]
};

var mylayer = L.geoJSON(myJSONlayer, {
    onEachFeature: onEachFeature,
    style: myStyle
}); 
var mylayershown = false;

function displayLayer() {
    if (mylayershown) {
        document.getElementById("layerbtn-title").innerHTML = "Show";
        mylayer.removeFrom(map);
    } else {
        document.getElementById("layerbtn-title").innerHTML = "Hide";
        mylayer.addTo(map);
    }
    mylayershown = !mylayershown;
};

function setBasemap(basemap) {
    if (layer) {
        map.removeLayer(layer);
    }

    if (basemap === "Topographic") {
        layer = L.tileLayer("https://api.mapbox.com/styles/v1/daniechka/ck24jvom61vac1cpm042d4zmc/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGFuaWVjaGthIiwiYSI6ImNrMjRodWNpcDBqbnMzbXFtODNxbng1MTYifQ.WDyV5effgA0SZNWEc2sG-g")
    }
    else {
        layer = L.esri.basemapLayer(basemap);
    }

    map.addLayer(layer);

    if (layerLabels) {
        map.removeLayer(layerLabels);
    }

    if (
        basemap === 'ShadedRelief' ||
        basemap === 'Oceans' ||
        basemap === 'Gray' ||
        basemap === 'DarkGray' ||
        basemap === 'Terrain'
    ) {
        layerLabels = L.esri.basemapLayer(basemap + 'Labels');
        map.addLayer(layerLabels);
    } else if (basemap.includes('Imagery')) {
        layerLabels = L.esri.basemapLayer('ImageryLabels');
        map.addLayer(layerLabels);
    }
};

document
    .querySelector('#basemaps')
    .addEventListener('change', function (e) {
        var basemap = e.target.value;
        setBasemap(basemap);
    });

document
    .addEventListener("DOMContentLoaded", function () {
        document.getElementById("layerbtn").addEventListener("click", function(){
            displayLayer();
        });
    });
