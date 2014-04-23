var CaseAdriana_Mail = (function(self){
self.ID = {"text":"CaseAdriana_Mail", "type":"sub","prevcase":"Case1a","lastNodeNr":"2"};
self.preload = {"images":
[{"url":"bg.jpg"},
{"url":"ansokan_adriana.png"} 
]};


self.nodes = {"content": 
	[
	
		
	{  	"ID": "3.7.1",
	"type":"info",
	"background":{"type":"image","url":"bg.jpg"},
	"image": [
			{"url":"ansokan_adriana.png"} 
			],
	"justify":"leftifmobile",
    "animation":"fade",
	"showNextButton":"0"
	},
		{  	"ID": "3.7.2",
	"type":"video_seq",
	"background":{"type":"image","url":"bg.jpg"},
	"sequences":[
			{
			"sequenceID":"0",
			"type":"video",
			"url":"http://player.vimeo.com/video/91903029"
			}],
	"animation":"fade",
	"showNextButton":"0",
	"callback":"Case1a",
	"callbackNode":"2"
	}

	
]};


	return self;

})({});


