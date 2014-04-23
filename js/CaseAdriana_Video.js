var CaseAdriana_Video = (function(self){
self.ID = {"text":"CaseAdriana_Video", "type":"sub","prevcase":"Case1a","lastNodeNr":"2"};
self.preload = {"images":
[{"url":"bg.jpg"}
]};


self.nodes = {"content": 
	[
	
	{  	"ID": "3.8.1",
		"type":"video_seq",
		"background":{"type":"image","url":"bg.jpg"},
		"sequences":[
		{
				"sequenceID":"0",
				"type":"question",
				"text":"Fråga Adriana:",
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
							 	"url":"http://player.vimeo.com/video/91901975", 
							 	 "gotoID":"0"
							},
							{	
								"sequenceID":"2",
								"type":"video",
								"url":"http://player.vimeo.com/video/91901976", 
								 "gotoID":"0"
							},

							{	
								"sequenceID":"3",
								"type":"video",
								"url":"http://player.vimeo.com/video/91901978", 
								 "gotoID":"0"
							},
							{	
								"sequenceID":"4",
								"type":"video",
								"url":"http://player.vimeo.com/video/91901977", 
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


