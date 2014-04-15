var Case1a = (function(self){
self.ID = {"text":"Case1a"};
self.preload = {"images":
[{"url":"bg.jpg"}
]};


self.nodes = {"content": 
	[
	{  	"ID": "D1.10",
		"type":"info",
		"background":{"type":"image","url":"bg.jpg"},
		"pretext":"Du är <b>chef</b> för en verksamhet.",
     	"image": [
     		{"url":"image1_desk.png"} 
     	],
     	"animation":"fade",
		"showNextButton":"0"
	},
	{  	"ID": "D1.20",
		"type":"tradequestion", 
		"background":{"type":"image","url":"bg.jpg"},
		"analysisLog":"D1.20",
		"pretext":"Vilken bransch jobbar du inom?",
		"trades": [
     		{"trade":"IT",
     		 "image":"icon1.png",
     		 "answer_id":"1"},
     		 {"trade":"Design",
     		 "image":"icon2.png",
     		 "answer_id":"2"} ,
     		 {"trade":"Industri",
     		 "image":"icon3.png",
     		 "answer_id":"3"} ,
     		 {"trade":"Vård & Omsorg",
     		 "image":"icon4.png",
     		 "answer_id":"4"},
     		 {"trade":"Jord- & Skogsbruk",
     		 "image":"icon5.png",
     		 "answer_id":"5"},
     		 {"trade":"Transport",
     		 "image":"icon6.png",
     		 "answer_id":"6"} ,
     		 {"trade":"Bygg",
     		 "image":"icon7.png",
     		 "answer_id":"7"} ,
     		 {"trade":"Miljö",
     		 "image":"icon8.png",
     		 "answer_id":"8"} 
     	],
     	"question_id":"1",
		"animation":"fade",
		"showNextButton":"-1"
	},


	
	{  	"ID": "D1.30",
		"type":"info",
		"background":{"type":"image","url":"bg.jpg"},
		"pretext":"Sista tiden har det gått bra för din verksamhet.<br/>Ni har så mycket att göra att ni måste anställa mer personal.",
     	"justify":"leftifmobile",
     	"animation":"fade",
		"showNextButton":"0"
	},
	{  	"ID": "D1.40",
		"type":"mark_question", 
		"subtype":"mq1",
		"modal":"true",
		"analysisLog":"D1.40",
		"question":"Vart söker du personal?",
		"pretext":"Välj 3 alternativ som du tror fungerar bäst",
		"nrOfAnswers":"3",
		"background":{"type":"image","url":"bg.jpg"},
		"answers":[
							{"text":"Arbetsförmedlingen","analysisLog":"Arbetsförmedlingen", "answer_id":"9", "modal":"Arbetsförmedlingen är Sveriges största förmedlare av arbeten. Alla tjänster är avgiftsfria.<br><br>Det går både att annonsera att man söker personal, och söka bland de arbetssökande som finns registrerade hos arbetsförmedlningen."},
							{"text":"Karriärs- och jobbsajter","analysisLog":"Karriärs- och jobbsajter", "answer_id":"10",  "modal":"info saknas"},
							{"text":"Annons i papperstidningar","analysisLog":"Annons i papperstidningar", "answer_id":"11", "modal":"info saknas"},
							{"text":"Bekanta till medarbetare","analysisLog":"Bekanta till medarbetare", "answer_id":"12", "modal":"info saknas"},
							{"text":"Sociala medier","analysisLog":"Sociala medier", "answer_id":"13", "modal":"info saknas"},
							{"text":"Webbtidningar","analysisLog":"Webbtidningar", "answer_id":"14", "modal":"info saknas"},
							{"text":"Ta hjälp av en rekryterare","analysisLog":"Ta hjälp av en rekryterare", "answer_id":"15", "modal":"info saknas"}
		
				]
		 ,
		 "question_id":"2",
		 "animation":"fade",
		 "showNextButton":"-1"
	},

	{  	"ID": "D1.50",
		"type":"info",
		"background":{"type":"image","url":"bg.jpg"},
		"pretext":"Bra! Du har nu skickat ut information om att ni söker personal. <br><br> Tre personer som sökt jobbet har den kompetens ni letar efter. Välj två som du vill anställa i ett halvår med möjlighet till förlängning.",
     	"justify":"leftifmobile",
     	"animation":"fade",
		"showNextButton":"0"
		
	},
	{  "ID": "CaseVS_HUB",
		"type":"hub", 
		"analysisLog":"CaseVS_HUB:",
		"title":"Ta reda på mer om de tre kandidaterna:",
		"background":{"type":"image","url":"bg.jpg"},
		"hubimage":"hub1_960.jpg",
		"hubimagemobile":"hub1mobile.png",
		"chapters":[
							{"icon":"icon_mail.png", 
								"ID":"0",
								"lockeduntil":"0", 
								"left":"26px", "top":"71px", 
								"analysisLog":"Hub Sam Mail",
								"callback":"CaseSam_Mail"},
							{"icon":"icon_internet.png", 
								"ID":"1",
								"lockeduntil":"0", 
								"left":"194px", "top":"346px", 
								"analysisLog":"Hub Sam Internet",
								"callback":"CaseSam_Internet"},
							{"icon":"icon_video.png", 
								"ID":"2",
								"lockeduntil":"0", 
								"left": "53px","top": "526px",
								"analysisLog":"Hub Sam Video",
								"callback":"CaseSam_Video"},
							{"icon":"icon_mail.png", 
								"ID":"3",
								"lockeduntil":"0", 
								"left":"344px", "top":"112px", 
								"analysisLog":"Hub Maria Mail",
								"callback":"CaseMaria_Mail"},
							{"icon":"icon_internet.png", 
								"ID":"4",
								"lockeduntil":"0", 
								"left":"500px", "top":"280px", 
								"analysisLog":"Hub Maria Video",
								"callback":"CaseMaria_Video"},
							{"icon":"icon_video.png", 
								"ID":"5",
								"lockeduntil":"0", 
								"left":"363px", "top":"490px", 
								"analysisLog":"Hub Maria Internet",
								"callback":"CaseMaria_Internet"},
							{"icon":"icon_mail.png", 
								"ID":"6",
								"lockeduntil":"0", 
								"left":"834px", "top":"289px", 
								"analysisLog":"Hub Adriana Mail",
								"callback":"CaseAdriana_Mail"},
							{"icon":"icon_internet.png", 
								"ID":"7",
								"lockeduntil":"0", 
								"left":"676px", "top":"449px", 
								"analysisLog":"Hub Adriana Internet",
								"callback":"CaseAdriana_Internet"},
							{"icon":"icon_video.png", 
								"ID":"8",
								"lockeduntil":"0", 
								"left":"825px", "top":"67px", 
								"analysisLog":"Hub Adriana Video",
								"callback":"CaseAdriana_Video"},
							
				],
		 "animation":"fade",
		 "showNextButton":"0"
		
		},
	{  	"ID": "D1.60",
		"type":"mark_question", 
		"subtype":"mq2", 
		"analysisLog":"D1.60",
		"question":"Vilka två får jobbet?",
		"pretext":"Du kan gå tillbaka om du behöver mer information.",
		"nrOfAnswers":"2",
		"background":{"type":"image","url":"bg.jpg"},
		"answers":[
							{"text":"Sam","analysisLog":"Sam", "answer_id":"Sam"},
							{"text":"Maria","analysisLog":"Maria", "answer_id":"Maria"},
							{"text":"Adriana","analysisLog":"Adriana", "answer_id":"Adriana"}
							
				]
		 ,
		 "question_id":"3",
		 "animation":"fade",
		 "showNextButton":"-1"
	},
	{  	"ID": "D1.70",
		"type":"info",
		"background":{"type":"image","url":"bg.jpg"},
		"pretext":"Nu har det snart gått en tid och det är dags att utvärdera hur de nyanställda fungerar på arbetsplatsen.",
		"justify":"leftifmobile",
     	"animation":"fade",
		"showNextButton":"0"
		
	},
	{  	"ID": "D1.80",
		"type":"info",
		"background":{"type":"image","url":"bg.jpg"},
		"pretext":"Du kan dels fråga deras projektledare och kollega vad de tänkar.<br>För att få en mer helhetlig bild kan du också titta på nätet.",
		"justify":"leftifmobile",
     	"animation":"fade",
		"showNextButton":"0"
		
	},
		{  "ID": "CaseVS_HUB2",
		"type":"hub", 
		"analysisLog":"CaseVS_HUB2:",
		"title":"Utvärdering",
		"background":{"type":"image","url":"bg.jpg"},
		"hubimage":"hub1_960.jpg",
		"chapters":[
							{"icon":"icon_mail.png", 
								"ID":"0",
								"lockeduntil":"0", 
								"left":"23px", "top":"66px", 
								"analysisLog":"Hub Sam Mail",
								"callback":"CaseSam_Mail"},
							{"icon":"icon_internet.png", 
								"ID":"1",
								"lockeduntil":"0", 
								"left":"172px", "top":"304px", 
								"analysisLog":"Hub Sam Internet",
								"callback":"CaseSam_Internet"},
							{"icon":"icon_video.png", 
								"ID":"2",
								"lockeduntil":"0", 
								"left": "48px",
								"top": "463px",
								"analysisLog":"Hub Sam Video",
								"callback":"CaseSam_Video"},
							{"icon":"icon_mail.png", 
								"ID":"3",
								"lockeduntil":"0", 
								"left":"303px", "top":"99px", 
								"analysisLog":"Hub Maria Mail",
								"callback":"CaseMaria_Mail"},
							{"icon":"icon_internet.png", 
								"ID":"4",
								"lockeduntil":"0", 
								"left":"440px", "top":"246px", 
								"analysisLog":"Hub Maria Video",
								"callback":"CaseMaria_Video"},
							{"icon":"icon_video.png", 
								"ID":"5",
								"lockeduntil":"0", 
								"left":"319px", "top":"431px", 
								"analysisLog":"Hub Maria Internet",
								"callback":"CaseMaria_Internet"},
							{"icon":"icon_mail.png", 
								"ID":"6",
								"lockeduntil":"0", 
								"left":"735px", "top":"255px", 
								"analysisLog":"Hub Adriana Mail",
								"callback":"CaseAdriana_Mail"},
							{"icon":"icon_internet.png", 
								"ID":"7",
								"lockeduntil":"0", 
								"left":"596px", "top":"396px", 
								"analysisLog":"Hub Adriana Internet",
								"callback":"CaseAdriana_Internet"},
							{"icon":"icon_video.png", 
								"ID":"8",
								"lockeduntil":"0", 
								"left":"727px", "top":"59px", 
								"analysisLog":"Hub Adriana Video",
								"callback":"CaseAdriana_Video"},
							
				],
		 "animation":"fade",
		 "showNextButton":"0"
		
		},
		{  	"ID": "D1.100",
		"type":"mark_question", 
		"subtype":"mq3", 
		"analysisLog":"D1.100",
		"question":"Får en, båda eller ingen jobba kvar?",
		"pretext":"Du kan gå tillbaka om du behöver mer information.",
		"nrOfAnswers":"1",
		"background":{"type":"image","url":"bg.jpg"},
		"answers":[
							{"text":"Sam får jobba kvar","analysisLog":"Sam får jobba kvar", "answer_id":"19"},
							{"text":"Maria får jobba kvar","analysisLog":"Maria får jobba kvar", "answer_id":"20"},
							{"text":"Adriana får jobba kvar","analysisLog":"Adriana får jobba kvar", "answer_id":"21"},
							{"text":"Båda får jobba kvar","analysisLog":"Båda får jobba kvar", "answer_id":"both"},
							{"text":"Ingen får jobba kvar","analysisLog":"Ingen får jobba kvar", "answer_id":"25"}
							
				]
		 ,
		 "question_id":"4",
		 "animation":"fade",
		 "showNextButton":"-1",
		 "callback":"OUTRO"
	}
	
	  ]
};


	return self;

})({});




/*

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
		 "callback":"OUTRO",
		 "showButton":"true",
		 "btnText":"Tillbaka till startsidan",
		 "btnURL":"http://vagskal.vps-56841.cloudnet.se/"
	}

    ]*/