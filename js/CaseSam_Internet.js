var CaseSam_Internet = (function(self){
self.ID = {"text":"CaseSam_Internet", "type":"sub","prevcase":"Case1a","lastNodeNr":"2"};
self.preload = {"images":
[{"url":"bg.jpg"},
{"url":"sam_facebook.png"},
{"url":"sam_hemsida.png"},
{"url":"sam_linkedin.png"} 

]};


self.nodes = {"content": 
	[

{  	"ID": "3.6.1",
	"type":"info",
	"background":{"type":"image","url":"bg.jpg"},
	"image": [
			{"url":"sam_facebook.png"} 
			],
	"justify":"leftifmobile",
    "animation":"fade",
	"showNextButton":"0"
	},
	
	{  	"ID": "3.6.2",
	"type":"info",
	"background":{"type":"image","url":"bg.jpg"},
	"image": [
			{"url":"sam_hemsida.png"} 
			],
	"justify":"leftifmobile",
    "animation":"fade",
	"showNextButton":"0"
	},
	{  	"ID": "3.6.3",
	"type":"info",
	"background":{"type":"image","url":"bg.jpg"},
	"image": [
			{"url":"sam_linkedin.png"} 
			],
	"justify":"leftifmobile",
    "animation":"fade",
	"showNextButton":"0",
	"callback":"Case1a",
	"callbackNode":"2"
	}
]
};


	return self;

})({});



