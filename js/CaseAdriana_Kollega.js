var CaseAdriana_Kollega = (function(self){
self.ID = {"text":"CaseAdriana_Kollega", "type":"sub","prevcase":"Case1a","lastNodeNr":"1"};
self.preload = {"images":
[{"url":"bg.jpg"}
]};


self.nodes = {"content": 
	[
		
	{  	"ID": "SM1.10",
	"type":"info",
	"background":{"type":"image","url":"bg.jpg"},
	"pretext":"Detta är Adrianas Kollega-case",
	"image": [
	{"url":"kollega_adriana.png"} 
	],
	"justify":"leftifmobile",
    "animation":"fade",
	"showNextButton":"0"
	},
		{  	"ID": "SM1.11",
	"type":"video_seq",
	"background":{"type":"image","url":"bg.jpg"},
	"sequences":[
	{
	"sequenceID":"0",
	"type":"video",
	"url":"http://player.vimeo.com/video/91730826"
	}],
	"animation":"fade",
	"showNextButton":"0",
	"callback":"Case1a",
	"callbackNode":"1"
	}


	
	
]};


	return self;

})({});


