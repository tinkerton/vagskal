var CaseSam_Mail = (function(self){
self.ID = {"text":"CaseSam_Mail", "type":"sub","prevcase":"Case1a","lastNodeNr":"2"};
self.preload = {"images":
[{"url":"bg.jpg"},
{"url":"ansokan_sam.png"} 
]};


self.nodes = {"content": 
	[

	{  	"ID": "3.4.2",
	"type":"video_seq",
	"background":{"type":"image","url":"bg.jpg"},
	"sequences":[
			{
			"sequenceID":"0",
			"type":"video",
			"url":"http://player.vimeo.com/video/91403920"
			}],
	"animation":"fade",
	"showNextButton":"0"
	},
	{  	"ID": "3.4.1",
	"type":"info",
	"background":{"type":"image","url":"bg.jpg"},
	"image": [
			{"url":"ansokan_sam.png"} 
			],
	"justify":"leftifmobile",
    "animation":"fade",
	"showNextButton":"0",
	"callback":"Case1a",
	"callbackNode":"2"
	},
	
	
]};


	return self;

})({});


