var CaseIntro = (function(self){
self.ID = {"text":"CaseIntro"};
self.preload = {"images":
[{"url":"bg.jpg"}
]};


self.nodes = {"content": 
	[
	{  	"ID": "D1.0",
		"type":"info",
		"background":{"type":"image","url":"bg.jpg"},
		"title":"Vägskäl",
		"pretext":"Introtext",
     	"animation":"fade",
		"showNextButton":"0"
	},
	{  	"ID": "D1.1",
		"type":"piechart", 
		"background":{"type":"image","url":"bg.jpg"},
		"analysisLog":"D1.1",
		"title":"Vad vill du jobba med?",
		"animation":"fade",
		"showNextButton":"-1"
	},
	
	{  	"ID": "D1.2",
		"type":"info",
		"background":{"type":"image","url":"bg.jpg"},
		"title":"Var finns jobben?",
		"pretext":"Välj de 3 sätt att söka jobb som du tror fungerar bäst för de områden som du vill söka jobb inom.",
     	"animation":"fade",
		"showNextButton":"0"
	},
	{  	"ID": "D1.3",
		"type":"mark_question", 
		"analysisLog":"D1.3",
		"question":"Var hittar du jobbet?",
		"pretext":"Välj 3 alternativ",
		"nrOfAnswers":"3",
		"background":{"type":"image","url":"bg.jpg"},
		"answers":[
							{"text":"Linkedin","analysisLog":"Linkedin"},
							{"text":"Studie- och yrkesvägledare","analysisLog":"Studie- och yrkesvägledare"},
							{"text":"Eget kontaktnät","analysisLog":"Eget kontaktnät"},
							{"text":"Via bemanningsföretag","analysisLog":"Via bemanningsföretag"},
							{"text":"Google","analysisLog":"Google"},
							{"text":"Företagens egna hemsidor","analysisLog":"Företagens egna hemsidor"},
							{"text":"Facebook","analysisLog":"Facebook"},
							{"text":"Branchorganisations hemsida","analysisLog":"Branchorganisations hemsida"},
							{"text":"Besök arbetsplatsen","analysisLog":"Besök arbetsplatsen"}
		
				]
		 ,
		 "animation":"fade",
		 "showNextButton":"-1"
	},
	{  	"ID": "D1.4",
		"type":"abc_question", 
		"ABC_ID":"1", 
		"analysisLog":"D1.4",
		"question":"Jag valde dessa söksätt för att...",
		"background":{"type":"image","url":"bg.jpg"},
		"answers":[
							{"text":"Det är bekvämt eftersom jag kan söka på alla dessa sätt via internet","analysisLog":"A"},
							{"text":"Det är en blandning som gör att jag får kontakt med en arbetsplats på flera olika sätt","analysisLog":"B"},
							{"text":"De är kanske de jobbigaste sätten att söka jobb på men kanske de som ger störst chans till intervju och anställning","analysisLog":"C"}
		
				]
		 ,
		 "animation":"fade",
		 "showNextButton":"0"
	},
	
{  	"ID": "D1.5",
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
		 	"showNextButton":"0"
	},
	{  	
		"ID": "D1.5",
		"type":"checklist",
		"title":"Checklista",
		"background":{"type":"image","url":"bg.jpg"},
		 "animation":"fade",
		 "showNextButton":"0",
		 "callback":"OUTRO"
	
	}
    ]
};


	return self;

})({});
