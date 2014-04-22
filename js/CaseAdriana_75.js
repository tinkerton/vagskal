var CaseAdriana_75 = (function(self){
self.ID = {"text":"CaseAdriana_75", "type":"sub","prevcase":"Case1a","lastNodeNr":"5"};
self.preload = {"images":
[{"url":"bg.jpg"}
]};


self.nodes = {"content": 
	[
	
{  	"ID": "7.6",
		"type":"video_seq",
		"background":{"type":"image","url":"bg.jpg"},
		"sequences":[
				{
				"sequenceID":"0",
			 	"type":"video",
			 	"url":"http://player.vimeo.com/video/92123860",
			 	 "gotoID":"1"
				},
				{
				"sequenceID":"1",
				"type":"question",
				"text":"Fråga Marias projektledare:",
				"answers":[
							{"text":"Vilka är Marias styrkor?", "gotoID":"2"}, 
							{"text":"Hur är Marias kommunikation med andra?", "gotoID":"3"},  
							{"text":"Vilka är Marias svagheter?", "gotoID":"4"},
							{"text":"Avsluta", "gotoID":"-1"} 
						]
					},
							{	
								"sequenceID":"2",
								"type":"video",
							 	"url":"http://player.vimeo.com/video/92123862", 
							 	 "gotoID":"0"
							},
							{	
								"sequenceID":"3",
								"type":"video",
								"url":"http://player.vimeo.com/video/92123861", 
								 "gotoID":"0"
							},

							{	
								"sequenceID":"4",
								"type":"video",
								"url":"http://player.vimeo.com/video/92123863", 
								 "gotoID":"0"
							}
			],
     	"animation":"fade",
		"showNextButton":"-1",
		"callback":"Case1a",
		"callbackNode":"5"
	}
	
]};


	return self;

})({});


