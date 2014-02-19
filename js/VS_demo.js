var CaseIntro = (function(self){
self.ID = {"text":"CaseIntro"};
self.preload = {"images":
[{"url":"bg.jpg"}
]};


self.nodes = {"content": 
	[
	{  	"ID": "D1.1",
		"type":"question", 
		"analysisLog":"D1.1",
		"question":"Vad vill du jobba med?",
		"background":{"type":"image","url":"bg.jpg"},
		"answers":[
							{"text":"Ledarskap","analysisLog":"Ledarskap"},
							{"text":"Kreativitet","analysisLog":"Kreativitet"},
							{"text":"Fysiskt arbete","analysisLog":"Fysiskt arbete"},
							{"text":"Undervisning","analysisLog":"Undervisning"},
							{"text":"Vård","analysisLog":"Vård"},
							{"text":"Service","analysisLog":"Service"}
		
				]
		 ,
		 "animation":"fade",
		 "showNextButton":"-1"
	},

	{  	"ID": "D1.2",
		"type":"agent",
		"background":{"type":"image","url":"bg.jpg"},
		"text":"Var finns jobben?<br><br>Välj de 3 sätt att söka jobb som du tror fungerar bäst för de områden som du vill söka jobb inom.",
     	"animation":"fade",
		"showNextButton":"0"
	},
	{  	"ID": "D1.3",
		"type":"question", 
		"analysisLog":"D1.3",
		"question":"Vad hittar du jobbet?",
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
		"type":"question", 
		"analysisLog":"D1.4",
		"question":"Jag valde dessa söksätt för att...",
		"background":{"type":"image","url":"bg.jpg"},
		"answers":[
							{"text":"A. Det är bekvämt eftersom jag kan söka på alla dessa sätt via internet","analysisLog":"A"},
							{"text":"B. Det är en blandning som gör att jag får kontakt med en arbetsplats på flera olika sätt","analysisLog":"B"},
							{"text":"C. De är kanske de jobbigaste sätten att söka jobb på men kanske de som ger störst chans till intervju och anställning","analysisLog":"C"}
		
				]
		 ,
		 "animation":"fade",
		 "showNextButton":"-1"
	},
	{  	"ID": "D1.5",
		"type":"info",
		"title":"B. Det är Det är en blandning som gör att jag får kontakt med en arbetsplats på flera olika sätt.",
		"background":{"type":"image","url":"bg.jpg"},
		"posttext":"156 personer (55%) tycker samma sak som dig.<br><br>A 25% - B 55% - C 20%",
		 "animation":"fade",
		 "showNextButton":"0"
},
{  	"ID": "D1.6",
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
		"ID": "D1.7",
		"type":"info",
		"title":"Checklista",
		"background":{"type":"image","url":"bg.jpg"},
		"posttext":"LinkedIn<br><br>Studie- och yrkesvägledare<br><br>Eget kontaktnät",
		 "animation":"fade",
		 "showNextButton":"0",
		 "callback":"OUTRO"
	
	}
    ]
};


	return self;

})({});
