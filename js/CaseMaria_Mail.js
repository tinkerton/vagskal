var CaseMaria_Mail = (function(self){
self.ID = {"text":"CaseMaria_Mail", "type":"sub","prevcase":"Case1a","lastNodeNr":"4"};
self.preload = {"images":
[{"url":"bg.jpg"}
]};


self.nodes = {"content": 
	[
		
	{  	"ID": "SM1.10",
	"type":"info",
	"background":{"type":"image","url":"bg.jpg"},
	"pretext":"Detta är Marias mail-case",
	"image": [
	{"url":"ansokan_maria.png"} 
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
	"callbackNode":"4"
	}


	
	
]};


	return self;

})({});


