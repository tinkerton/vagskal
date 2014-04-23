var CaseSam_741 = (function(self){
self.ID = {"text":"CaseSam_741", "type":"sub","prevcase":"Case1a","lastNodeNr":"6"};
self.preload = {"images":
[{"url":"bg.jpg"},
{"url":"sam_miniblogg.png"},
{"url":"sam_linkedin2.png"} 

]};


self.nodes = {"content": 
	[
	
	{  	"ID": "7.4.1",
	"type":"info",
	"background":{"type":"image","url":"bg.jpg"},
	"image": [
			{"url":"sam_miniblogg.png"} 
			],
	"justify":"leftifmobile",
    "animation":"fade",
	"showNextButton":"0"
	},
	{  	"ID": "7.4.2",
	"type":"info",
	"background":{"type":"image","url":"bg.jpg"},
	"image": [
			{"url":"sam_linkedin2.png"} 
			],
	"justify":"leftifmobile",
    "animation":"fade",
	"showNextButton":"0",
	"callback":"Case1a",
	"callbackNode":"6"
	}
]};


	return self;

})({});


