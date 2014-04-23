var CaseAdriana_Internet = (function(self){
self.ID = {"text":"CaseAdriana_Internet", "type":"sub","prevcase":"Case1a","lastNodeNr":"2"};
self.preload = {"images":
[{"url":"bg.jpg"},
{"url":"adriana_facebook.png"},
{"url":"adriana_app.png"} 

]};


self.nodes = {"content": 
	[
	
{  	"ID": "3.9.1",
	"type":"info",
	"background":{"type":"image","url":"bg.jpg"},
	"image": [
			{"url":"adriana_facebook.png"} 
			],
	"justify":"leftifmobile",
    "animation":"fade",
	"showNextButton":"0"
	},
	{  	"ID": "3.9.2",
	"type":"info",
	"background":{"type":"image","url":"bg.jpg"},
	"image": [
			{"url":"adriana_app.png"} 
			],
	"justify":"leftifmobile",
    "animation":"fade",
	"showNextButton":"0",
	"callback":"Case1a",
	"callbackNode":"2"
	}
	
]};


	return self;

})({});


