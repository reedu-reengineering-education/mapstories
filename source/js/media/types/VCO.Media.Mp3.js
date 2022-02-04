/*	VCO.Media.Mp3
	Produces mp3 assets.
	Takes a data object and populates a dom object
================================================== */

VCO.Media.Mp3 = VCO.Media.extend({
	
	includes: [VCO.Events],
	
	/*	Load the media
	================================================== */
	_loadMedia: function() {
		var self = this;
		// Loading Message
		this.message.updateMessage(VCO.Language.messages.loading + " " + this.options.media_name);
		
		// Link
		if (this.data.link) {
			this._el.content_link 				= VCO.Dom.create("a", "", this._el.content);
			this._el.content_link.href 			= this.data.link;
			this._el.content_link.target 		= "_blank";
		}
		
		let audio = VCO.Dom.create('audio', 'vco-media-mp3 controls', this._el.content)
        this._el.content_item				= VCO.Dom.create("source", "test", audio);
		
        // this.el.content_item.
		// Media Loaded Event
		this._el.content_item.addEventListener('load', function(e) {
			self.onMediaLoaded();
		});
		
		audio.controls = true;
		this._el.content_item.src			= this.data.url;
		
		this.onLoaded();
	},
	
	_updateMediaDisplay: function(layout) {
		
		
		if(VCO.Browser.firefox) { 
			//this._el.content_item.style.maxWidth = (this.options.width/2) - 40 + "px";
			this._el.content_item.style.width = "auto";
		}
	}
	
});