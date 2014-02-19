//WALL OF TEXT
	function emptyWallTweens() {
			for (var i=0; i<_.size(arrayOfWallTweens); i++) {
			
				arrayOfWallTweens[i].kill();

			}
		arrayOfWallTweens=[];
		currentlyClickedWallText=0;
	
	}



	function addNodeWalloftext(nodeId) {
		var walltext, canvasHeight, canvasWidth;
	
		walltext = contentObj[nodeId].walloftext;
		if (walltext === undefined) {
			if (_.size(arrayOfWallTweens)>0) {emptyWallTweens();}
			return "";}

		FS.IDWallOfText = nodeId;
		return "<div id='myCanvas'  style='height:"+$(document).height() * 1+"px' ></div>";


	}

	self.zoomIn = function(wallID) {
		//console.log("wallID clicked "+ wallID + "(old:"+currentlyClickedWallText+") size:"+_.size(arrayOfWallTweens));


		if(currentlyClickedWallText==wallID) { //click on a zoomed in walltext
			
					var currTween = arrayOfWallTweens[wallID];
					$("#wall_"+wallID).removeClass("wallSelected");

				//	currTween = TweenMax.to($("#wall_"+wallID), 20, {scaleX:0, scaleY:0, autoAlpha:0, zIndex:100+wallID, yoyo:true, repeat:-1, repeatDelay:3, delay:0, ease:Linear.easeNone});
					currentlyClickedWallText=-1;
		}
		else{  //clicked on another walltext, not the zoomed in
			if (currentlyClickedWallText!=-1){ //in some walltext is zoomed in
				var currTween = arrayOfWallTweens[currentlyClickedWallText];
				$("#wall_"+currentlyClickedWallText).removeClass("wallSelected");
				//currTween = TweenMax.to($("#wall_"+currentlyClickedWallText), 20, {scaleX:0, scaleY:0, autoAlpha:0, zIndex:100+currentlyClickedWallText, yoyo:true, repeat:-1, repeatDelay:3, delay:0, ease:Linear.easeNone});
			}
				
		
			//arrayOfWallTweens[wallID] = TweenMax.to($("#wall_"+currentlyClickedWallText),20, {scaleX:0, scaleY:0, autoAlpha:0, zIndex:100+wallID, yoyo:true, repeat:-1, repeatDelay:3, delay:0, ease:Linear.easeNone});
			$("#wall_"+wallID).removeClass("wallSelected");
			currentlyClickedWallText=wallID;
			
			//arrayOfWallTweens[wallID].kill();

			//arrayOfWallTweens[wallID] = TweenMax.to($("#wall_"+wallID),0.25,{scaleX:1,scaleY:1, alpha:1, zIndex:550+wallID});
			$("#wall_"+wallID).addClass("wallSelected");

		}

	
		}

self.zoomIn_BUP = function(wallID) {
		//console.log("wallID clicked "+ wallID + "(old:"+currentlyClickedWallText+") size:"+_.size(arrayOfWallTweens));


		if(currentlyClickedWallText==wallID) { //click on a zoomed in walltext
			
					var currTween = arrayOfWallTweens[wallID];
					$("#wall_"+wallID).removeClass("wallSelected");

					currTween = TweenMax.to($("#wall_"+wallID), 20, {scaleX:0, scaleY:0, autoAlpha:0, zIndex:100+wallID, yoyo:true, repeat:-1, repeatDelay:3, delay:0, ease:Linear.easeNone});
					currentlyClickedWallText=-1;
		}
		else{  //clicked on another walltext, not the zoomed in
			if (currentlyClickedWallText!=-1){ //in some walltext is zoomed in
				var currTween = arrayOfWallTweens[currentlyClickedWallText];
				$("#wall_"+currentlyClickedWallText).removeClass("wallSelected");
				currTween = TweenMax.to($("#wall_"+currentlyClickedWallText), 20, {scaleX:0, scaleY:0, autoAlpha:0, zIndex:100+currentlyClickedWallText, yoyo:true, repeat:-1, repeatDelay:3, delay:0, ease:Linear.easeNone});
			}
				
		
			arrayOfWallTweens[wallID] = TweenMax.to($("#wall_"+currentlyClickedWallText),20, {scaleX:0, scaleY:0, autoAlpha:0, zIndex:100+wallID, yoyo:true, repeat:-1, repeatDelay:3, delay:0, ease:Linear.easeNone});
			$("#wall_"+wallID).removeClass("wallSelected");
			currentlyClickedWallText=wallID;
			
			arrayOfWallTweens[wallID].kill();

			arrayOfWallTweens[wallID] = TweenMax.to($("#wall_"+wallID),0.25,{scaleX:1,scaleY:1, alpha:1, zIndex:550+wallID});
			$("#wall_"+wallID).addClass("wallSelected");

		}

	
		}
	
	function startWallOfText(myIDWallOfText) {
 		var walloftext = contentObj[myIDWallOfText].walloftext;
			
      		var rownr = 0;
   			var myDiv = $("#myCanvas");

   			var maxX = $("#nodeHeader").width()-500;
   			currentlyClickedWallText =0;
   		 	myDiv.append("<ignorefirstchild/><div class='centered twelve columns' id='myDiv_column'><div class='row quoterow' id='myDiv_row"+rownr+"'><ignorefirstchild/>");
    	   for (var i = 0; i<_.size(walloftext); i++) {
    	   		//var randx = 0 +150*(i%4);//0 + Math.floor((Math.random()*480)+1);
    	   		//var randy = Math.floor((Math.random()*$(window).height()*0.6)+1);
    	   		//var rando  = 1 / ((i+1));
    	   		
    	   		
    	   		//(i/_.size(walloftext)
    	   		//var style ="top:"+ randy + "px; left:"+randx+"px;" ;
    	   		if (i==3 || i==6) {
    	   				 $("#myDiv_column").append("</div>");
    	   				rownr++;
    	   				 $("#myDiv_column").append("<div class='row quoterow' id='myDiv_row"+rownr+"'><ignorefirstchild/>");
    	   		}
    	   		if(i==0) $("#myDiv_row"+rownr).append("<div id='wall_"+i+"' class='three columns walloftextcontent2 wallSelected'><span class='wallOfTextHitarea'>- ” "+walloftext[i].text+" ”</span></div>");
    	   		else if(i<6) $("#myDiv_row"+rownr).append("<div id='wall_"+i+"' class='three columns walloftextcontent2'><span class='wallOfTextHitarea'>- ” "+walloftext[i].text+" ”</span></div>");
    			else  $("#myDiv_row"+rownr).append("<div id='wall_"+i+"' class='five columns walloftextcontent2'><span class='wallOfTextHitarea'>- ” "+walloftext[i].text+" ”</span></div>");
    			 /*TweenMax.set($("#wall_"+i), {zIndex:100+i, autoAlpha:0, scaleX:0.5, scaleY:0.5});
    			 var myDelay = i;
    			 if (i>2) myDelay = (i-2)*5 +(i-2); 
    	   		 var myT = TweenMax.to($("#wall_"+i), 20, {scaleX:1, scaleY:1, autoAlpha:1, zIndex:500+i, yoyo:true, repeat:-1, repeatDelay:3, delay:myDelay,  ease:Linear.easeNone});
    	   			arrayOfWallTweens.push(myT);
				*/
    	   		 myDiv.append("<script>$('#wall_"+i+"').click(function() {FS.zoomIn("+ i +")});</script>");
    	   		
    	   }
    	   myDiv.append("</div></div>");


	}

	function startWallOfText_BUP(myIDWallOfText) {
 		var walloftext = contentObj[myIDWallOfText].walloftext;
			
      	
   			var myDiv = $("#myCanvas");

   			var maxX = $("#nodeHeader").width()-500;

    	   for (var i = 0; i<_.size(walloftext); i++) {
    	   		var randx = 0 + Math.floor((Math.random()*maxX)+1);//0 + Math.floor((Math.random()*480)+1);
    	   		var randy = Math.floor((Math.random()*$(window).height()*0.6)+1);
    	   		var rando  = 1 / ((i+1));
    	   		
    	   		
    	   		//(i/_.size(walloftext)
    	   		var style ="top:"+ randy + "px; left:"+randx+"px;" ;
    	   		myDiv.append("<div id='wall_"+i+"' class='walloftextcontent' style='"+style+"''><span class='wallOfTextHitarea'>- ” "+walloftext[i].text+" ”</span></div>");
    			
    			 TweenMax.set($("#wall_"+i), {zIndex:100+i, autoAlpha:0, scaleX:0.5, scaleY:0.5});
    			 var myDelay = i;
    			 if (i>2) myDelay = (i-2)*5 +(i-2); 
    	   		 var myT = TweenMax.to($("#wall_"+i), 20, {scaleX:1, scaleY:1, autoAlpha:1, zIndex:500+i, yoyo:true, repeat:-1, repeatDelay:3, delay:myDelay,  ease:Linear.easeNone});
    	   			arrayOfWallTweens.push(myT);

    	   		 myDiv.append("<script>$('#wall_"+i+"').click(function() {FS.zoomIn("+ i +")});</script>");
    	   		
    	   }


	}





















// COMIC NODES TEMPLATES ------------------------------------------------------------------------------------------------------------------------

	function startComicSingle(nrOfSlides) {
		var winHeight = 0;
		TweenMax.to($("#comicScroller"),0,{top:winHeight});
		TweenMax.to($(".comicSingleWrapper"),1,{css:{"opacity":"1"},delay:0});
	}

	function startComicParallel(nrOfSlides) {
		var winHeight,
		comicHeight,
		myObj = contentObj[FS.currentNodeNr].comicparallel[0].slide; 

		if (myObj.url !=undefined) {
			comicHeight = 200;
			winHeight=0;
		}
		if (myObj.url2 !=undefined) {
			comicHeight =370;
			winHeight= $(window).height()/4;
	}
		if (myObj.url3 !=undefined) {
			comicHeight =225;
			winHeight= $(window).height()/3 -20;
	}
		if (myObj.url4 !=undefined) {
			comicHeight =185;
			winHeight= $(window).height()/3 -30;
		}

		TweenMax.to($("#comicScroller"),0,{top:winHeight});
		TweenMax.to($(".comicParallelWrapper"),1,{css:{"opacity":"1"},delay:0});
		currentComic = 0;
		for (var i=0; i<nrOfSlides; i++) {
			$("#slide_"+i).data("nr",i)
			$("#slide_"+i).click(function(){
				var currentNr = parseInt($(this).data("nr"));
				emptyWallTweens();
				if(currentComic==currentNr && currentNr < nrOfSlides-1) {
					currentNr++;
				}
				else if (currentComic<currentNr && currentComic<nrOfSlides-1) currentNr = currentComic+1;
				else if (currentComic>currentNr && currentComic>0) currentNr = currentComic-1;
			
				resetAllComicParallels(nrOfSlides, currentNr);
					
				var scrollto = winHeight -(comicHeight)* currentNr;
				//console.log("scrollto "+ scrollto + "  currentNr="+currentNr + "            currentComic="+currentComic);
				TweenMax.to($("#comicScroller"),0,{top:scrollto});
				currentComic = currentNr;
	
				$("#slide_"+currentNr).addClass("comicActive");
				TweenMax.to($("#slide_"+currentNr),0, {css:{"opacity":"1"}});
				startComicHint(nrOfSlides);
			});
		}
		resetAllComicParallels(nrOfSlides, 0);
		startComicHint(nrOfSlides);
		$("#slide_0").addClass("comicActive");
	}
	
	function resetAllComicParallels(nrOfSlides,exceptSlide) {
			window.clearTimeout(comicTimeout);
		 //console.log("resetAllComicParallels " + nrOfSlides+ ","+exceptSlide);
		for (var i=0; i<nrOfSlides; i++) {
			
				$("#slide_"+i).removeClass("comicActive")
				
			
		}
		
	}

	function startComicHint(nrOfSlides) {
		//console.log("startComicHint " + nrOfSlides+ ","+currentComic);
		window.clearTimeout(comicTimeout);
		var myT;
			for (var i=0; i<nrOfSlides; i++) {
				if (i != currentComic) {
				$("#slide_"+i).removeClass("comicActive")
				myT = TweenMax.fromTo($("#slide_"+i),0.15,{css:{"opacity":"0.1"}}, {css:{"opacity":"0.5"}, yoyo:true, repeat:3, repeatDelay:0.25, delay:5});
				arrayOfWallTweens.push(myT);
				
				}
			}
			comicTimeout = setTimeout(function(){startComicHint(nrOfSlides)},8000);
	}

	function addNodeComicParallel(nodeId) {
		var res,
			comicSlides,
			nrOfSlides,
			myObj,
			comicWidth,
			comicHeight;
			

			comicSlides = contentObj[nodeId].comicparallel; 
			if (comicSlides === undefined) {
				comicsToFadeIn=0;
				return "";}

			nrOfSlides= comicsToFadeIn = _.size(comicSlides);

			//comic_row_height = contentObj[nodeId].comic_row_height;

			res ="<div class='comicParallelWrapper'>";
			res +="<div id='comicScroller'>";
			//width:280px;
			if (comicSlides[0].slide.url !=undefined) {comicWidth = 660;}
		 	if (comicSlides[0].slide.url2 !=undefined) {comicWidth =460;}
			if (comicSlides[0].slide.url3 !=undefined) {comicWidth =300;}
			if (comicSlides[0].slide.url4 !=undefined){ comicWidth =220;}
			
			comicHeight = contentObj[nodeId].comic_row_height;

			for (var i=0; i<nrOfSlides; i++) {
				myObj = comicSlides[i].slide;
				res +="<div id='slide_"+i+"' class='comicSlide";
				if (i==0) res +=" comicActive";
				res +="'  style='height:"+comicHeight+";'>";
				//if (myObj.text != undefined) res +="<div id='li_"+i+"text' class='comicHeader'>"+myObj.text+"</div>";
				if (myObj.url != undefined) res +="<div id='li_"+i+"a' class='parallelcomic' style='width:"+comicWidth+"px;'><img src='img/"+myObj.url+"' /></div>";
				if (myObj.url2 != undefined) res +="<div id='li_"+i+"b' class='parallelcomic' style='width:"+comicWidth+"px;'><img src='img/"+myObj.url2+"' /></div>";
				if (myObj.url3 != undefined) res +="<div id='li_"+i+"c' class='parallelcomic' style='width:"+comicWidth+"px;'><img src='img/"+myObj.url3+"' /></div>";
				if (myObj.url4 != undefined) res +="<div id='li_"+i+"c' class='parallelcomic' style='width:"+comicWidth+"px;'><img src='img/"+myObj.url4+"' /></div>";
			
				
				res +="</div>";
			}
			res +="</div></div>";


		return res;



	}

	function addNodeComicSingle(nodeId) {
		var res,
			comicSlides,
			nrOfSlides,
			myObj;
			

			comicSlides = contentObj[nodeId].comicsingle; 
			if (comicSlides === undefined) {
				comicsToFadeIn=0;
				return "";}

			nrOfSlides= comicsToFadeIn = _.size(comicSlides);


			res ="<div class='comicSingleWrapper' style='height:"+nrOfSlides * 517+"px;'>";
			res +="<div id='comicScroller'>";
			for (var i=0; i<nrOfSlides; i++) {
				myObj = comicSlides[i].slide;
				res +="<div id='slide_"+i+"' class='singleComicSlide";
				if (i==0) res +=" comicActive";
				res +="'>";
				if (myObj.url != undefined) res +="<div id='li_"+i+"a' class='singlecomic'><img src='img/"+myObj.url+"' /></div>";
				if (myObj.text != undefined) res +="<div id='li_"+i+"text' class='comicSingleHeader'>"+myObj.text+"</div>";
					
				res +="</div>";
			}
			res +="</div></div>";


		return res;



	}

	function addNodeComic (nodeId) {
		var comicImages,
			nrOfImages,
			nrOfCols1,
			nrOfCols2,
			res,
			addedSecondRow,
			comic_row_height;

		comicImages = contentObj[nodeId].comic; 
		if (comicImages === undefined) {
			comicsToFadeIn=0;
			return "";}
	
		nrOfImages= comicsToFadeIn = _.size(comicImages);
		
		switch (nrOfImages/2) {
			case 4: //8 images
				nrOfCols1 = nrOfCols2= "four_up";
			break;
			case 3: //6 images
				nrOfCols1 = nrOfCols2= "three_up";
			break;
			case 2: //4 images
				nrOfCols1 = nrOfCols2=  "two_up";
			break;
			case 1: //2 images
				nrOfCols1 = nrOfCols2= "one_up";
			break;

			case 3.5: //7 images
				nrOfCols1 = "tree_up";
				nrOfCols2= "four_up";
			break;
			case 2.5: //5 images
				nrOfCols1 = "two_up";
				nrOfCols2= "three_up";
			break;
			case 1.5: //3 images
				nrOfCols1 = "one_up";
				nrOfCols2=  "two_up";
			break;
			default: //? images
				nrOfCols1 = "one_up";
				nrOfCols2= "one_up";
			break;


		}


		comic_row_height = contentObj[nodeId].comic_row_height;

		res ="<div class='comicWrapper'>";
		for (var i=0; i<nrOfImages; i++) {
			res +="<div id='li_"+i+"' class='hiddenComic'><img src='img/"+comicImages[i].url+"' style='max-height:"+comic_row_height+";' class='comicImg'/></div>";
		}
		res +="</div>";

		return res;


	}


		function showComics(comicsToFadeIn) {
		for (var i=0; i<comicsToFadeIn; i++) {
			TweenMax.to($('#li_'+i),1,{opacity:1, delay:(i*2)});
		} 
	}


	// END OF: COMIC NODES TEMPLATES

















//*OBSOLETE METHODS
	function addNodeNextButton() {
		return "<div class='medium warning btn' id='nextButton'><a href='#'>Next</a></div>";

	}
		function addNodeMusic(nodeId) {
		return;
		var res ="",
			musicURL = contentObj[nodeId].music ;
		if ( musicURL== undefined) return "";
		res +="<audio id='soundtrack'  loop='loop' preload='auto' volume='1' autoplay='autoplay'>";
		res +="<source src='"+musicURL+".mp3' type='audio/mpeg'>";
		res +="<source src='"+musicURL+".ogg' type='audio/ogg'>";
    	res +="</audio>";
    	return res;
	}



self.setUpThumbs = function() {
		var nrOfNodes = _.size(activeCase.nodes.content);
		var navObj = $("#case-nav");
		var res ="";

		//HIDE THUMBS********************************************************************
																				return;


		//*******************************************************************************																		
																
		if (FS.maxNodeNr<FS.currentNodeNr) {
			FS.maxNodeNr = FS.currentNodeNr;
			
		} 

		for (var i=0; i<nrOfNodes; i++) {
			switch (contentObj[i].type) {
				case "info": case "chapter": default:
					res += "<div class='node-thumb node-info";
					if (FS.currentNodeNr==i) { res += " node-selected";}
					if (FS.maxNodeNr>=i) {
						res +=" node-visited";
						res +="' onclick='FS.gotoNode("+i+",0);'>";
					}
					else{
						res +="'>"
					}

					res +="</div>";
				break;
				case "question":
				  res += "<div class='node-thumb node-question";
				  if (FS.currentNodeNr==i) { res += " node-selected";}
				  if (FS.maxNodeNr>=i) {
				  	res +=" node-visited";
				  	res +="' onclick='FS.gotoNode("+i+",0);'>";
				   }
				   else{
						res +="'>"
					}
					res +="</div>";
				break;
				case "hidden":

				break;
				
			}
		}
			
		navObj.html(res);

	}