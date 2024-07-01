import './styles.css';

import GeoJSON from 'ol/format/GeoJSON.js';

// import { Map, View } from 'ol';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
// import { boundingExtent } from 'ol/extent';

import OSM from 'ol/source/OSM.js';
// import OpenCycleMap from 'ol/layer/Op';

import { Attribution, MousePosition, ZoomSlider } from 'ol/control.js';

import Overlay from 'ol/Overlay.js';
import { fromLonLat, toLonLat } from 'ol/proj.js';

import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';

// import { addProjection } from 'ol/proj';

import { createStringXY } from 'ol/coordinate.js';

/* ****************************************** */

// Add a boundaries layer
var geoJsonSource = new VectorSource({
	url: './NJ-Counties-Outline.json',
	format: new GeoJSON({}),
});

var geoJsonLayer = new VectorLayer({
	title: 'NJ Boundaries',
	source: geoJsonSource,
	projection: 'EPSG:4326',
	minZoom: 6,
	maxZoom: 12,
	// minResolution: 2000,
	// maxResolution: 20000,
});

const fuxDiv = new Overlay({
	element: document.getElementById('fux'),
});

// const latLon = [40.4454, -74.5916];
const lonLat = [-74.5916, 40.4454];

const map = new Map({
	target: 'map',
	// layers: [vectorLayer],
	layers: [
		new TileLayer({
			source: new OSM(),
			projection: 'EPSG:4326',
			// extent: bounds,
			// zIndex: 100,
			minZoom: 6,
			maxZoom: 12,
		}),
		geoJsonLayer,
		// fuxDiv,
		// vectorLayer,
	],
	// bounds: bounds,
	view: new View({
		center: fromLonLat(lonLat), // fromLonLat([-74.5916, 40.4454]), // ([6.6339863, 46.5193823]),
		zoom: 8,
		minZoom: 6,
		maxZoom: 12,
	}),
});

var currZoom = map.getView().getZoom();

map.on('moveend', function (e) {
	var newZoom = map.getView().getZoom();
	if (currZoom != newZoom) {
		console.log('zoom end, new zoom: ' + newZoom);
		currZoom = newZoom;
	}
});

map.getView().on('change:resolution', (event) => {
	console.log('zoom changed');
});

map.addControl(
	new MousePosition({
		className: 'mousePosition',
		coordinateFormat: createStringXY(4),
		projection: 'EPSG:4326',
	})
);
map.addControl(
	new ZoomSlider({
		// className: 'zoomSlider',
		duration: 200,
	})
);

// map.addOverlay(overlay);

// map.addLayer(geoJsonLayer);

var version = (function () {
	'use strict';
	var n = '1.0.0';
	return function () {
		console.log('version ' + n);
	};
})();

// sandbox below

/*

// map.getView().setCenter(Projection.fromLonLat([43.6415, -71.7791]));

// map.setView([43.6415, -71.7791]);

const featureOverlay = new VectorLayer({
	source: new VectorSource(),
	map: map,
	style: {
		'stroke-color': 'rgba(255, 255, 255, 0.7)',
		'stroke-width': 20,
	},
});

const vectorLayer = new VectorLayer({
	background: '#1a2b39',
	source: new VectorSource({
		// url: './NJ-Counties-Outline.json',
		// url: 'https://openlayers.org/data/vector/ecoregions.json',
		format: new GeoJSON(),
		url: './NJ-Counties-Outline.json',
	}),
	style: {
		'fill-color': ['string', ['get', 'COLOR'], '#eee'],
	},
});

// let styleUrl = 'https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}{r}.png?apikey=95348f24c8ae4a828557306990d39f91';

let apiKey = '95348f24c8ae4a828557306990d39f91';

var l = new OSM('OpenCycleMap', [
	'https://a.tile.thunderforest.com/cycle/${z}/${x}/${y}.png?apikey=' + apiKey,
	'https://b.tile.thunderforest.com/cycle/${z}/${x}/${y}.png?apikey=' + apiKey,
	'https://c.tile.thunderforest.com/cycle/${z}/${x}/${y}.png?apikey=' + apiKey,
]);


let boundingBox = [
	[38.9285, -75.5596],
	[41.3574, -73.8939],
];

var bounds = new boundingExtent(boundingBox);
// const boundingBox = [[38.9285,-75.5596],[41.3574,-73.8939]];
// var map = new OpenLayers.Map('map', { restrictedExtent: bounds });

*/
