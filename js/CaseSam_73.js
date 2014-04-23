var CaseSam_73 = (function(self){
self.ID = {"text":"CaseSam_73", "type":"sub","prevcase":"Case1a","lastNodeNr":"6"};
self.preload = {"images":
[{"url":"bg.jpg"}
]};


self.nodes = {"content": 
	[
	
	{  	"ID": "7.3",
		"type":"video_seq",
		"background":{"type":"image","url":"bg.jpg"},
		"sequences":[
				{
				"sequenceID":"0",
			 	"type":"video",
			 	"url":"http://player.vimeo.com/video/92122464",
			 	 "gotoID":"1"
				},
				{
				"sequenceID":"1",
				"type":"question",
				"text":"Fråga Sams projektledare:",
				"answers":[
							{"text":"Vilka är Sams styrkor?", "gotoID":"2"}, 
							{"text":"Hur är Sams kommunikation med andra?", "gotoID":"3"},  
							{"text":"Vilka är Sams svagheter?", "gotoID":"4"},
							{"text":"Avsluta", "gotoID":"-1"} 
						]
					},
							{	
								"sequenceID":"2",
								"type":"video",
							 	"url":"http://player.vimeo.com/video/92122466", 
							 	 "gotoID":"1"
							},
							{	
								"sequenceID":"3",
								"type":"video",
								"url":"http://player.vimeo.com/video/92122467", 
								 "gotoID":"1"
							},

							{	
								"sequenceID":"4",
								"type":"video",
								"url":"http://player.vimeo.com/video/92123219", 
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


