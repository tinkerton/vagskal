var CaseMaria_71 = (function(self){
self.ID = {"text":"CaseMaria_71", "type":"sub","prevcase":"Case1a","lastNodeNr":"6"};
self.preload = {"images":
[{"url":"bg.jpg"}
]};


self.nodes = {"content": 
	[
	
	{  	"ID": "7.1",
		"type":"video_seq",
		"background":{"type":"image","url":"bg.jpg"},
		"sequences":[
				{
				"sequenceID":"0",
			 	"type":"video",
			 	"url":"http://player.vimeo.com/video/92123220",
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
							 	"url":"http://player.vimeo.com/video/92123222", 
							 	 "gotoID":"1"
							},
							{	
								"sequenceID":"3",
								"type":"video",
								"url":"http://player.vimeo.com/video/92123224", 
								 "gotoID":"1"
							},

							{	
								"sequenceID":"4",
								"type":"video",
								"url":"http://player.vimeo.com/video/92123225", 
								 "gotoID":"1"
							}
			],
     	"animation":"fade",
		"showNextButton":"-1",
		"callback":"Case1a",
		"callbackNode":"6"
	}

	
]};


	return self;

})({});


