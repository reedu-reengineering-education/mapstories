/*	VCO.Media.Instagram

================================================== */

VCO.Media.Instagram = VCO.Media.extend({
	
	includes: [VCO.Events],
	
	/*	Load the media
	================================================== */
	_loadMedia: function() {
		var api_url,
			self = this;
		
		// Loading Message
		this.message.updateMessage(VCO.Language.messages.loading + " " + this.options.media_name);
		
		// Get Media ID
		this.media_id = this.data.url.split("\/p\/")[1].split("/")[0];
		
		// Link
		this._el.content_link 				= VCO.Dom.create("a", "", this._el.content);
		this._el.content_link.href 			= this.data.url;
		this._el.content_link.target 		= "_blank";
		
		// Photo
		this._el.content_item				= VCO.Dom.create("iframe", "vco-media-item vco-media-iframe vco-media-instagram vco-media-shadow", this._el.content_link);
		
		// Media Loaded Event
		this._el.content_item.addEventListener('load', function(e) {
			self.onMediaLoaded();
		});
		
		console.log("LAODING MEDIA" + this.media_id);
		// Set source
		// this._el.content_item.src			= "https://instagram.com/p/" + this.media_id + "/media/?size=" + this.sizes(this._el.content.offsetWidth);
		this._el.content_item.src			= "//instagram.com/p/" + this.media_id + "/embed/" 
		this._el.content_item.height = '500';
		this._el.content_item.frameBorder = "0";
		this._el.content.style="position: relative;	padding-bottom: 120%; height: 0;overflow: hidden;";
		this.onLoaded();       
		
	},
	
	sizes: function(s) {
		var _size = "";
		if (s <= 150) {
			_size = "t";
		} else if (s <= 306) {
			_size = "m";
		} else {
			_size = "l";
		}
		
		return _size;
	}
	
	
	
});
