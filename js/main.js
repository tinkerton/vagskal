/*global $, jQuery, _, TweenMax, console, CaseIntro, Modernizer*/

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
		storeCase;


	/*NETWORK SPECIFIC VARIABLES
	var arrayOfWallTweens,
		currentlyClickedWallText,
		IDWallOfText,
		comicsToFadeIn,
		currentComic,
		comicTimeout;
	*/





	
	//*GENERAL METHODS FOR NODE TEMPLATES---------------------------------------------------------------------------------
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






















	//VIDEO TEMPLATES ---------------------------------------------------------------------------------------------------
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
					
					if ( videos[i].source  == "youtube") {
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



			self.video_onFinish = function(id) {
				  	 removeVideoListener();
				  	 FS.currentSequence =  contentObj[FS.currentNodeNr].sequences[FS.currentSequence].gotoID;
				   	 if ( FS.currentSequence!=undefined)  TweenMax.to($("#seqWrapper"), 0.5, {alpha:0, onComplete:FS.populateSequence})
				  	 else {
				  	 	if (contentObj[FS.currentNodeNr].callback!=undefined) {
				  	 		exitChapter(contentObj[FS.currentNodeNr].callback);

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


	//*END OF: VIDEO TEMPLATE -----------------------------------------------------------------------------------------------------------------













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
		var pretext = contentObj[nodeId].pretext;
		if (pretext == undefined) return "";
		return "<h3>"+ contentObj[nodeId].pretext+"</h3>";
		
	}

	function addNodePostText (nodeId) {
		var posttext = contentObj[nodeId].posttext;
		if (posttext == undefined) return "";
		return "<p>"+ contentObj[nodeId].posttext+"</p>";
		
	}


	function addHubMenu(nodeId) {
		var res, 
			nrOfChapters,
			myObj,
		 	wHeight;

			wHeight =$(window).height();
		
			res = "<div class='chapterWrapper' style='height:"+wHeight+"px; width:960px; '>";

			myObj = contentObj[nodeId].chapters;
			nrOfChapters = _.size(myObj);

			for (var i=0; i<nrOfChapters; i++) {

				res +="<div id='chapter_"+myObj[i].ID+"' class='chapterItem";
				if(myObj[i].lockeduntil!=undefined) {
					res +=" locked";
				}
				res +="' style='height:"+myObj[i].height+"; width:"+myObj[i].width+"; left:"+myObj[i].left+"; top:"+myObj[i].top+"; padding-top:"+myObj[i].paddingtop+"; font-size:"+myObj[i].fontsize+"em;'  onClick=FS.respondToHUB("+i+")>"+myObj[i].text+"</div>";
			
			}

			res+="</div>";
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
    
    	function animateNode(element, callback) {
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




	self.addContent = function(nodeId) {

			FS.currentNodeType = contentObj[nodeId].type;

			var result = addNodeHeader(nodeId) + addNodeTitle(nodeId);
			
			switch (FS.currentNodeType) {
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

				/*NETWORK SPECIFIC NODES? REMOVE?
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

















//*HUB SPECIFIC METHODS----------------------------------------------------------------------------------------------------------------------------
	function unlockChapters(nr) {

		var chapterNamesArray = new Array(
			"VS_demo"
		
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
			
			TweenMax.to($("#main_div"),1,{css:{"opacity":"0"}, onComplete:FS.startCase, onCompleteParams:[myCallback]});
		}
		//else console.log("HUB error: could not found callback action in function respondToHUB");
	}



//*END OF: HUB SPECIFIC METHODS----------------------------------------------------------------------------------------------------------------------------





//*STORAGE METHODS-----------------------------------------------------------------------------------------------------------------------------------------
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

				exitChapter(myCallback);
			}
			else {
				globalAnimation=0;
				TweenMax.to($("#main_div"),1,{css:{"opacity":"0"}, onComplete: FS.gotoNode,onCompleteParams:[FS.currentNodeNr,1]});
			}

		}
	}
	self.resetProgress =function() {
		
	 	$.totalStorage('storeCase','');

	 	$.totalStorage('currentNodeNr','-1');
	 	FS.unlockedChapters = new Array();
		FS.unlockedChapters.length=0;
	 	$.totalStorage('unlockedChapters',FS.unlockedChapters);
	 	window.location.reload();
	}
//*END OF: STORAGE METHODS-----------------------------------------------------------------------------------------------------------------------------------------











//*GENERAL METHODS----------------------------------------------------------------------------------------------------------------------------


	function exitChapter(nextHUB) {
		var foundNextHUB =false,
			currentCase = activeCase.ID.text;	

			
		for (var i=0; i<=_.size(FS.unlockedChapters); i++) {
			if (FS.unlockedChapters[i] == currentCase) {
				foundNextHUB = true;

				break;
			}
			
		}

		$.totalStorage('currentNodeNr',  "-1");


		if(currentCase!="CaseIntro" && foundNextHUB == false) FS.unlockedChapters.push(currentCase);
		 $.totalStorage('unlockedChapters', FS.unlockedChapters);
		
		 ////console.log("exitChapter goto:"+ nextHUB  + "    unlockedChapters:" + _.size(FS.unlockedChapters) +" " + currentCase);
	
		TweenMax.to($("#main_div"),1,{css:{"opacity":"0"}, onComplete:FS.startCase, onCompleteParams:[nextHUB]});
	}



	function showNext() {
		$("#nextButton").fadeIn();
		if (FS.currentNodeNr>0) $("#prevButton").fadeIn();

	}



	function startNode() {
	
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
				showNextButton=-1;
				$("#nextButton").fadeOut();	
				$("#prevButton").fadeOut();	
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
	}





	function onCompleteFadeoutNode(maindiv, nextNodeId, speed, animationType) {
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



	self.gotoNode = function(nextNodeId, direction) {
		var oldNodeId, maindiv, speed;
		
		if ((nextNodeId+direction == FS.currentNodeNr) && FS.initComplete) return;
		if(globalAnimation==1) return;
		globalAnimation =1;
		 removeVideoListener();

		speed=0.809;
		maindiv = $('#main_div');

		oldNodeId = FS.currentNodeNr;

	   	FS.currentSequence = 0;
	 
		FS.nrOfVideos = 0;
	   	FS.currentNodeNr = nextNodeId + direction;
	   	if(direction <0) {
	   		$.totalStorage('currentNodeNr', String(FS.currentNodeNr));
	   	}
		else $.totalStorage('currentNodeNr', String(nextNodeId));
	

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
  						FS.resetProgress();
  						window.location = "outro.html";
  					} 
  					else {
  				 
						
  						exitChapter(contentObj[oldNodeId].callback);
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

	
	self.resize = function() {
		var inner =  $('#inner');
		var wind =  $(window);
		var scrollwidth=17;

		inner.css('max-height', wind.height()+'px');
	
		TweenMax.to($('#prevButton'), 0.125,{css:{"left": "0px"}});
		if ($("#main_div").height() > $(window).height()) {
			inner.css("overflow-y","auto");
			if (navigator.userAgent.match(/webkit/i)) {
			 		scrollwidth=8;
    		}
    		TweenMax.to($('#nextButton'), 0.125,{css:{"right": scrollwidth + "px"}});
    	}else {
			inner.css("overflow-y","hidden");
			TweenMax.to($('#nextButton'), 0.125,{css:{"right":"0px"}});
		}
	}




	self.checkArrows = function(currentNodeNr) {
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


	self.checkDebugArrows = function(currentNodeNr) {
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


	self.preloadImages = function() {
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

	
//END OF: GENERAL METHODS-------------------------------------------------------------------------------------------------------------------












//START APPLICATION -------------------------------------------------------------------------------------------------------------------------



	self.startCase = function(newActiveCase) {
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

		currentNodeNr = -1;
		if ($.totalStorage('currentNodeNr')!=undefined)   currentNodeNr =  parseFloat($.totalStorage('currentNodeNr'));

		maxNodeNr = -1;

		$(".backstretch").remove();
	
		FS.preloadImages();

	
		ga('send', 'event', 'startcase',  activeCase.ID.text );


			//Store progress
		
		$.totalStorage('storeCase', activeCase.ID.text);
		
	
		FS.gotoNode(currentNodeNr,1);
	}



	




	//THIS IS THE MAIN FUNCTION. IT ALL STARTS HERE!
	self.startMain = function() { 
		
				//$("#prevButton").hide();
				
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

			//START CASE HERE - MAIN


			//RESET
			//FS.resetProgress();



			storeCase = $.totalStorage('storeCase');
			
			if (storeCase==undefined || storeCase=='') {
				storeCase = "CaseIntro";
				if (parseInt(GAMEMODE) ==1) storeCase ="CaseIntro1";	
				if (parseInt(GAMEMODE) ==2) {
					unlockChapters(6);
					storeCase ="CaseIntro2";	
				}
				 
			}
			
			FS.startCase(storeCase);
			//FS.startCase(Case1d);



// NAVIGATION AND EVENT HANDLERS-----------------------------------------------------------------------------------------------------------------------------

			$(document).on('click', '#nextButton', function() {
		 		
		 			TweenMax.to($('#nextButton'), 0.25,{css:{"right": "-8px"}});
		 			
		 			
		 			FS.gotoNode(FS.currentNodeNr,1);

		 		
		 	
			});
			$(document).on('click', '#prevButton', function() {
				TweenMax.to($('#prevButton'), 0.25,{css:{"left": "-8px"}});
		 			 		
		 			FS.gotoNode(FS.currentNodeNr,-1);

		 	
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



// Gumby is ready to go
Gumby.ready(function() {
	//console.log('Gumby is ready to go...', Gumby.debug());

	// placeholder polyfil
	if(Gumby.isOldie || Gumby.$dom.find('html').hasClass('ie9')) {
		$('input, textarea').placeholder();
	}
	 Gumby.initialize('switches');




});




// Oldie document loaded
Gumby.oldie(function() {
	//console.log("Oldie");
});


function loadScript(url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("body")[0].appendChild(script);
}


var prmstr = window.location.search.substr(1);
var prmarr = prmstr.split ("&");
var params = {};

for ( var i = 0; i < prmarr.length; i++) {
    var tmparr = prmarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}