var CaseIntro = (function(self){
self.ID = {"text":"CaseIntro"};
self.preload = {"images":
[{"url":"bg.jpg"}
]};


self.nodes = {"content": 
	[
	{  	"ID": "INTRO.1",
		"type":"agent",
		"background":{"type":"image","url":"bg.jpg"},
		"text":"Instruktioner: Detta är en instruktionstext.<br><br>Här skall vi lägga in spelet sedan.",
     	"animation":"fade",
		"showNextButton":"2000",
	},
	{  	"ID": "Intro question",
		"type":"question", 
		"analysisLog":"intro_testquestion",
		"question":"Kim: Dina svar kommer inte lagras eller registreras, utan frågorna handlar om att du själv ska reflektera kring vad du tänker och tycker.<br><br> Vad tycker du är det viktigaste att tänka på när det gäller sex?",
		"background":{"type":"image","url":"bg.jpg"},
		"answers":[
							{"text":"Respekt för alla inblandade.","analysisLog":"1. Respekt"},
							{"text":"Det ska vara säkert och schysst.","analysisLog":"2. Tryggt"},
							{"text":"Att det är skönt och roligt.","analysisLog":"3. Roligt"}
				]
		 ,
		 "animation":"fade",
		 "showNextButton":"-1"
	},
	{  	"ID": "Case1_Intro",
		"type":"video_seq",
		"size":"twelve",
		"background":{"type":"image","url":"bg.jpg"},
		"sequences":[

			{
				"sequenceID":"0",
			 	"type":"video",
			 	"url":"http://player.vimeo.com/video/74038866"
			 }],

			 "animation":"fade",
		 	"showNextButton":"0",
			 "callback":"VS_demo"
	}
	
    ]
};


	return self;

})({});
