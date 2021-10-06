/*	VCO.Media.Padlet
================================================== */

VCO.Media.Padlet = VCO.Media.extend({

	includes: [VCO.Events],

	/*	Load the media
	================================================== */
	_loadMedia: function() {
		var api_url,
			self = this;

		// Loading Message
		this.message.updateMessage(VCO.Language.messages.loading + " " + this.options.media_name);

		// Create Dom element
		this._el.content_item	= VCO.Dom.create("div", "vco-media-item vco-media-iframe vco-media-padlet vco-media-shadow", this._el.content);

		// Get Media ID
		this.media_id = this.data.url.split("/");
        this.media_id = this.media_id[this.media_id.length-1]
        console.log(this.media_id)
		// API URL
		api_url = "https://padlet.com/embed/" + this.media_id + "";
        // frameborder="0" allow="camera;microphone;geolocation" style="width:100%;height:608px;display:block;padding:0;margin:0
		this.player = VCO.Dom.create("iframe", "", this._el.content_item);
		this.player.width 		= "100%";
		this.player.height 		= "100%";
		this.player.frameBorder = "0";
		this.player.src 		= api_url;

		// After Loaded
		this.onLoaded();
	},

	// Update Media Display
	_updateMediaDisplay: function() {
		// this._el.content_item.style.height = VCO.Util.ratio.r16_9({w:this._el.content_item.offsetWidth}) + "px";

	},

	_stopMedia: function() {

		// try {
		// 	this.player.contentWindow.postMessage(JSON.stringify({method: "pause"}), "https://player.vimeo.com");
		// }
		// catch(err) {
		// 	trace(err);
		// }

	}

});
