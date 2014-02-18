var VS_demo = (function(self){
self.ID = {"text":"VS_demo"};
self.preload = {"images":
[{"url":"bg.jpg"}
]};


self.nodes = {"content": 
	[
	{  	"ID": "DEMO.1",
		"type":"agent",
		"background":{"type":"image","url":"bg.jpg"},
		"text":"Instruktioner: Detta är chapter 2.<br><br>Spelet fortsätter.",
     	"animation":"fade",
		"showNextButton":"2000",
	},
	{  	"ID": "Demo question",
		"type":"question", 
		"analysisLog":"demo_exitquestion",
		"question":"Avslutningsfrågan lyder så här. Hade du kul?",
		"background":{"type":"image","url":"bg.jpg"},
		"answers":[
							{"text":"Ja.","analysisLog":"1. Ja"},
							{"text":"Nej.","analysisLog":"2. Nej"},
							{"text":"Vet ej.","analysisLog":"3. Vet ej"}
				]
		 ,
		 "animation":"fade",
		 "showNextButton":"-1",
		 "callback":"OUTRO"
	
	}
	
    ]
};


	return self;

})({});
