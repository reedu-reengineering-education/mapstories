/*	VCO.MapMarker.Leaflet
	Produces a marker for Leaflet Maps
================================================== */

VCO.MapMarker.Leaflet = VCO.MapMarker.extend({
	
	
	/*	Create Marker
	================================================== */
	_createMarker: function(d, o) {
		var icon = {}; //new L.Icon.Default();
		
		if (o.use_custom_markers && d.location.icon && d.location.icon != "") {
			icon = L.icon({iconUrl: d.location.icon, iconSize: [41]});
			//icon = L.icon({iconUrl: d.media.url, iconSize: [41]});
			
		};
		
		//icon = L.icon({iconUrl: "gfx/map-pin.png", iconSize: [28, 43], iconAnchor: [14, 33]});
		icon = L.divIcon({className: 'vco-mapmarker-leaflet'});
		
		this._marker = L.marker([d.location.lat, d.location.lon], {
			title: 		d.text.headline,
			icon: 		icon
		});
		
		this._marker.on("click", this._onMarkerClick, this); 
		
		if (o.map_popup) {
			this._createPopup(d, o);
		}
		
	},
	
	_addTo: function(m) {
		this._marker.addTo(m);
	},
	
	_createPopup: function(d, o) {
		var html = "";
		html += "<h3>" + this.data.text.headline + "</h3>";
		html += "<p>" + this.data.text.text + "</p>";
		this._marker.bindPopup(html);
	},
	
	_active: function(a) {
		if (a) {
			this._marker.setOpacity(1);
		} else {
			this._marker.setOpacity(.25);
		}
	},
	
	_location: function() {
		return this._marker.getLatLng();
	}
	
});