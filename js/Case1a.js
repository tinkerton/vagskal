var Case1a = (function(self){
self.ID = {"text":"Case1a"};
self.preload = {"images":
[{"url":"bg.jpg"},
{"url":"image1_desk.png"},
{"url":"hub1mobile.png"},
{"url":"hub1.png"},
{"url":"adriana_facebook.png"},
{"url":"adriana_app.png"},
{"url":"ansokan_adriana.png"},
{"url":"maria_miniblogg.png"},
{"url":"maria_facebook.png"},
{"url":"maria_hemsida.png"},
{"url":"ansokan_maria.png"},
{"url":"sam_miniblogg.png"},
{"url":"sam_linkedin2.png"},
{"url":"sam_facebook.png"},
{"url":"sam_hemsida.png"},
{"url":"sam_linkedin.png"},
{"url":"ansokan_sam.png"},
{"url":"hub2_ma.png"},
{"url":"hub2_ms.png"},
{"url":"hub2_sa.png"}
]};


self.nodes = {"content": 
	[
	{  	"ID": "0",
		"type":"info",
		"analysisLog":"Node 2",
		"background":{"type":"image","url":"bg.jpg"},
		"pretext":"<b>@Jobbet</b> handlar om att vara chef och bestämma vem du vill anställa. Tre personer söker. Vilka får chansen? Vem eller vilka får fortsätta jobba? Alla personer i spelet gestaltas av skådespelare.",
     	"justify":"leftifmobile",
     	"animation":"fade",
		"showNextButton":"0"
	},
	{  	"ID": "1",
		"type":"info",
		"analysisLog":"Node 1",
		"background":{"type":"image","url":"bg.jpg"},
		"pretext":"Välkommen till positionen som <b>chef</b> för en verksamhet",
     	"image": [
     		{"url":"image1_desk.png"} 
     	],
     	"animation":"fade",
		"showNextButton":"0"
	},
	
	{  	"ID": "2",
		"type":"info",
		"analysisLog":"Node 2",
		"background":{"type":"image","url":"bg.jpg"},
		"pretext":"Det går bra för din verksamhet och det innebär att ni måste anställa mer personal. <b>Två projektassistenter</b> ska anställas ett halvår med möjlighet till förlängning.",
     	"justify":"leftifmobile",
     	"animation":"fade",
		"showNextButton":"0"
	},
	
	{  "ID": "3",
		"type":"hub", 
		"analysisLog":"CaseVS_HUB:",
		"background":{"type":"image","url":"bg.jpg"},
		"hubimage":"hub1.png",
		"hubimagemobile":"hub1mobile.png",
		"chapters":[		
							{"icon":"none.png", 
								"ID":"0",
								"lockeduntil":"0", 
								"left":"200px", "top":"158px", 
								"analysisLog":"Hub Maria Mail",
								"callback":"CaseMaria_Mail"},
							{"icon":"none.png", 
								"ID":"1",
								"lockeduntil":"0", 
								"left":"29px", "top":"130px", 
								"analysisLog":"Hub Maria Internet",
								"callback":"CaseMaria_Internet"},
							{"icon":"none.png", 
								"ID":"2",
								"lockeduntil":"0", 
								"left":"166px", "top":"408px", 
								"analysisLog":"Hub Maria Video",
								"callback":"CaseMaria_Video"},
							{"icon":"none.png", 
								"ID":"3",
								"lockeduntil":"0", 
								"left":"202px", "top":"521px", 
								"analysisLog":"Hub Maria Kollega",
								"callback":"CaseMaria_Kollega"},



							{"icon":"none.png", 
								"ID":"4",
								"lockeduntil":"0", 
									"left":"530px", "top":"131px", 
								"analysisLog":"Hub Sam Mail",
								"callback":"CaseSam_Mail"},
							{"icon":"none.png", 
								"ID":"5",
								"lockeduntil":"0", 
								"left":"357px", "top":"229px",
								"analysisLog":"Hub Sam Internet",
								"callback":"CaseSam_Internet"},
							{"icon":"none.png", 
								"ID":"6",
								"lockeduntil":"0", 
								"left":"360px", "top":"511px",
								"analysisLog":"Hub Sam Video",
								"callback":"CaseSam_Video"},
							{"icon":"none.png", 
								"ID":"7",
								"lockeduntil":"0", 
								"left":"522px", "top":"425px", 
								"analysisLog":"Hub Sam Kollega",
								"callback":"CaseSam_Kollega"},


							
							{"icon":"none.png", 
								"ID":"8",
								"lockeduntil":"0", 
								"left":"824px", "top":"246px", 
								"analysisLog":"Hub Adriana Mail",
								"callback":"CaseAdriana_Mail"},
							{"icon":"none.png", 
								"ID":"9",
								"lockeduntil":"0", 
									"left":"843px", "top":"140px", 
								"analysisLog":"Hub Adriana Internet",
								"callback":"CaseAdriana_Internet"},
							{"icon":"none.png", 
								"ID":"10",
								"lockeduntil":"0", 
									"left":"690px", "top":"454px", 
								"analysisLog":"Hub Adriana Video",
								"callback":"CaseAdriana_Video"},
								{"icon":"none.png", 
								"ID":"11",
								"lockeduntil":"0", 
									"left":"825px", "top":"514px", 
								"analysisLog":"Hub Adriana Kollega",
								"callback":"CaseAdriana_Kollega"}


								
							
				],
		 "animation":"fade",
		 "showNextButton":"-1"
		
		},
	{  	"ID": "4",
		"type":"mark_question", 
		"subtype":"mq2", 
		"analysisLog":"Node 4",
		"question":"<b>Vilka två</b> får anställning i ett halvår med möjlighet till förlängning?",
		"pretext":"",
		"nrOfAnswers":"2",
		"background":{"type":"image","url":"bg.jpg"},
		"answers":[
							{"text":"Maria","analysisLog":"Maria", "answer_id":"Maria"},
							{"text":"Sam","analysisLog":"Sam", "answer_id":"Sam"},
							{"text":"Adriana","analysisLog":"Adriana", "answer_id":"Adriana"}
							
				]
		 ,
		 "question_id":"3",
		 "animation":"fade",
		 "showNextButton":"-1"
	},
	{  	"ID": "10",
		"type":"mark_question", 
		"subtype":"mq4", 
		"analysisLog":"Node 10",
		"question":"Vad var viktigast när du valde vem du skulle anställa?",
		"pretext":"",
		"nrOfAnswers":"1",
		"background":{"type":"image","url":"bg.jpg"},
		"answers":[
							{"text":"Jag valde de två som påminde mest om mig själv","analysisLog":"Jag valde de två som påminde mest om mig själv", "answer_id":"29"},
							{"text":"Jag valde de två som verkade mest seriösa","analysisLog":"Jag valde de två som verkade mest seriösa", "answer_id":"30"},
							{"text":"Jag valde de två som jag tror att en arbetsgivare i verkligheten skulle ha valt","analysisLog":"Jag valde de två som jag tror att en arbetsgivare i verkligheten skulle ha valt", "answer_id":"31"},
							{"text":"Annan anledning","analysisLog":"Annan anledning", "answer_id":"32"}
							
				]
		 ,
		 "question_id":"8",
		 "animation":"fade",
		 "showNextButton":"-1"
	},
	{  	"ID": "5",
		"type":"info",
		"analysisLog":"Node 5",
		"background":{"type":"image","url":"bg.jpg"},
		"pretext":"Det har nu gått fem månader och snart ska det bestämmas om någon eller båda de nyanställda ska stanna på företaget.<br><br>Du kan dels fråga deras projektledare hur arbetat gått sista tiden, och dels titta på om de skrivit något om sitt jobb på internet.",
		"justify":"leftifmobile",
     	"animation":"fade",
		"showNextButton":"0"
		
	},
	/*{  	"ID": "6",
		"type":"info",
		"analysisLog":"Node 6",
		"background":{"type":"image","url":"bg.jpg"},
		"pretext":"Du kan dels fråga deras projektledare hur arbetat gått sista tiden, och dels titta på om de skrivit något om sitt jobb på internet.",
		"justify":"leftifmobile",
     	"animation":"fade",
		"showNextButton":"0"
		
	},*/
		{  "ID": "7",
		"type":"hub", 
		"subtype":"hub2",
		"analysisLog":"CaseVS_HUB2:",
		"background":{"type":"image","url":"bg.jpg"},
		"hubimage":"hub2_",
		"chapters":[
							{"icon":"none.png", 
								"ID":"0",
								"lockeduntil":"0", 
								"left":"114px", "top":"396px", 
								"analysisLog":"Hub2 Maria PL",
								"owner":"maria",
								"callback":"CaseMaria_71"},
							{"icon":"none.png", 
								"ID":"1",
								"lockeduntil":"0", 
								"left":"204px", "top":"396px", 
								"owner":"maria",
								"analysisLog":"Hub2 Maria Instagram Facebook",
								"callback":"CaseMaria_721"},
							/*{"icon":"icon_video.png", 
								"ID":"2",
								"lockeduntil":"0", 
								"left": "48px",
								"top": "463px",
								"owner":"maria",
								"analysisLog":"Hub2 Maria Facebook",
								"callback":"CaseMaria_722"},*/
							{"icon":"none.png", 
								"ID":"2",
								"lockeduntil":"0", 
								"left":"420px", "top":"396px", 
								"analysisLog":"Hub2 Sam PL",
								"owner":"sam",
								"callback":"CaseSam_73"},
							{"icon":"none.png", 
								"ID":"3",
								"lockeduntil":"0", 
								"left":"511px", "top":"396px", 
								"analysisLog":"Hub2 Sam Twitter LinkedIn",
								"owner":"sam",
								"callback":"CaseSam_741"},
						/*	{"icon":"icon_video.png", 
								"ID":"5",
								"lockeduntil":"0", 
								"left":"319px", "top":"431px", 
								"analysisLog":"Hub Sam LinkedIn",
								"owner":"sam",
								"callback":"CaseSam_742"},*/
							{"icon":"none.png", 
								"ID":"4",
								"lockeduntil":"0", 
								"left":"742px", "top":"396px", 
								"analysisLog":"Hub Adriana PL",
								"owner":"adriana",
								"callback":"CaseAdriana_75"},
							{"icon":"none.png", 
								"ID":"5",
								"lockeduntil":"0", 
								"left":"835px", "top":"396px", 
								"analysisLog":"Hub Adriana facebook",
								"owner":"adriana",
								"callback":"CaseAdriana_76"}
							
							
				],
		 "animation":"fade",
		 "showNextButton":"-1"
		
		},
		{  	
		"ID": "8",
		"type":"mark_question", 
		"subtype":"mq3", 
		"analysisLog":"Node 8",
		"question":"Vem får fortsätta arbeta?",
		"pretext":"",
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
		 "showNextButton":"-1"
	},
	{  	"ID": "9",
		"type":"mark_question", 
		"subtype":"mq4", 
		"analysisLog":"Node 9",
		"question":"Vad fick dig att fatta det här beslutet?",
		"pretext":"",
		"nrOfAnswers":"1",
		"background":{"type":"image","url":"bg.jpg"},
		"answers":[
							{"text":"Jag tycker att personen eller personera verkar ha gjort ett bra jobb","analysisLog":"För jag tycker att de verkar ha gjort ett bra jobb", "answer_id":"37"},
							{"text":"Personen eller personerna verkar ha gjort ett dåligt jobb","analysisLog":"De verkar ha gjort ett dåligt jobb", "answer_id":"38"},
							{"text":"Jag vill vara en schysst chef","analysisLog":"Jag vill vara en schysst chef", "answer_id":"39"},
							{"text":"Annan anledning","analysisLog":"Annan anledning", "answer_id":"40"}
							
				]
		 ,
		 "question_id":"10",
		 "animation":"fade",
		 "showNextButton":"-1"
	},
	{  	"ID": "0",
		"type":"info",
		"analysisLog":"Node 2",
		"background":{"type":"image","url":"bg.jpg"},
		"pretext":"Hur det går i framtiden för Adriana, Sam och Maria får vi inte veta mer om i detta spel. Vad tar du själv med dig efter att ha spelat @Jobbet? ",
     	"justify":"leftifmobile",
     	"animation":"fade",
		"showNextButton":"0"
	},
	{  	"ID": "11",
		"type":"mark_question", 
		"subtype":"mq4", 
		"analysisLog":"Node 11",
		"question":"Spelar det någon roll vad man skriver om sig själv på internet när man söker jobb?",
		"pretext":"",
		"nrOfAnswers":"1",
		"background":{"type":"image","url":"bg.jpg"},
		"answers":[
							{"text":"Ja","analysisLog":"Ja", "answer_id":"45"},
							{"text":"Lite. men det är inte det viktigaste","analysisLog":"Lite. men det är inte det viktigaste", "answer_id":"46"},
							{"text":"Nej","analysisLog":"Nej", "answer_id":"47"},
							{"text":"Det beror på vilket jobb man söker","analysisLog":"Det beror på vilket jobb man söker", "answer_id":"48"}
							
				]
		 ,
		 "question_id":"11",
		 "animation":"fade",
		 "showNextButton":"-1"
	},
	{  	"ID": "12",
		"type":"mark_question", 
		"subtype":"mq4", 
		"analysisLog":"Node 12",
		"question":"Tack för att du spelade! Hur kommer det sig att du spelade spelet?",
		"pretext":"",
		"nrOfAnswers":"1",
		"background":{"type":"image","url":"bg.jpg"},
		"answers":[
							{"text":"Jag spelar det som en del av skolarbetet","analysisLog":"Jag spelar det som en del av skolarbetet", "answer_id":"33"},
							{"text":"Min studie och yrkesvägledare ville att jag skulle spela","analysisLog":"Min studie och yrkesvägledare ville att jag skulle spela", "answer_id":"34"},
							{"text":"Jag hittade spelet själv och ville prova","analysisLog":"Jag hittade spelet själv och ville prova", "answer_id":"35"},
							{"text":"Annan anledning","analysisLog":"Annan anledning", "answer_id":"36"}
							
				]
		 ,
		 "question_id":"9",
		 "animation":"fade",
		 "showNextButton":"-1"
	},

		{  	"ID": "13",
		"type":"mark_question", 
		"subtype":"mq4", 
		"analysisLog":"Node 13",
		"question":"Är du...",
		"pretext":"",
		"nrOfAnswers":"1",
		"background":{"type":"image","url":"bg.jpg"},
		"answers":[
							{"text":"Tjej","analysisLog":"Tjej", "answer_id":"26"},
							{"text":"Kille","analysisLog":"Kille", "answer_id":"27"},
							{"text":"Varken eller","analysisLog":"Varken eller", "answer_id":"28"}
							
				]
		 ,
		 "question_id":"7",
		 "animation":"fade",
		 "showNextButton":"-1"
	},
		{  	
		"ID": "14",
		"type":"int_question", 
		"subtype":"mq5", 
		"analysisLog":"Node 14",
		"question":"Hur gammal är du?",
		"pretext":"",
		"nrOfAnswers":"1",
		"background":{"type":"image","url":"bg.jpg"},
		"answers":[
							{"text":"OK","analysisLog":"Ålder", "answer_id":"age"}
							
							
				]
		 ,
		 "question_id":"6",
		 "animation":"fade",
		 "showNextButton":"-1"
	},
	{  	
		"ID": "15",
		"type":"freetext_question", 
		"subtype":"mq6", 
		"analysisLog":"Node 15",
		"question":"Vill du skriva något om vad du tyckte om spelet?",
		"pretext":"",
		"nrOfAnswers":"1",
		"background":{"type":"image","url":"bg.jpg"},
		"answers":[
							{"text":"Skicka & avsluta","analysisLog":"Skrev fritext", "answer_id":"save"},
							{"text":"Avsluta","analysisLog":"Avslutade", "answer_id":"exit"}
							
							
				]
		 ,
		 "question_id":"12",
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