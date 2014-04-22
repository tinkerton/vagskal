var CaseMaria_Internet = (function(self){
self.ID = {"text":"CaseMaria_Internet", "type":"sub","prevcase":"Case1a","lastNodeNr":"1"};
self.preload = {"images":
[{"url":"bg.jpg"}
]};


self.nodes = {"content": 
	[
	
	{  	"ID": "3.3.1",
	"type":"info",
	"background":{"type":"image","url":"bg.jpg"},
	"image": [
			{"url":"maria_facebook.png"} 
			],
	"justify":"leftifmobile",
    "animation":"fade",
	"showNextButton":"0"
	},
	{  	"ID": "3.3.2",
	"type":"info",
	"background":{"type":"image","url":"bg.jpg"},
	"image": [
			{"url":"maria_hemsida.png.png"} 
			],
	"justify":"leftifmobile",
    "animation":"fade",
	"showNextButton":"0"
	"callback":"Case1a",
	"callbackNode":"1"
	}
	]
};


	return self;

})({});


