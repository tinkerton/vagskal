var CaseMaria_Video = (function(self){
self.ID = {"text":"CaseMaria_Video", "type":"sub","prevcase":"Case1a","lastNodeNr":"2"};
self.preload = {"images":
[{"url":"bg.jpg"}
]};


self.nodes = {"content": 
	[
	
	{  	"ID": "3.2.1",
		"type":"video_seq",
		"background":{"type":"image","url":"bg.jpg"},
		"sequences":[
		{
				"sequenceID":"0",
				"type":"question",
				"text":"Fråga Maria:",
				"answers":[
							{"text":"Berätta lite om dig själv", "gotoID":"1"}, 
							{"text":"Varför sökte du det här jobbet?", "gotoID":"2"},  
							{"text":"Vad är dina främsta styrkor?", "gotoID":"3"},
							{"text":"Vad är dina svagheter?", "gotoID":"4"} ,
							{"text":"Avsluta intervjun", "gotoID":"-1"} 
						]
					},
							{	
								"sequenceID":"1",
								"type":"video",
							 	"url":"http://player.vimeo.com/video/91707282", 
							 	 "gotoID":"0"
							},
							{	
								"sequenceID":"2",
								"type":"video",
								"url":"http://player.vimeo.com/video/91707335", 
								 "gotoID":"0"
							},

							{	
								"sequenceID":"3",
								"type":"video",
								"url":"http://player.vimeo.com/video/91707390", 
								 "gotoID":"0"
							},
							{	
								"sequenceID":"4",
								"type":"video",
								"url":"http://player.vimeo.com/video/91707389", 
								 "gotoID":"0"
							}
			],
     	"animation":"fade",
		"showNextButton":"-1",
		"callback":"Case1a",
		"callbackNode":"2"
	}

	


	
	
]};


	return self;

})({});


