VCO.Media.Text = VCO.Class.extend({
	
	includes: [VCO.Events],
	
	// DOM ELEMENTS
	_el: {
		container: {},
		content_container: {},
		content: {},
		headline: {},
		date: {},
		start_btn: {},
		distance: {}
	},
	
	// Data
	data: {
		uniqueid: 			"",
		headline: 			"headline",
		text: 				"text"
	},
	
	// Options
	options: {
		title: 			false,
		distance:       ''
	},
	
	/*	Constructor
	================================================== */
	initialize: function(data, options, add_to_container) {
		
		VCO.Util.setData(this, data);
		
		// Merge Options
		console.log(options);
		VCO.Util.mergeData(this.options, options);
		
		this._el.container = VCO.Dom.create("div", "vco-text");
		this._el.container.id = this.data.uniqueid;
		
		this._initLayout();
		
		if (add_to_container) {
			add_to_container.appendChild(this._el.container);
		};
		
	},
	
	/*	Adding, Hiding, Showing etc
	================================================== */
	show: function() {
		
	},
	
	hide: function() {
		
	},
	
	addTo: function(container) {
		container.appendChild(this._el.container);
		//this.onAdd();
	},
	
	removeFrom: function(container) {
		container.removeChild(this._el.container);
	},
	
	headlineHeight: function() {
		return this._el.headline.offsetHeight + 40;
	},
	
	addDateText: function(str) {
		this._el.date.innerHTML = str;
	},
	
	/*	Events
	================================================== */
	onLoaded: function() {
		this.fire("loaded", this.data);
	},
	
	onAdd: function() {
		this.fire("added", this.data);
	},

	onRemove: function() {
		this.fire("removed", this.data);
	},
	
	/*	Private Methods
	================================================== */
	_initLayout: function () {
		
		// Create Layout
		this._el.content_container			= VCO.Dom.create("div", "vco-text-content-container", this._el.container);
		
		// Date
		this._el.date 				= VCO.Dom.create("h3", "vco-headline-date", this._el.content_container);
		
		// Headline
		if (this.data.headline != "") {
			var headline_class = "vco-headline";
			if (this.options.title) {
				headline_class = "vco-headline vco-headline-title";
			}
			this._el.headline				= VCO.Dom.create("h2", headline_class, this._el.content_container);
			this._el.headline.innerHTML		= this.data.headline;
		}
		
		// Text
		if (this.data.text != "") {
			var text_content = "";
			
			text_content 					+= VCO.Util.htmlify(this.data.text);
			
			// Date
			if (this.data.date && this.data.date.created_time && this.data.date.created_time != "") {
				if (this.data.date.created_time.length > 10) {
					if (typeof(moment) !== 'undefined') {
						text_content 	+= "<div class='vco-text-date'>" + moment(this.data.date.created_time, 'YYYY-MM-DD h:mm:ss').fromNow() + "</div>";
					
					} else {
						text_content 	+= "<div class='vco-text-date'>" + VCO.Util.convertUnixTime(this.data.date.created_time) + "</div>";
					}
				}
			}
			
			
			this._el.content				= VCO.Dom.create("div", "vco-text-content", this._el.content_container);
			this._el.content.innerHTML		= text_content;
			
		}

		if (this.options.distance != "") {
			this._el.distance				= VCO.Dom.create("div", "distance", this._el.content_container);
			this._el.distance.innerHTML		= this.options.distance;

		}
		
		
		// Fire event that the slide is loaded
		this.onLoaded();
		
		
		
	}
	
});