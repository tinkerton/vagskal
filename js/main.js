/*global $, jQuery, _, TweenMax, console, Case1a, Case1b, CaseVS_HUB,CaseSam_Mail,CaseSam_Internet,CaseSam_Video,CaseMaria_Mail,CaseMaria_Internet,CaseMaria_Video,CaseAdriana_Mail,CaseAdriana_Internet,CaseAdriana_Video,CaseMaria_Kollega,CaseSam_Kollega,CaseAdriana_Kollega,CaseMaria_71,CaseMaria_721, CaseSam_73,CaseSam_741,CaseAdriana_75,CaseAdriana_76,Modernizer*/

/***********************
project name: Vägskäl (Based on THE NETWORK-project by the same author)
author: Jonas Hörberg, Tinkerton AB

This is a technical platform that allows content to be stored in separate json-files, called CASE-files. This project can be used to just show information, but also complex
video_sequences connected to a set of questions, special animations, complex menu systems with locked areas, making it possible to create game like experiences.
Example of real use can be found here:
http://realstars.eu/fairsex-natverket/
Or even more specifically here:
http://realstars.eu/fairsex-natverket/thenetwork.html

Each project have a start CASE (hardcoded). The function startMain specify that (this can be altered by querystring params). In each CASE one ore more json objects in
a CASE file stores info on what the user will se on the screen. Each object is a complete window view. Only one object at a time is shown. When the user interacts with
the content (by answering a question, have seen a video, pressed the next button or choosed an option i a HUB (menuview)), the app goes to another object. Most often
the next object in the hierarcy but this can be overridden with the "callback"-parameter.

The system supports one or more json-files, and lots of different views. 

Each view is generated in the "main_div" div only, all other DOM-elements are fixed.
From the start html-file:
 <div class="row centered_box scrollable" id="main_div">
             <!-- IT IS HERE ALL THE CONTENT WILL BE GENERATED-->
 </div>


Example of views:


if "type":

"info"  = shows a header, a text, maybe an image, another text
"video" = shows one or more videos side by side
"video_seq" = show one video or a set of question, when a video is complete, go to another video or back to the questions, can be used to create
			  very complex games. If user shows answer A or B, show different videos. When video is complete, show another set of questions B or C and so on. 
			  Remember to keep it simple or be structured or you will get lost ;-)
"question" = Shows a question-text and 2 or more answers. Lets the user select only one answer. When user have answered goto next node (or node specified in "callback")
"agent" = shows a text that types one character after another like an old typewriter
"hub" = a special menu view with one or more options on an image. Each option could lead to another node or a new CASE-file. By using the "lockedUntil"-parameter, you can
		block a user to go to specific option until x other options have been visited before.
"piechart" = show a piechart with text labels, each pie chart is clickable and the answer saved to a DB. Can be modified to allow navigation to other nodes/CASES when
			 clicked upon
"abc_question" = A user selects on of three questions, when done, save answer to DB, but also generates a resultpage showing how many answers of A, B or C alternatives
				 other users have answered (in percentage).
"mark_question" = shows a questions and x answers. This differs from "question" because you can allow more than one answers. For example, user must select 3 options in a list
"int_question" = shows a text and a inputfield that the user must enter a number in. Stored to DB (for instance, "how old are you?" answer: 30)
"freetext_question" = shows a text and a textfield where the user can enter text. Stored in DB
"checklist" = shows a resultpage with local storage variables. Used in the end of some projects to give the user some kind of reciept
"tradequestion"= Shows a number of images that is clickable. The user must select one image (called tradequestion instead of imagequestion because the first time
				 we used this was when asking what trade a user was working in...)
"comic" = shows one image on top of each other, as a comic book, handles scrolls, clicking on an image to go back and forth in the comic page
					result += addNodeComic(nodeId);
"comicparallel" = same as comic but supports more than one image, side by side.
				

Example of use of a video sequence CASE:
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

More examples and implementation can be found by examining the actual CASE-files. The main CASE-file is Case1a.js



Typical flow of the application:

1. startMain (read content from Case1a.js)
2. startCase 
3. gotoNode (first node/object from Case1a.js)
4. onCompleteFadeoutNode (always reset/fade out the old content in main_div)
5. startNode (fade in new node, trigger one of many startFunctions based on type,  example: startVideoListener, startMarkedQuestion, checkToUnlockChapters (if HUB), start animations

6. Pause and wait for user interaction. 
 
		3. gotoNode
		4. onCompleteFadeoutNode
		5. startNode

		6. Pause and wait for user interaction.
		[...]

			2. startCase [...]

until a node has the "callback":"OUTRO", which exits the app and takes the user to a new URL (end screen).





Supports local storage
The application will continue where the user were the next time it comes back to this page, we use local storage for this, can be resetted

Supports DB storage via Ajax
Please search ".php" to understand how to store data to the dabase. Also see the php-files in the php-folder.
************************/



var FS = (function(self){
	"use strict";
	

	var activeCase,
		caseNodeId,
		currentNodeType,
		currentSequence,
		currentNodeNr,
		maxNodeNr,
		contentObj,
		initComplete,
		oldBackground,
		nrOfVideos,
		video_player,
		nextArrowTimeout,
		animateTextTimeout,
		DEBUG,
		GAMEMODE,
		globalAnimation,
		unlockedChapters,
		storeCase,
		ABCArray=["A","B","C"],
		localHostTrue,
		interceptPrevButton = false,
		numberOfMarkedAnswers,
		markedAnswers =[];




	
	//*GENERAL METHODS FOR NODE TEMPLATES,  Called by function self.addContent---------------------------------------------------------------------------------
			function addNodeHeader (nodeId) {
				var cols = "ten";
				if (contentObj[nodeId].size!==undefined) {
					cols = contentObj[nodeId].size;
				}
				return "<div class='centered " + cols + " columns' id='nodeHeader'>";
			}


			function addNodeFooter () {
				return "</div>";
			}


			function addNodeTitle (nodeId) {
				var titleArr, 
					res;
				
				if (contentObj[nodeId].title === undefined) {
					return "";
				}
				
				titleArr = contentObj[nodeId].title.split("<br/>");
				res ="<div class='titleDiv'>";
				
				for (var i=0; i<_.size(titleArr); i++) {
					if (i>0) res+="<br/>";
				 res += "<span class='text-black-bg title'>"+titleArr[i]+"</span>"; 
				}
				res +="</div>";
				return res;
			}


			function setnewBG(url) {
				$(".backstretch").remove();
				$.backstretch("img/"+url);
			}

			function setupBackground(nodeId) {
				//change background only if next node have a different background					
				if (contentObj[nodeId].background == undefined || contentObj[nodeId].background.url==oldBackground) return;
				oldBackground = contentObj[nodeId].background.url;
				
				if(FS.initComplete){
					TweenMax.to($(".backstretch"),0, {autoAlpha:1,delay:1});
					TweenMax.to($(".backstretch"),1, {autoAlpha:0, onComplete:setnewBG, onCompleteParams:[oldBackground]});
				}
				else {
					$.backstretch("img/"+oldBackground);


				}
			}

	//*END OF: GENERAL METHODS FOR NODE TEMPLATES------------------------------------------------------------------------












	// GENERAL TEMPLATE METHODS ----------------------------------------------------------------------------------------------------------------------

	function addNodeImages(nodeId,imageClass) {
		var images,
			nrOfImages,
			res;
			images = contentObj[nodeId].image; 
			if (images === undefined) { return "";}

			if (imageClass ==undefined) imageClass ="node-image";
			nrOfImages=  _.size(images);

			res="";
			for (var i=0; i<nrOfImages; i++) {
				res+="<div class='"+imageClass+"'><img class='imgOfNode' src='img/"+images[i].url+"'/></div>"
			}
			return res;
	}


	function addNodeQuestion(nodeId) {
		var res="",
			myObj=contentObj[nodeId];
			
		

			res +="<div class='centered eleven columns'>";
			
			res +="<article class='questionDiv'>";
			res +="<div class='questionHeadline'>"+myObj.question +"</div>";
			for (var i =0; i<_.size(myObj.answers); i++) {
			res +="<div class='sequenceAnswer' onClick=FS.saveAnswer("+i+")>"+ myObj.answers[i].text +"</div>";
				
			}
			res +="</article></div>";

			return res;

	}

	
	function addNodePreText (nodeId) {
		var res,
		myObj = contentObj[nodeId];
		if (myObj.pretext == undefined) return "";

		res = "<div class='pretext";
		
		if (myObj.justify!=undefined)  {
				res +=" " + myObj.justify;
		}
		res +="'>" + myObj.pretext + "</div>";

		
		return res;
		
	}

	function addNodePostText (nodeId) {
		var posttext = contentObj[nodeId].posttext;
		if (posttext == undefined) return "";
		return "<p>"+ contentObj[nodeId].posttext+"</p>";
		
	}


	function addHubMenu(nodeId) {
		var res ="", 
			nrOfChapters,
			myObj,
		 	wHeight,

			wHeight =720, //$(window).height()*0.7;
			hubImage = contentObj[nodeId].hubimage,

			nrOfChaptersPerPerson = 4,

			sam=false,
			maria=false,
			adriana=false,
			chapterItemClass = "chapterItem";


			if (contentObj[nodeId].subtype=="hub2") {
				//project specific query
				nrOfChaptersPerPerson = 2;
				if ($.totalStorage("staff1")=="Sam" || $.totalStorage("staff2")=="Sam") sam=true;
				if ($.totalStorage("staff1")=="Maria" || $.totalStorage("staff2")=="Maria") maria=true;
				if ($.totalStorage("staff1")=="Adriana" || $.totalStorage("staff2")=="Adriana") adriana=true;

				if(sam && maria) hubImage +="ms.png";
				if(sam && adriana) hubImage +="sa.png";
				if(adriana && maria) hubImage +="ma.png";

				chapterItemClass ="chapterItem hub2Item";

			}


			//DESKTOP
			//res ="<div class='hubtitle desktop'>"+contentObj[nodeId].title+"</div>";
			res += "<div class='chapterWrapper desktop' style='height:"+wHeight+"px; width:960px; background: url(../img/"+hubImage+");  background-repeat: no-repeat; background-size:100%;'>";

			myObj = contentObj[nodeId].chapters;
			nrOfChapters = _.size(myObj);

			for (var i=0; i<nrOfChapters; i++) {
				if(myObj[i].owner=="sam" && !sam) continue;
				if(myObj[i].owner=="maria" && !maria) continue;
				if(myObj[i].owner=="adriana" && !adriana) continue; 

				res +="<div id='chapter_"+myObj[i].ID+"' class='"+chapterItemClass;
				//if(myObj[i].lockeduntil!=undefined) {
				//		res +=" locked";
				//		}
				res +="' style='left:"+myObj[i].left+"; top:"+myObj[i].top+";'  onClick=FS.respondToHUB("+i+")></div>";
			
			}

			res+="</div>";

			//MOBILE
			//res +="<div class='hubtitle mobile'>"+contentObj[nodeId].title+"</div>";
			res += "<div class='chapterWrapper mobile cw"+nrOfChaptersPerPerson+"' style='background: url(../img/mobile_"+hubImage+");  background-repeat: no-repeat; background-size:100%;'>";

			myObj = contentObj[nodeId].chapters;
			nrOfChapters = _.size(myObj);

			var addClass="";
			for (var j=0; j<nrOfChapters; j++) {
				addClass="";
				if(myObj[j].owner=="maria" && !maria) addClass="hiddenItem"; 
				if(myObj[j].owner=="sam" && !sam) addClass="hiddenItem"; 
				if(myObj[j].owner=="adriana" && !adriana) addClass="hiddenItem";
				if(j%nrOfChaptersPerPerson==0) {
					if (j>0) {
						res +="</div>";}
					res +="<div class='chapterRow"+((j/nrOfChaptersPerPerson)+1)+" cr"+nrOfChaptersPerPerson+"'>";
				}
				res +="<div id='chapter_"+myObj[j].ID+"' class='chapterItem mobileitem"+j +" itemSize"+nrOfChaptersPerPerson +" " + addClass;
				/*if(myObj[j].lockeduntil!=undefined) {
					res +=" locked";
				}*/
				res +="' onClick=FS.respondToHUB("+j+")></div>";
				
			}
			res+="</div></div>";
			//res+="<div id='mobileNextButton'>GÅ VIDARE ></div>";







		return res;
	}



	function addNodeAgent(nodeId) {
		var res="";
			if (contentObj[nodeId].image != undefined) {
				res +="<ul class='two_up tiles agentul'><li>"+addNodeImages(nodeId,"agentImage")+"</li><li><div id='agent'>";
				res +="<p>"+contentObj[nodeId].text + "</p></div></li></ul>";
			}else { 
				res +="<div class='twelve columns row agentul' id='agent'>";
				res +="<p>"+contentObj[nodeId].text + "</p></div>";
			}
			
			return res;


	}

	function animateText(elements, callback) {  //USED BY AGENT NODE TEMPLATE ONLY
			/* get: array with hidden elements to be displayes, callback function */
   		 var i = 0;

    	(function iterate() {
       		 if (i < elements.length) {
         	    elements[i].style.display = "block"; // show
       	     	animateNode(elements[i], iterate); 
           		i++;
        	 } else if (callback != undefined)
            	callback();
    	})();    
    
    function animateNode(element, callback) { //USED BY AGENT NODE TEMPLATE ONLY
        	var pieces = [];
        	if (element.nodeType==1) {
            	while (element.hasChildNodes())
                	pieces.push(element.removeChild(element.firstChild));
           			animateTextTimeout = setTimeout(function childStep() {
                	if (pieces.length) {
                    	animateNode(pieces[0], childStep); 
                    	element.appendChild(pieces.shift());
                	} else if (callback != undefined)
                    	callback();
            		}, 2000/60);
        	} else if (element.nodeType==3) {
            	pieces = element.data.match(/.{0,2}/g); // 2: Number of chars per frame
            	element.data = "";
            	(function addText(){
                	element.data += pieces.shift();
                	animateTextTimeout = setTimeout(pieces.length
                    ? addText
                    : callback,
                  	2000/60);
            	})();
        	}
    	}
	}




	self.addContent = function(nodeId) {  //When a new NODE is presented this function checks the "type" from the json-file and creates page using different templates

			FS.currentNodeType = contentObj[nodeId].type;

			var result = addNodeHeader(nodeId) + addNodeTitle(nodeId);
			
			switch (FS.currentNodeType) { //checks the type
				case "info":
					result  += addNodePreText(nodeId) + addNodeImages(nodeId) + addNodeVideos(nodeId) +  addNodePostText(nodeId);
			   
				break;
				case "video":
					result +=addNodeVideos(nodeId);
				break;
				case "video_seq":
					result  += addNodeVideoSequence(nodeId);
			   
				break;
				case "chapter":
					//add no more
			   
				break;
				case "question":
					result  +=  addNodeQuestion(nodeId);
			   
				break;
				case "agent":
					result += addNodeAgent(nodeId);
			   
				break;
				case "hub":

					result = addHubMenu(nodeId);
				break;
				case "piechart":
					result += addPieChart(nodeId);
				break;
				case "abc_question":
					result += addNodeABCQuestion(nodeId);
				break;
				case "mark_question": 
					result  +=  addNodeMarkQuestion(nodeId);
				break;
				case "int_question": 
					result  +=  addNodeIntQuestion(nodeId);
				break;
				case "freetext_question": 
					result  +=  addNodeFreetextQuestion(nodeId);
				break;
				case "checklist": 
					result  +=  addNodeChecklist(nodeId);
				break;
				case "tradequestion": 
					result = addNodeTradeQuestion(nodeId);
				break;

				
				/*THENETWORK-project SPECIFIC NODES? REMOVE?
					case "comic":
					result += addNodeComic(nodeId);
			   
				break;
				case "comicparallel":
					result += addNodeComicParallel(nodeId);
				break;
				case "comicsingle":
					result += addNodeComicSingle(nodeId);
				break;
			
				case "walloftext":
					result += addNodeWalloftext(nodeId);
			   

				break;
				*/

			}
				result += addNodeFooter();
		 		return result;
		};



// END OF: GENERAL TEMPALTE METHODS ----------------------------------------------------------------------------------------------------------------------
















	//VIDEO TEMPLATES, used by type "video_seq" ---------------------------------------------------------------------------------------------------
	//Using the Vimeo API to check when a video is complete in order to show the next sequence in the video-sequence. Could be a new video or more common a set of 
	//questions that leads to new videos or exits the sequence. See example in CaseMaria_Video.js			

			function addNodeVideoSequence(nodeId) {
				var res ="",
					seq_type,
					myObj;
					
					
					myObj=contentObj[nodeId].sequences[FS.currentSequence];
					seq_type=myObj.type;
					if (FS.currentSequence == 0) {res ="<div class='row' id='seqWrapper'>"}

					switch (seq_type) {
						case "video":
							res +="<div class='centered eleven columns'><div class='loading' id='loader_0'><div class='track'></div><div class='spinner'><div class='mask'><div class='maskedCircle'></div></div></div></div>";
							res +="<article class='vimeo video videoBg'>";
							res +="<iframe id='iframe_"+myObj.sequenceID+"' style='visibility:hidden;' onload='FS.showIframe("+myObj.sequenceID+")' ";
							res += "src='" + myObj.url + "?title=0&byline=0&portrait=0&autoplay=1&api=1&player_id=iframe_"+myObj.sequenceID+"' width='500' height='281' frameboder='0' webkitallowfullscreen='' mozallowfullscreen='' allowfullscreen=''>";
							res +="</iframe></article></div>";

						break;
						case "question":
							res +="<div class='centered eleven columns'>";
							res +="<article class=''>";
							res +="<div class='sequenceHeadline'>"+myObj.text +"</div>";
							for (var i=0; i<_.size(myObj.answers); i++) {
								res +="<div class='sequenceAnswer videoQuestion' onClick='FS.gotoSequence("+myObj.answers[i].gotoID+")'>"+ myObj.answers[i].text +"</div>";
							//if(myObj.answers[1]!=undefined) res +="<div class='sequenceAnswer videoQuestion' onClick='FS.gotoSequence("+myObj.answers[1].gotoID+")'>"+ myObj.answers[1].text +"</div>";
							}

							res +="</article></div>";
						
						break;
						case "text":
							res +="<div class='centered eleven columns'>";
							res +="<article class=''>";
							if  (myObj.header!=undefined) res +="<div class='sequenceHeadline'>"+myObj.header +"</div>";
							if  (myObj.content!=undefined) res +="<div class='sequenceText'>"+ myObj.content +"</div>";
							res +="</article></div>";
						
							
						break;
						


					}
					if (FS.currentSequence == 0) res+="</div>"
				
				return res;
			}


			

			function addNodeVideos (nodeId) {

				var videos,
					nrOfCols,
					res, 
					autoplay;
				
				videos = contentObj[nodeId].videos; 
				if (videos === undefined) {return "";}

				autoplay=1;


				FS.nrOfVideos = _.size(videos);
				if (FS.nrOfVideos>1) autoplay=0;

				nrOfCols="twelve";
				
				switch (FS.nrOfVideos) {
					case 1:
						nrOfCols = "twelve";
					break;
					case 2:
						nrOfCols = "six";
					break;
					case 3:
						nrOfCols = "four";
					break;
					case 4:
						nrOfCols = "three";
					break;

				}

				res ="<div class='row'>";

				for (var i=0; i<FS.nrOfVideos; i++) {
					if(FS.nrOfVideos<=1) res +="<div class='centered "+nrOfCols+" columns'>";
					else res +="<div class='"+nrOfCols+" columns'>";
					res +="<div class='loading' id='loader_"+i+"'><div class='track'></div><div class='spinner'><div class='mask'><div class='maskedCircle'></div></div></div></div>";
					
					if ( videos[i].source  == "youtube") { //No need since we only use VIMEO now
						res +="<article class='youtube video videoBg'>";
						res +="<iframe width='560' height='315' src='"+ videos[i].videoURL + "?showinfo=0' frameborder='0' allowfullscreen></iframe>";
						res +="</iframe>";
						FS.nrOfVideos = 0;

					}
					else {
						//KEEP ONLY THIS, SHOW ONLY ONE VIDEO AT A TIME ANYWAY
						res +="<article class='vimeo video videoBg'>";
						res +="<iframe id='iframe_"+i+"'' style='visibility:hidden;' onload='FS.showIframe("+i+")' ";
						res += "src='" + videos[i].videoURL + "?title=0&byline=0&portrait=0&autoplay="+autoplay+"&api=1&player_id=iframe_"+i+"' width='500' height='281' frameboder='0' webkitallowfullscreen='' mozallowfullscreen='' allowfullscreen=''>";
						res +="</iframe>";

					}
					res +="</article></div>";
				}
				res+"</div>";


				return res;
			}
			
			

			

			function removeLoader(iframeId) { 
				$('#loader_'+iframeId).remove();
			}
			
			

			

			self.showIframe = function(iframeId) { 
				TweenMax.to($('#iframe_'+iframeId),0.75, {autoAlpha:1, onComplete:removeLoader, onCompleteParams:[iframeId]});
			}



			self.video_onSingleVideoFinish =function(id) {
					var iframe = $('#iframe_0');
		   			if(iframe==undefined) return;
					FS.video_player = $f(iframe);
		    	
		   			FS.video_player.removeEvent('ready');
					FS.video_player.removeEvent('finish');
				
					FS.gotoNode(FS.currentNodeNr,1);
				
			}



			self.video_onFinish = function(id) { //When Vimeo API sends event Finish, check the json object and either exit through "callbackNode" or go to next sequence
				  	 removeVideoListener();
				  	 FS.currentSequence =  contentObj[FS.currentNodeNr].sequences[FS.currentSequence].gotoID;
				   	 if ( FS.currentSequence!=undefined)  TweenMax.to($("#seqWrapper"), 0.5, {alpha:0, onComplete:FS.populateSequence})
				  	 else {
				  	 	if (contentObj[FS.currentNodeNr].callback!=undefined) {
				  	 		var nodeToGo = -1;
				  	 		if (contentObj[FS.currentNodeNr].callbackNode !=undefined) nodeToGo=contentObj[FS.currentNodeNr].callbackNode;
				  	 		exitChapter(contentObj[FS.currentNodeNr].callback,nodeToGo);

				  	 	}else {
				  	 		FS.gotoNode(FS.currentNodeNr,1);
				  	 	}
				  	 }
			}



			function removeVideoListener() {
		   		var iframe = $('#iframe_'+FS.currentSequence)[0];
		   		if(iframe==undefined) return;
		   		
		   		FS.video_player = $f(iframe);
		    	
		    	// When the player is ready, add listeners for pause, finish, and playProgress
				FS.video_player.removeEvent('ready');
				FS.video_player.removeEvent('finish');
				$('button').unbind();		
			}


			self.startSingleVideoListener = function () {
				var iframe = $('#iframe_0');
				FS.video_player = $f(iframe);
		    		
				FS.video_player.addEvent('ready', function() {
		    		    FS.video_player.addEvent('finish',  FS.video_onSingleVideoFinish);
				});
			}



			self.startVideoListener = function() {
		   		var iframe = $('#iframe_'+FS.currentSequence)[0];
		   		
		   		if(iframe==undefined) return;
		   		FS.video_player = $f(iframe);
		    	
		   		// When the player is ready, add listeners for pause, finish, and playProgress
				FS.video_player.addEvent('ready', function() {
		 	    	FS.video_player.addEvent('finish',  FS.video_onFinish);
		 		});
		 
				// Call the API when a button is pressed
				$('button').bind('click', function() {
				    FS.video_player.api($(this).text().toLowerCase());
				});
			
			}


			self.populateSequence = function() {
				$("#seqWrapper").html(addNodeVideoSequence(FS.currentNodeNr));
				 TweenMax.to($("#seqWrapper"), 0.5, {alpha:1, onComplete:FS.startVideoListener})
			}

			

			self.gotoSequence = function(sequenceID) {
				 if (sequenceID == "-1") {
				 	 //console.log("END of video");
				 	FS.gotoNode(FS.currentNodeNr,1); 
				 return; 
				}
				 FS.currentSequence =  sequenceID;
				 TweenMax.to($("#seqWrapper"), 0.5, {alpha:0, onComplete:FS.populateSequence})
			
			}

	//*END OF: VIDEO TEMPLATE -----------------------------------------------------------------------------------------------------------------





















//ABC Question METHODS -----------------------------------------------------------------------------------------------------------------------------------
//Sends ajax request to PHP-page and gets a json-object back from DB, show percentage for each answers of type A, B, C and total number of answers in DB for given question

function addNodeABCQuestion(nodeId) {

	var res="",
			myObj=contentObj[nodeId];
			
		

			res +="<div class='centered eleven columns'>";
			
			res +="<article class='ABCquestionDiv'>";
			res +="<div class='titleDiv ABCquestionHeadline'>"+myObj.question +"</div>";
			for (var i =0; i<_.size(myObj.answers); i++) {
				
			
			res +="<div class='ABCsequenceAnswer' onClick='FS.selectABCAnswerAndContinue("+myObj.ABC_ID+","+i+","+nodeId+")'><div class='ABCHolder'>"+ABCArray[i]+"</div><div class='ABCQuestion'>"+ myObj.answers[i].text +"</div></div>";
				
			}
			res +="</article></div>";

			return res;

}

 self.selectABCAnswerAndContinue =function(ABC_ID, optionSelected,nodeId,abc_string) {
		$.totalStorage('answer'+ABC_ID,optionSelected);  //e.g answer1 = 0  use ABCArray[optionSelected] to get A,B or C
		$.totalStorage('answer'+ABC_ID+"_text",contentObj[nodeId].answers[optionSelected].text);

		 phpCallSaveABCAnswer(ABC_ID,optionSelected,nodeId);
		 //phpCallSaveABCAnswer will execute: maindiv.html(FS.addABCResult(ABC_ID, optionSelected,nodeId,result));
		


		//FS.gotoNode(FS.currentNodeNr,1);
	}



self.addABCResult = function(ABC_ID, optionSelected,nodeId,result) {
	var res,A,B,C,total,percentA, percentB, percentC, resultText,myObj, resObj,
	widthA, widthB, widthC;
		
	if(localHostTrue) { //ONLY WHEN IN LOCALHOST
		result = result[0];
	}
	else {
		resObj = $.parseJSON(result);
		result = resObj[0];
	}

		
		

		A = parseInt(result.A);
		B = parseInt(result.B);
		C = parseInt(result.C);
		total = parseInt(result.total);
		
		percentA = Math.round(A / total * 100);
		percentB = Math.round(B / total * 100);
		percentC = Math.round(C / total * 100);

			
		if (percentA <= 8) widthA = 8; else widthA=percentA;
		if (percentB <= 8) widthB = 8; else widthB=percentB;
		if (percentC <= 8) widthC = 8; else widthC=percentC;

		if (percentA>(widthB+widthC)) widthA =100-widthB-widthC; 
		if  (percentB>(widthA+widthC)) widthB =100-widthA-widthC; 
		if  (percentC>(widthA+widthB)) widthC =100-widthA-widthB;


		resultText ="";
		

		switch (ABCArray[optionSelected]) {

			case "A":
				 resultText = A + " personer ("+percentA;
			break;
			case "B":
				 resultText = B + " personer ("+percentB;
			break;
			case "C":
				 resultText = C + " personer ("+percentC;
			break;
		}
		resultText +="%) tycker samma sak som dig.";


		res="",
		myObj=contentObj[nodeId];
		res +="<div class='centered eleven columns'>";	
			res +="<article class='nohover ABCquestionDiv'>";
				res +="<div class='ABCsequenceAnswer nohover'><div class='ABCHolder'>"+ABCArray[optionSelected]+"</div><div class='ABCQuestion'>"+ myObj.answers[optionSelected].text +"</div></div>";
				res +="<div class='ABCresultText'>" + resultText + "</div>";
				res +="<div class='ABCresultCompareHolder'>";
					res +="<div class='ABCresultCompareItem ABC_item1";
						if (ABCArray[optionSelected] == "A") res +=" ABC_selected";
					res+="' style='width:"+(widthA-1)+"%'><div class='ABCresultCompareHeader'>A</div><div class='ABCresultComparePercent'>"+percentA+"%</div></div>";
					res +="<div class='ABCresultCompareItem  ABC_item2";
						if (ABCArray[optionSelected] == "B") res +=" ABC_selected";
						res+="' style='width:"+(widthB-1)+"%'><div class='ABCresultCompareHeader'>B</div><div class='ABCresultComparePercent'>"+percentB+"%</div></div>";
				
					res +="<div class='ABCresultCompareItem ABC_item3";
						if (ABCArray[optionSelected] == "C") res +=" ABC_selected";
						res+="' style='width:"+(widthC-1)+"%'><div class='ABCresultCompareHeader'>C</div><div class='ABCresultComparePercent'>"+percentC+"%</div></div>";
				
				res +="</div>"; 
			res +="</article>";
		res +="</div>"

	interceptPrevButton=true;
	showNext();
	return res;
}

//END OF ABC Question METHODS -----------------------------------------------------------------------------------------------------------------------------------

















//PIE CHART METHODS---------------------------------------------------------------------------------------------------------------------------------------
//Obsolete, removed from the new specification. This method uses jquery.flot.pie to present a clickable pie chart.
function showPieChart() {

var pienumber = Math.random();

		var piedata = [ //should get data from external json-file.
			{ label: "Kreativitet",  data: pienumber},
			{ label: "Fysiskt arbete",  data: pienumber},
			{ label: "Undervisning",  data: pienumber},
			{ label: "Vård",  data: pienumber},
			{ label: "Service",  data: pienumber},
			{ label: "Ledarskap",  data: pienumber}
		];

	

		
		
		var placeholder =  $("#pieplaceholder");

		$.plot(placeholder, piedata, {
				series: {
					pie: { 
					 	innerRadius: 0.1,
						show: true,
						label: {
			                show: true,
			                radius: 0.5,
			                formatter: pieLabelFormatter,
			                threshold: 0.1
			            }
					}
				},
				legend: {
        			show: false
    			},
				grid: {
					hoverable: true,
					clickable: true
				}
			});




		
			placeholder.bind("plothover", function(event, pos, obj) {

				if (!obj) {
					return;
				}

				$("#hover").html("<span style='font-weight:bold; color:" + obj.series.color + "'>" + obj.series.label +"</span>");
			});

			placeholder.bind("plotclick", function(event, pos, obj) {

				if (!obj) {
					return;
				}

				//TODO:
				//insert a modal here, showing text for different options. Add cancel and OK button.
				//reference: http://gumbyframework.com/docs/components/#!/modals
				//When OK is clicked let this function be called:
				selectPieChartAndContinue(obj.series.label);

			});


	}
	
	function pieLabelFormatter(label, series) {
		return "<div class='pieLabel'>" + label +"</div>";
	}


	function selectPieChartAndContinue(optionSelected) {
		
		
		$.totalStorage('pieOption',optionSelected);
		phpCallSavePieOption(optionSelected);


		FS.gotoNode(FS.currentNodeNr,1);
	}





	


	function addPieChart(nodeId) {
		var res="";
			var wWidth =$(window).width();
			
		
			if (wWidth<768) {
				res +="<div id='pieplaceholder' style='height:"+wWidth+"px; width:"+wWidth+"px;'></div>";
			
			}
			else  {
				res +="<div id='pieplaceholder'></div>";
			}
			
			
			return res;

	}

//END OF PIE CHART METHODS---------------------------------------------------------------------------------------------------------------------------------------








//TRADE QUESTION ----------------------------------------------------------------------------------------
//project specific, lets the user select what trade the want to work in
function addNodeTradeQuestion(nodeId) {
			var res="",
			myObj=contentObj[nodeId];
			
	
			//FOR DESKTOP - need to layout icons one way - hidden in mobile
			res +="<div class='centered eleven columns tradeHolderDesktop'>";
			res +="<div class='tradeQuestionText'>"+myObj.pretext +"</div>";	
			res +="<div class='tradeQuestionDiv1'>";
			for (var i =0; i<_.size(myObj.trades)/2; i++) {
				res +="<div class='tradeQuestionIcon' id='trade"+i+"' answerid='"+myObj.trades[i].answer_id+"' t='"+myObj.trades[i].trade+"'><img src='../img/"+myObj.trades[i].image +"'></div>";
			}
			res +="</div>";



			res +="<div class='tradeQuestionDiv2'>";
			for (var j =_.size(myObj.trades)/2; j<_.size(myObj.trades); j++) {
			res +="<div class='tradeQuestionIcon' id='trade"+j+"' answerid='"+myObj.trades[j].answer_id+"' t='"+myObj.trades[j].trade+"'><img src='../img/"+myObj.trades[j].image +"'></div>";
			}
			res +="</div></div>";
			


			//FOR MOBILE - need to layout icons differently - hidden in desktop
					res +="<div class='centered eleven columns tradeHolderMobile'>";
					res +="<div class='tradeQuestionTextMobile'>"+myObj.pretext +"</div>";	
					res +="<div class='tradeQuestionDivMobile'>";
					for (var i =0; i<_.size(myObj.trades); i++) {
						res +="<div class='tradeQuestionIcon' id='tradem"+i+"' answerid='"+myObj.trades[i].answer_id+"' t='"+myObj.trades[i].trade+"'><img src='../img/"+myObj.trades[i].image +"'></div>";
					}
					res +="</div></div>";

			
			return res;

}

function startNodeTradeQuestion() {
	var myObj=contentObj[FS.currentNodeNr];
	for (var i=0; i<_.size(myObj.trades); i++) {  

			//Add click handler for each object
			//DESKTOP
			$('#trade'+i).click(function() {
   			  var answerid_id = $(this).attr('answerid');
   			 	 exitTradeQuestion(myObj.question_id, answerid_id);
     			 
				}   			
   			  
 			);
 			//MOBILE
 			$('#tradem'+i).click(function() {
   			  var answerid_id = $(this).attr('answerid');
   			 	 exitTradeQuestion(myObj.question_id, answerid_id);
     			 
				}   			
   			  
 			);
		}

}


function exitTradeQuestion(question_id, answer_id) {

		$.totalStorage("tradeQuestion",answer_id);
		phpCallSaveAnswer(question_id,answer_id);
}


//--------------------------------------------------------------------------------------------------------








//FREETEXT QUESTION ---------------------------------------------------------------------------------------
//shows textfield and saves input to DB via ajax

function addNodeFreetextQuestion(nodeId) {

	var res="",
	myObj=contentObj[nodeId];

	res +="<div class='centered eleven columns'>";
			
	res +="<article class='markedQuestionDiv'>";
			res +="<div class='questionHeadline'>"+myObj.question +"</div>";
			res +="<div class='markedPreText'>"+myObj.pretext +"</div>";
			

			res +="<div><textarea rows='10' cols='84' id='freetextAnswer'></textarea></div>";


			for (var i =0; i<_.size(myObj.answers); i++) {
				res +="<div class='sequenceAnswer markedQuestionAnswer freetextAnswer' id='markedAnswer"+i+"' n='"+i+"' answerid='"+myObj.answers[i].answer_id+"' t='"+myObj.answers[i].text+"'>"+ myObj.answers[i].text;
				res +="</div>";
			}
		
					
		res +="</article>";
		res +="<div id='errortext'>Du måste skriva något eller välja Avsluta</div>";
		res+"</div>";
return res;
	
}


function startFreetextQuestion() {
		var myObj=contentObj[FS.currentNodeNr];
		$("#errortext").hide();
		$('#markedAnswer0').click(function() {
   				
				var term = $("#freetextAnswer").val();
				
   				
	   			if (term) {
	   				$("#errortext").hide();
	   				exitFreetextQuestion(myObj.question_id, term);
	   				}
     			else {
     				$("#errortext").show();
     			}
				   			
   			  
 			});

			$('#markedAnswer1').click(function() {
   				FS.gotoNode(FS.currentNodeNr,1);
					
   			  
 			});
		

	}


function exitFreetextQuestion(question_id, term) {

		$.totalStorage("freetext",term);			
		phpCallSaveFreetext(question_id,term);	
	
}




// END OF FREETEXT QUESTION ----------------------------------------------------------------------------------




// INT QUESTION --------------------------------------------------------------------------------------------
//let user answer on the age question, saves to DB via ajax
function addNodeIntQuestion(nodeId) {
	var res="",
	myObj=contentObj[nodeId];
	

	res +="<div class='centered eleven columns'>";
			
	res +="<article class='markedQuestionDiv fakecenter'>";
			res +="<div class='questionHeadline'>"+myObj.question +"</div>";
			res +="<div class='markedPreText'>"+myObj.pretext +"</div>";
			

			res +="<div class='left'><input type='number' class='intField' name='intAnswer'  id='intAnswer' min='1' max='99'></div>";
			res +="<div class='sequenceAnswer markedQuestionAnswer left' id='markedAnswer0' n='0' answerid='"+myObj.answers[0].answer_id+"' t='"+myObj.answers[0].text+"'>"+ myObj.answers[0].text;
			res +="</div>";
		
					
	res +="</article>";
		res +="<div id='errortext'>Du måste ange en ålder</div>";
		res+"</div>";
return res;

}

function startIntQuestion() {
		var myObj=contentObj[FS.currentNodeNr];
		$("#errortext").hide();
		$('#markedAnswer0').click(function() {
   				
				var term = $("#intAnswer").val();
   				
	   			if (term) {
	   				$("#errortext").hide();
	   				exitIntQuestion(myObj.question_id, term);
	   				}
     			else {
     				$("#errortext").show();
     			}
				   			
   			  
 			});

		

	}



function exitIntQuestion(question_id, term) {

		$.totalStorage("age",term);			
		phpCallSaveAge(question_id,term);	
	
}

// END OF INT QUESTION --------------------------------------------------------------------------------------------













//MARK (3) QUESTION ------------------------------------------------------------------------------------
//Shows x answers to a question, user selects 1 or more answers (like a delux checkbox) based on "nrOfAnswers" in json object

	function addNodeMarkQuestion(nodeId) {
		var res="",
			myObj=contentObj[nodeId];
			
			var sam, maria, adriana = false;
			if (myObj.subtype =="mq3") {
					if ($.totalStorage("staff1")=="Sam" || $.totalStorage("staff2")=="Sam") sam=true;
					if ($.totalStorage("staff1")=="Maria" || $.totalStorage("staff2")=="Maria") maria=true;
					if ($.totalStorage("staff1")=="Adriana" || $.totalStorage("staff2")=="Adriana") adriana=true;
			}



			res +="<div class='centered eleven columns'>";
			
			res +="<article class='markedQuestionDiv'>";
			res +="<div class='questionHeadline'>"+myObj.question +"</div>";
			res +="<div class='markedPreText'>"+myObj.pretext +"</div>";
			for (var i =0; i<_.size(myObj.answers); i++) {
				if(myObj.subtype =="mq3") {
					if(i==0 && !sam) continue;
					if(i==1 && !maria) continue;
					if(i==2 && !adriana) continue;
				}
			res +="<div class='sequenceAnswer markedQuestionAnswer' id='markedAnswer"+i+"' n='"+i+"' answerid='"+myObj.answers[i].answer_id+"' t='"+myObj.answers[i].text+"'>"+ myObj.answers[i].text;
			res +="</div>";
				if (myObj.modal == "true") {
			 		res +="<div class='marked_modal_btn' onclick='FS.openmodal("+i+")'></div>";



				}
				
			}
			res +="</article></div>";
			

			if (myObj.modal =="true") {
				for (var i =0; i<_.size(myObj.answers); i++) {
					res +='<div class="modal vsmodal" id="markedmodal'+i+'"><div class="content"><a class="close switch" onclick="FS.closemodal('+i+')"><i class="icon-cancel" /></i></a>';
    				
    				res +='<h2 class="modalheader">'+myObj.answers[i].text+'</h3> <p class="modaltext">'+myObj.answers[i].modal+'</p>';
    				res +='<p class="btn info medium"><a href="#" class="switch" onclick="FS.closemodal('+i+')">OK</a>';
      				res +='</p></div></div>';

				}

			}

			numberOfMarkedAnswers = _.size(myObj.answers);

			return res;

	}


	self.openmodal = function(id) {
		$("#markedmodal"+id).addClass("active");
	}
	self.closemodal = function(id) {
		$("#markedmodal"+id).removeClass("active");
	}

	function startMarkedQuestion() {
		var myObj=contentObj[FS.currentNodeNr];
		markedAnswers = [];

		for (var i =0; i<numberOfMarkedAnswers; i++) {  

			//set selected when going back here
			/*if (_.has(markedAnswers,i)) {

				$('#markedAnswer'+markedAnswers[i]).addClass("markedSelected");
			}*/


			//Add click handler for each object
			$('#markedAnswer'+i).click(function() {
   			  var id = $(this).attr('n');
   			  var answer_id = $(this).attr('answerid'); 

   			  if ( $(this).hasClass("markedSelected")) {
   			  		$(this).removeClass('markedSelected');
   			  		removeItem(markedAnswers,answer_id);
   			  }
   			  else {
   			  	$(this).addClass('markedSelected');
	   			markedAnswers.push(answer_id);	
	   			
	   			if (_.size(markedAnswers) ==myObj.nrOfAnswers) exitMarkedQuestion(myObj.subtype, myObj.question_id);
     			  
				}   			
   			  
 			});

		}

	}

	function exitMarkedQuestion(subtypeQ, question_id) {
		_(markedAnswers).sortBy(function(obj) { return +obj.home })
   		
		switch(subtypeQ) {
			case "mq1":
			case "mq4":
			case "mq6":

				$.totalStorage("findstaff1",$('#markedAnswer'+markedAnswers[0]).attr("t"));
   				$.totalStorage("findstaff2",$('#markedAnswer'+markedAnswers[1]).attr("t"));
   				$.totalStorage("findstaff3",$('#markedAnswer'+markedAnswers[2]).attr("t"));
   				phpCallSaveMultipleAnswers(question_id,markedAnswers);

			break;
			
			case "mq2":
				
				var sam, maria, adriana = false;
				var answer_id =0;
				for (var i=0; i<=_.size(markedAnswers); i++) {
					switch(markedAnswers[i]) {
						case "Sam":
							sam = true;
						break;
						case "Maria":
							maria = true;
						break;
						case "Adriana":
							adriana = true;
						break;
					}
				}
				
				if (sam && maria) answer_id = 16;
				if (adriana && maria) answer_id = 17;
				if (sam && adriana) answer_id = 18;

				$.totalStorage("staff1",markedAnswers[0]);
   				$.totalStorage("staff2",markedAnswers[1]);
   				phpCallSaveAnswer(question_id,answer_id);

			break;

			case "mq3":
				var answer_id = markedAnswers[0];
				if (markedAnswers[0] == "both") {
					var sam, maria, adriana = false;
					if ($.totalStorage("staff1")=="Sam" || $.totalStorage("staff2")=="Sam") sam=true;
					if ($.totalStorage("staff1")=="Maria" || $.totalStorage("staff2")=="Maria") maria=true;
					if ($.totalStorage("staff1")=="Adriana" || $.totalStorage("staff2")=="Adriana") adriana=true;
					if (sam && maria) answer_id = 22;
					if (adriana && maria) answer_id = 24;
					if (sam && adriana) answer_id = 23;
				}
				
				$.totalStorage("keepwork",answer_id);
   				phpCallSaveAnswer(question_id,answer_id);

			break;


		}

   	
	}

	function removeItem(array, item){
    for(var i in array){
        if(array[i]==item){
            array.splice(i,1);
            break;
            }
    }
}

//END OF MARK (3) QUESTION -----------------------------------------------------------------








//CHECKLIST ------------------------------------------------------------------------------------
//OBSOLETE due to new specification. Shows all answers made in the app
function addNodeChecklist(nodeId) {

	var res="",
			myObj=contentObj[nodeId];
			
		

			res +="<div class='centered eleven columns'>";
			res +="<p>Du har valt:<br>";
			res +=$.totalStorage("pieOption") +"<br><br>";
			res +=$.totalStorage("markedQuestion1")+"<br>";
			res +=$.totalStorage("markedQuestion2")+"<br>";
			res +=$.totalStorage("markedQuestion3")+"<br>";
			res +="<br>Du valde dessa söksätt för att...<br>";
			
			res +=$.totalStorage("answer1_text")+"<br></p>";

			if(myObj.showButton == "true") {
 			res +="<div id='checkListBtn'>"+myObj.btnText+"</div>";
			}

			return res;

		}

		function startCheckList() {
  		$(document).on('click', '#checkListBtn', function() {
   		window.location=contentObj[FS.currentNodeNr].btnURL;

   		}	
    
   )};



//END OF CHECKLIST------------------------------------------------------------------------------





//PHP METHODS ----------------------------------------------------------------------------------------------------------------------------------------



function phpCallSavePieOption(optionSelected) {
	//OBSOLETE
	//TODO: Implement the PHP-script

/*	$.ajax({
        type: "GET",
        url: "php/savePieOption.php",
        data: {ID: $.totalStorage('ID'), option: optionSelected},
        });

*/
}


function phpCallSaveABCAnswer(ABC_ID, optionSelected,nodeId) {
	var maindiv = $('#main_div');

	if(localHostTrue) { //ONLY WHEN IN LOCALHOST
		var jsonResult = [{A:21,B:6,C:9,total:36}];
		maindiv.html(FS.addABCResult(ABC_ID, optionSelected,nodeId,jsonResult));
		return;
	}

	
	$.ajax({
        type: "GET",
      
        //url: "saveAndGetABCanswer.php",
        url: "php/saveAndGetABCanswer.php",
        datatype:'json',
        data: {ID: $.totalStorage('ID'), question:ABC_ID, answer: ABCArray[optionSelected]},
        success:function(data) {
        	maindiv.html(FS.addABCResult(ABC_ID, optionSelected,nodeId,data));
        }
        });

}



function phpCallSaveAnswer(question, answer) {

	if(localHostTrue) { //ONLY WHEN IN LOCALHOST
			FS.gotoNode(FS.currentNodeNr,1);
		return;
	}


	$.ajax({
        type: "GET",
        url: "php/saveAnswer.php",
         datatype:'json',
        data: {ID: $.totalStorage('ID'), question_id: question, answer_id:answer},
        success:function(data) {

        	FS.gotoNode(FS.currentNodeNr,1);
        }
        });

}

function phpCallSaveAge(question_id,term) {
		if(localHostTrue) { //ONLY WHEN IN LOCALHOST
			FS.gotoNode(FS.currentNodeNr,1);
		return;
	}


	$.ajax({
        type: "GET",
        url: "php/saveAge.php",
         datatype:'json',
        data: {ID: $.totalStorage('ID'), question_id: question_id, answer_int:term},
        success:function(data) {

        	FS.gotoNode(FS.currentNodeNr,1);
        }
        });


}


function phpCallSaveFreetext(question_id,term) {
		if(localHostTrue) { //ONLY WHEN IN LOCALHOST
			FS.gotoNode(FS.currentNodeNr,1);
		return;
	}


	$.ajax({
        type: "GET",
        url: "php/saveFreetext.php",
         datatype:'json',
        data: {ID: $.totalStorage('ID'), question_id: question_id, answer_text:term},
        success:function(data) {

        	FS.gotoNode(FS.currentNodeNr,1);
        }
        });


}


function phpCallSaveMultipleAnswers (question, answerArray) {
	if(localHostTrue) { //ONLY WHEN IN LOCALHOST
			FS.gotoNode(FS.currentNodeNr,1);
		return;
	}

	var nrOfSavedEntries =0;

	for (var i=0; i<_.size(answerArray); i++) {
		$.ajax({
        type: "GET",
        url: "php/saveAnswer.php",
         datatype:'json',
        data: {ID: $.totalStorage('ID'), question_id: question, answer_id:answerArray[i]},
          success:function(data) {
          	nrOfSavedEntries++;
          	
          	if (nrOfSavedEntries>=_.size(answerArray)) FS.gotoNode(FS.currentNodeNr,1);
        }
		});
	}
	


}


//END OF PHP METHODS -----------------------------------------------------------------------------------------------------------------------------------



//*HUB SPECIFIC METHODS----------------------------------------------------------------------------------------------------------------------------
	//The HUB is a in game menu, that can lock some of the options until a number of other options have been visited

	function unlockChapters(nr) {

		var chapterNamesArray = new Array(
			"Case1a"
		
		);

		FS.unlockedChapters = new Array();
		FS.unlockedChapters.length=0;


		for (var i=0; i<nr; i++) {
			FS.unlockedChapters.push(chapterNamesArray[i]);
		
		}

		$.totalStorage('unlockedChapters', FS.unlockedChapters);
	}


	function checkToUnlockChapters() {
		
		var myObj=contentObj[FS.currentNodeNr],
			nrOfUnlocks = _.size(FS.unlockedChapters);
		
		//FS.unlockedChapters.length = 0;
		//FS.unlockedChapters = [];


		for (var i=0; i<_.size(myObj.chapters); i++) {
				if (myObj.chapters[i].lockeduntil<=nrOfUnlocks) {
					$("#chapter_"+myObj.chapters[i].ID).removeClass("locked");
					
				}
			
					if (_.contains(FS.unlockedChapters, myObj.chapters[i].callback)) {
						$("#chapter_"+i).addClass("visitedChapter");
						
					}
			
		}
			
	}

	self.respondToHUB = function (chapter) {	
		if(globalAnimation==1) return;
	

		var myObj=contentObj[FS.currentNodeNr];
		//console.log("goto chapter " + chapter + " : " + myObj.chapters[chapter].lockeduntil + " | " +  _.size(FS.unlockedChapters));
		if (myObj.chapters[chapter].lockeduntil > _.size(FS.unlockedChapters)) {
				// //console.log("return");
				return;
		}
		globalAnimation=1;
		//console.log("respondToHUB: "+ myObj.analysisLog + " - "  +myObj.chapters[chapter].analysisLog);
		
		if(myObj.chapters[chapter].callback!=undefined) {
		//	console.log( myObj.chapters[chapter].callback);
			var myCallback = myObj.chapters[chapter].callback;
			
			if (myCallback == "Case1_outro" && parseInt(GAMEMODE)==1) myCallback = "Case1_mode1_outro";
			exitChapter(myCallback,-1);
			//TweenMax.to($("#main_div"),1,{css:{"opacity":"0"}, onComplete:FS.startCase, onCompleteParams:[myCallback]});
		}
		else {
			
			globalAnimation=0;
			FS.gotoNode(FS.currentNodeNr,1);
		}
		//else console.log("HUB error: could not found callback action in function respondToHUB");
	}



//*END OF: HUB SPECIFIC METHODS----------------------------------------------------------------------------------------------------------------------------





//*STORAGE METHODS-----------------------------------------------------------------------------------------------------------------------------------------
//save and reset local storage, giving a possiblity to auto-save progress for the user

self.saveAnswer = function (answer) {
		if(globalAnimation==1) return;
		globalAnimation=1;
		
		var myObj=contentObj[FS.currentNodeNr],
			myCallback = myObj.answers[answer].callback;

			ga('send', 'event', 'answers: '+ activeCase.ID.text, myObj.analysisLog , myObj.answers[answer].analysisLog);

		
		if(myCallback!=undefined && myCallback!="Case1_HUB"  && myCallback!="Case2_HUB") {
			
			TweenMax.to($("#main_div"),1,{css:{"opacity":"0"}, onComplete:FS.startCase, onCompleteParams:[myCallback]});

		}else {
			if(myCallback =="Case1_HUB" || myCallback=="Case2_HUB") {
				var nodeToGo = -1;
				if (contentObj[FS.currentNodeNr].callbackNode !=undefined) nodeToGo=contentObj[FS.currentNodeNr].callbackNode;
				  	 		
				exitChapter(myCallback,nodeToGo);
			}
			else {
				globalAnimation=0;
				TweenMax.to($("#main_div"),1,{css:{"opacity":"0"}, onComplete: FS.gotoNode,onCompleteParams:[FS.currentNodeNr,1]});
			}

		}
	}
	self.resetProgress =function() {
		
	 	$.totalStorage('storeCase','');
	 	$.totalStorage('ID', FS.uniqueid()); //create a new user for DB
	 	$.totalStorage('currentNodeNr','-1');
	 	$.totalStorage('tradeQuestion','-1');
	 	FS.unlockedChapters = new Array();
		FS.unlockedChapters.length=0;
		oldBackground ="";




		$.totalStorage('unlockedChapters',FS.unlockedChapters);
	 	// $('.modal#modal1').removeClass('active');
		// FS.startMain();
	 	window.location.reload();
	}


	self.uniqueid =function(){
	    // always start with a letter (for DOM friendlyness)
	    var idstr=String.fromCharCode(Math.floor((Math.random()*25)+65));
	    do {                
	        // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
	        var ascicode=Math.floor((Math.random()*42)+48);
	        if (ascicode<58 || ascicode>64){
	            // exclude all chars between : (58) and @ (64)
	            idstr+=String.fromCharCode(ascicode);    
	        }                
	    } while (idstr.length<32);

	    return (idstr);
	}

//*END OF: STORAGE METHODS-----------------------------------------------------------------------------------------------------------------------------------------




//*GENERAL METHODS----------------------------------------------------------------------------------------------------------------------------


	function exitChapter(nextHUB, startNode) {  //when reaching last node/object in a json-file, probably go back to a HUB
		var foundNextHUB =false,
			currentCase = activeCase.ID.text;	

			
		for (var i=0; i<=_.size(FS.unlockedChapters); i++) {
			if (FS.unlockedChapters[i] == currentCase) {
				foundNextHUB = true;

				break;
			}
			
		}

		$.totalStorage('currentNodeNr',  startNode);


		//if(currentCase!="Case1a" && foundNextHUB == false) 
			FS.unlockedChapters.push(currentCase);
		 $.totalStorage('unlockedChapters', FS.unlockedChapters);
		
		 ////console.log("exitChapter goto:"+ nextHUB  + "    unlockedChapters:" + _.size(FS.unlockedChapters) +" " + currentCase);
		
		TweenMax.to($("#main_div"),0.35,{css:{"opacity":"0"}, onComplete:FS.startCase, onCompleteParams:[nextHUB,startNode]});
	}
	


	function showNext() {  //show nextbutton and possibly prev-button
		$("#nextButton").fadeIn();
		$("#mobileNextButton").fadeIn();
		if (FS.currentNodeNr>0) $("#prevButton").fadeIn();
			if(activeCase.ID.type=="hub" || activeCase.ID.type=="sub")  {
				
				$("#prevButton").fadeIn();
			}

	}
function showMobileNext() {
		$("#mobileNextButton").fadeIn();
		$("#prevButton").fadeIn();
}

	function showPrev() {
		if (FS.currentNodeNr>0) $("#prevButton").fadeIn();

	}


	function startNode() { //when self.addContent have generated the new page based on "type", start the node if neccessary (listen to video events, start animations...)
	
		var showNextButton = contentObj[FS.currentNodeNr].showNextButton;
		FS.resize();
		globalAnimation=0;
		
		//window.clearTimeout(comicTimeout,);

		switch(FS.currentNodeType) {
			case "video_seq":
				 FS.startVideoListener();
			break;
			case "video":
				 FS.startSingleVideoListener();
			break;
			case "agent":
				 $("#agent").css("visibility","visible");
				animateText($("#agent").children(), showNext);
			break;
			case "hub":
				checkToUnlockChapters();
				
				showMobileNext();
				/*showNextButton=-1;
				$("#nextButton").fadeOut();		
				$("#prevButton").fadeOut();*/
			break;
			case "piechart":
				showPieChart();			
			break;
			case "mark_question": 
				startMarkedQuestion();
			break;
			case "int_question": 
					startIntQuestion();
			break;
			case "freetext_question":
				startFreetextQuestion();
			break;
			case "tradequestion":
				startNodeTradeQuestion();
			break;
			case "checklist": 
    			startCheckList();
   			break;

														/*NETWORK SPECIFIC NODES, REMOVE?
														case "comic":
															 showComics(comicsToFadeIn);
															 comicsToFadeIn =0;
														break;
														case "comicparallel": 
															 startComicParallel(comicsToFadeIn);
															 comicsToFadeIn =0;
														break;
														case "comicsingle":
															 startComicSingle(comicsToFadeIn);
															 comicsToFadeIn =0;
														break;
														case "walloftext":
															  startWallOfText(FS.IDWallOfText);
															  FS.IDWallOfText=-1;
														break
														*/


		}
		if (showNextButton>=0) {
			nextArrowTimeout = setTimeout(showNext,parseInt(showNextButton));	
		}
		else {showPrev();}
	}

	

	function onCompleteFadeoutNode(maindiv, nextNodeId, speed, animationType) {  //when user hits next or leaves a node, the content fades out, when fade is done, this function triggers
		var maindiv;
		maindiv = maindiv = $('#main_div');

		maindiv.html(FS.addContent(nextNodeId));
	
		if (!FS.initComplete){ 
			FS.initComplete = true;
			maindiv.fadeIn('slow');
			startNode();
		}else {
			switch (animationType) {
				case "up":
					TweenMax.fromTo (maindiv, speed, { css:{"top": "1000px", "opacity":"0"}}, {alpha:1, css:{"top": "0px", "opacity":"1"},  onComplete:startNode, ease:Quad.easeInOut});
				break;
				case "down":
					TweenMax.fromTo (maindiv, speed, {css:{"top": "-1000px", "opacity":"0"}}, {autoAlpha:1, css:{"top": "0px", "opacity":"1"},  onComplete:startNode, ease:Quad.easeInOut});
	
				break;
				case "left":
					TweenMax.fromTo (maindiv, speed, { css:{"left": "2000px", "opacity":"0"}}, {autoAlpha:1, css:{"left": "0px", "opacity":"1"},  onComplete:startNode, ease:Quad.easeInOut});
				break;
				case "right":
					TweenMax.fromTo (maindiv, speed, { css:{"left": "-2000px", "opacity":"0" }}, {autoAlpha:1, css:{"left": "0px", "opacity":"1"},  onComplete:startNode, ease:Quad.easeInOut});
				break;
				case "zoom":
					TweenMax.fromTo (maindiv, speed, {autoAlpha:0, scaleX:0.5, scaleY:0.5},{autoAlpha:1, scaleX:1, scaleY:1, onComplete:startNode, ease:Quad.easeInOut});
		
				break;
				case "fade":
						TweenMax.fromTo (maindiv, speed, {css:{ "opacity":"0"} },{css:{ "opacity":"1"} ,onComplete:startNode, ease:Quad.easeInOut});
		
				break;
				case "none": default:
					TweenMax.fromTo (maindiv, 0, {autoAlpha:0 },{autoAlpha:1, onComplete:startNode, ease:Quad.easeInOut});
		
				break;

			}
		}
	}



	self.gotoNode = function(nextNodeId, direction) {   //goto a specific node, based on user interaction
		var oldNodeId, maindiv, speed;
		
		if (!interceptPrevButton) {

			if ((nextNodeId+direction == FS.currentNodeNr) && FS.initComplete) return;
		}
		if(globalAnimation==1) return;
		globalAnimation =1;
		interceptPrevButton = false;
		 removeVideoListener();

		speed=0.35;
		maindiv = $('#main_div');

		oldNodeId = FS.currentNodeNr;
		if (oldNodeId == undefined) {
			
			oldNodeId =  nextNodeId;
		}
			
	   	FS.currentSequence = 0;
	 
		FS.nrOfVideos = 0;
		
	   	FS.currentNodeNr = nextNodeId + direction;

	   	switch (direction) {

	   		case 0: //interceptPrevButton, go to same node, since it is a twostep node with back button
	   			$.totalStorage('currentNodeNr', String(oldNodeId));
	   		break;
	   		case -1:
	   			$.totalStorage('currentNodeNr', String(FS.currentNodeNr));
	   		break;
		   case 1:
		   		$.totalStorage('currentNodeNr', String(nextNodeId));
		   	break;
		}
		
		try{
	  
			ga('send', 'event', 'startNode',  activeCase.ID.text, contentObj[FS.currentNodeNr].ID);
		
		 }catch(err) {}
		//REMOVE POSSIBILTY TO NAVIGATE FREELY
		//	FS.checkArrows(FS.currentNodeNr);
		FS.checkDebugArrows(FS.currentNodeNr);

		if(direction >0) {
		
			try
 		 	{

  				if (contentObj[oldNodeId].callback!=undefined) {
  						
  					if (contentObj[oldNodeId].callback=="OUTRO") {
  						
  						TweenMax.to($("#main_div"),1,{css:{"opacity":"0"}, onComplete:FS.exitGame});
  						return;
  						
  					} 
  					else {
  				 		
						var nodeToGo = -1;
						
						if (contentObj[nextNodeId].callbackNode !=undefined) nodeToGo=contentObj[oldNodeId].callbackNode;
				
  						exitChapter(contentObj[nextNodeId].callback,nodeToGo);
  						return;	
  					}	
  				
  				};
		 	}catch(err) {}
	
		}

		if (FS.DEBUG == "true") $("#nodeNrDebug").html("Node " + contentObj[FS.currentNodeNr].ID);

		 clearTimeout(nextArrowTimeout);
		 clearTimeout(animateTextTimeout);

		//emptyWallTweens();

		setupBackground(FS.currentNodeNr);
		

		var nType = contentObj[FS.currentNodeNr].type;
	


		if (!FS.initComplete){  
			
			maindiv.hide();
				
			onCompleteFadeoutNode(maindiv, FS.currentNodeNr , speed,"none");
		}else {
			$("#nextButton").fadeOut();	
			$("#prevButton").fadeOut();	
			$("#mobileNextButton").fadeOut();
			var animationType = contentObj[oldNodeId].animation; 
			switch (animationType) {
				case "up":
					TweenMax.to (maindiv, speed, { css:{"top": "-1000px", "opacity":"0"}, onComplete:onCompleteFadeoutNode, onCompleteParams:[maindiv, FS.currentNodeNr , speed, animationType],  ease:Quad.easeInOut});
				break;
				case "down":
					TweenMax.to (maindiv, speed, { css:{"top": "1000px", "opacity":"0"}, onComplete:onCompleteFadeoutNode, onCompleteParams:[maindiv, FS.currentNodeNr , speed, animationType],  ease:Quad.easeInOut});
				break;
				case "left":
					TweenMax.to (maindiv, speed, {css:{"left": "-2000px", "opacity":"0"}, onComplete:onCompleteFadeoutNode, onCompleteParams:[maindiv, FS.currentNodeNr , speed, animationType],  ease:Quad.easeInOut});
				break;
				case "right":
					TweenMax.to (maindiv, speed, { css:{"left": "2000px", "opacity":"0"}, onComplete:onCompleteFadeoutNode, onCompleteParams:[maindiv, FS.currentNodeNr , speed, animationType],  ease:Quad.easeInOut});
				break;
				case "zoom":
					TweenMax.to (maindiv, speed, {autoAlpha:0, scaleX:1.5, scaleY:1.5, onComplete:onCompleteFadeoutNode, onCompleteParams:[maindiv, FS.currentNodeNr , speed, animationType],  ease:Quad.easeInOut});
				break;
				case "fade":
					TweenMax.to (maindiv, speed, {alpha:0, onComplete:onCompleteFadeoutNode, onCompleteParams:[maindiv, FS.currentNodeNr , speed, animationType],  ease:Quad.easeInOut});
				break;
				case "none": default:
					TweenMax.to (maindiv, 0, {autoAlpha:0, onComplete:onCompleteFadeoutNode, onCompleteParams:[maindiv, FS.currentNodeNr , speed, animationType],  ease:Quad.easeInOut});
				break;

			}
		}
	}

	
	self.resize = function() {  //when user resize the window, make sure everything stays where it should be
		var inner =  $('#inner');
		var wind =  $(window);
		var scrollwidth=17;

		inner.css('max-height', wind.height()+'px');
	
		TweenMax.to($('#prevButton'), 0.125,{css:{"left": "0px"}});
		if ($("#main_div").height() > $(window).height()) {
			inner.css("overflow-y","auto");
			if (navigator.userAgent.match(/webkit/i)) {
			 		//scrollwidth=8;
			 		scrollwidth=0;
    		}
    		TweenMax.to($('#nextButton'), 0.125,{css:{"right": scrollwidth + "px"}});
    	}else {
			inner.css("overflow-y","hidden");
			TweenMax.to($('#nextButton'), 0.125,{css:{"right":"0px"}});
		}
	}




	self.checkArrows = function(currentNodeNr) {  //check if next or prev button is available, for instance don't show prev button on first node
			if (currentNodeNr<_.size(activeCase.nodes.content)-1) {
 				$("#nextButton").fadeIn();
 			}
 			else{
 				$("#nextButton").fadeOut();
 			}

 	 			
 			if(currentNodeNr==0) {
 				$("#prevButton").fadeOut();
 				
 			}else{
 					$("#prevButton").fadeIn();
 			}
 			

	}


	self.checkDebugArrows = function(currentNodeNr) {  //showing the debug-arrows
			if (currentNodeNr<_.size(activeCase.nodes.content)-1) {
 				$("#debugNextButton").fadeIn();
 			}
 			else{
 				$("#debugNextButton").fadeOut();
 			}

 	 			
 			if(currentNodeNr==0) {
 				$("#debugPrevButton").fadeOut();
 				
 			}else{
 					$("#debugPrevButton").fadeIn();
 			}
 			

	}


	self.preloadImages = function() {  //preload all images specified in a json-file. Put them in an invisible div so when needed the images are available
		var nrOfImages = _.size(activeCase.preload.images);
		if (activeCase.preload.images[0].url=="") return;
		var prelObj = $("#js-preload");
		var res ="";

		for (var i=0; i<nrOfImages; i++) {
			if (i>0) res +=", ";
			res +="url('img/"+ activeCase.preload.images[i].url+"')";

		}
		prelObj.css("background-image",res);
	}

	self.exitGame = function() {
		FS.resetProgress();
		window.location = "http://vagskal.vps-56841.cloudnet.se/";
	}
	
//END OF: GENERAL METHODS-------------------------------------------------------------------------------------------------------------------














//START APPLICATION -------------------------------------------------------------------------------------------------------------------------



	self.startCase = function(newActiveCase, startNode) {  //start a new case, that is a new json-file. Triggers on start of the application 
														   //and when a user reached the last object in a jsonfile and the app follows the "callback"-parameter.
			

		activeCase = eval(newActiveCase);
		globalAnimation=0;
		caseNodeId = 0;
		
		nrOfVideos = 0;
		currentNodeType= "";
		currentSequence = 0;
		TweenMax.to($("#main_div"),1,{css:{"opacity":"1"}});
	
		FS.initComplete = false;
		//	IDWallOfText = -1;
		//arrayOfWallTweens = [];
		//currentlyClickedWallText=-1;

		contentObj = activeCase.nodes.content;

		currentNodeNr = startNode;
		if ($.totalStorage('currentNodeNr')!=undefined)   currentNodeNr =  parseFloat($.totalStorage('currentNodeNr'));

		maxNodeNr = -1;

		//$(".backstretch").remove();
	
		FS.preloadImages();

	
		ga('send', 'event', 'startcase',  activeCase.ID.text );


			//Store progress
		
		$.totalStorage('storeCase', activeCase.ID.text);

		
		FS.gotoNode(currentNodeNr,1);
	}


										
	self.startMain = function() { //THIS IS THE MAIN FUNCTION. IT ALL STARTS HERE
								 // this function triggers by the html-file when all js-files are loaded and jquery/gumby is ready
		
				//$("#prevButton").hide();
			localHostTrue = false;
			if (document.location.hostname == "127.0.0.1") {
				localHostTrue = true; //Used on local debugging when PHP is not available
			}

			//SET TO TRUE TO ENABLE DEBUG MODE FOR FEEDBACK
			DEBUG = "false";
				if (params.debug ==1) DEBUG = "true";

				if (DEBUG == "false") {
					$("#case-nav-wrapper").hide();
					$("#debugNextButton").hide();
					$("#debugPrevButton").hide();
				}
				else {
					$("#case-nav-wrapper").css("display","block");
				}

				GAMEMODE = params.mode;
				if(GAMEMODE == undefined) GAMEMODE=0;
			

			//BV = new $.BigVideo();
			//BV.init();
		 
			FS.globalAnimation = 0;


			if($.totalStorage('unlockedChapters')==undefined) {
				FS.unlockedChapters = new Array();
				FS.unlockedChapters.length=0;
				}

			else FS.unlockedChapters = $.totalStorage('unlockedChapters');
			

			if($.totalStorage('gameMode')!=GAMEMODE) {
			 	//new game mode
			 	$.totalStorage('gameMode',  GAMEMODE);
				FS.resetProgress();
			 	
			}

			if (params.unlock != undefined) {
					unlockChapters(parseInt(params.unlock));
			}

			
			//FS.resetProgress();  //clear localstorage for Debug purpose

			$.totalStorage('ID', FS.uniqueid());

			storeCase = $.totalStorage('storeCase');
			
			if (storeCase==undefined || storeCase=='') {
				storeCase = "Case1a";
				if (parseInt(GAMEMODE) ==1) storeCase ="Case1a";	
				//if (parseInt(GAMEMODE) ==2) storeCase ="CaseVS_HUB";
				//if (parseInt(GAMEMODE) ==3) storeCase ="Case1b";		
				
				 
			}
			
			FS.startCase(storeCase);
	//		FS.startCase(CaseIntro);











// NAVIGATION AND EVENT HANDLERS-----------------------------------------------------------------------------------------------------------------------------

			$(document).on('click', '#nextButton', function() {
		 		
		 			TweenMax.to($('#nextButton'), 0.25,{css:{"right": "-8px"}});
		 			
		 			
		 			FS.gotoNode(FS.currentNodeNr,1);

		 		
		 	
			});
			$(document).on('click', '#prevButton', function() {
				TweenMax.to($('#prevButton'), 0.25,{css:{"left": "-8px"}});
		 			
					if(activeCase.ID.type=="hub" || activeCase.ID.type=="sub" && FS.currentNodeNr==0) {
					
						exitChapter(activeCase.ID.prevcase,activeCase.ID.lastNodeNr);
					}
					else {
		 			 if (interceptPrevButton) FS.gotoNode(FS.currentNodeNr,0);		
					else FS.gotoNode(FS.currentNodeNr,-1);
					}
		 	
			});
			$(document).on('click', '#mobileNextButton', function() {
		 		
		 	
		 			
		 			
		 			FS.gotoNode(FS.currentNodeNr,1);

		 		
		 	
			});
			
			$(document).on('click', '#debugNextButton', function() {
		 		
		 				
		 			
		 			FS.gotoNode(FS.currentNodeNr,1);

		 		
		 	
			});
			$(document).on('click', '#debugPrevButton', function() {
					 		
		 			FS.gotoNode(FS.currentNodeNr,-1);

		 	
			});


			$(window).resize(function() {
				FS.resize();
			});
	
//END OF: NAVIGATION AND EVENT HANDLERS-----------------------------------------------------------------------------------------------------------------------------

}


	return self;

})({});

	//get the querystring params and store them in js-variable. Can be used to debug, jump to specific json-files depending on project
 var prmstr = window.location.search.substr(1);
    var prmarr = prmstr.split ("&");
    var params = {};

    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }


 

