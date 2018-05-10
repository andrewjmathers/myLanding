console.log("hello");
var typeOfEvent;
var zoomed = 0;
var currentWrap;
var scrollMain;
var scrollTo;


function pageChangeTest(e){

var mainone = $("#mainContent1");
var maintwo = $("#mainContent2");
var mainthree = $("#mainContent3");



	if(e.type == "wheel"){

		demensionView(e);

		typeOfEvent = e.type;

		if(!currentWrap){

	currentWrap = mainone;
	
console.log(e.target);
}

	if(e.deltaY>0){


		scrollMain  = ((parseInt(currentWrap[0].id.charAt(currentWrap[0].id.length-1))+1));

		if(scrollMain>3){

			scrollMain = 1;
		}
		

	}else if(e.deltaY<0){


		scrollMain  = ((parseInt(currentWrap[0].id.charAt(currentWrap[0].id.length-1))-1));

		if(scrollMain == 0){

			scrollMain = 3;
		}	
	}

	var classNames = {

			1: "one",
			2: "two",
			3: "three"

		}

		
		
		
		
	scrollTo = $("#mainContent"+scrollMain);


}else{

	console.log(e.target);
}




if( $(e.target).hasClass("chosen") ){

	

	return;
	
}

if( (e.target.className != "one") && (e.target.className != "two") && (e.target.className != "three") && (e.type != "wheel") && (e.target.id != "hireMe") && (e.target.id != "actualHire")){

	console.log("returning");
	return;
}


if(e.type == "click" || e.type == "tap" && e.target.id != "actualHire"){

var currentClassName = e.target.className;

}else if (e.type == "wheel"){

var currentClassName = classNames[scrollMain];



}else if(e.type == "click" && e.target.id == "actualHire"){


	var currentClassName = "three";

}

gridAreaName = "menu"+currentClassName;


console.log("area-name "+currentClassName+" "+gridAreaName);

if(e.type == "click" && e.target.id != "actualHire"){

var currentTarget = eval("main"+e.target.className);
console.log(currentTarget);

}else if(e.type == "wheel"){

var currentTarget = scrollTo;

console.log(currentTarget);

}else if(e.type == "click" && e.target.id == "actualHire"){

	var currentTarget = eval("main"+"three");

}



var classes = document.getElementsByClassName(currentClassName);

$(".chosen").removeClass("chosen");

for(var i = 0; i<classes.length; i++){

	console.log(classes[i]);
	
	classes[i].setAttribute("class", currentClassName+" chosen");
}


$("li").css({"color": "white"});
$(".chosen").parent().css({"color": "red"});




function changeIt(currentTarget){

if(!currentWrap){

	currentWrap = mainone;


}


	currentTarget.css({ "grid-area": gridAreaName });

	var margin;

	
	if(currentWrap[0].id.charAt(currentWrap[0].id.length-1) < currentTarget[0].id.charAt(currentTarget[0].id.length-1)){

		margin = "15%";

	}else{

		margin = "-15%";

	}


	currentWrap.css({"overflow":"hidden"}).animate({"margin-bottom": margin, "opacity":0},300,nextChanges ).fadeOut(0);

	function nextChanges(){

		windowResized();

	

	currentTarget.fadeIn(500).animate({"opacity":1}).css({"display":"grid", "margin-top":"0", "margin-bottom":"0"});

	

	currentWrap = currentTarget;

}



}


changeIt(currentTarget)



}

function redLi(e){

if(e.type == "mouseover"){
	
	if(e.target.parentNode.tagName == "LI"){

		$(e.target.parentNode).css({color: "red"});
	}

}else if(e.type == "mouseleave" ){

	
	
	$("#siderNavMenu > ul > li").css({"color": "white"});
	$(".chosen").parent().css({"color": "red"});
}


}

function demensionView(e){

	if(zoomed == 0 && (e.target.id == "cornerNav" || e.target.parentNode.id ==  "cornerNav")){

	$(document.body).css({
 
		"-webkit-perspective": "1500px", 
		
	});

	$("#Wrapper").addClass("wrapperFarView");


	$("#hiddenMenu").css({
		"display":"block",
		"opacity":"0",
		"position":"absolute",
		"line-height":"6em",
		"top":"25%",
		"right":"15%",
		"list-style":"none",
	}).animate({"opacity":1 }, 1000);

	



	zoomed = 1;

}else if(zoomed == 1 && (e.target.id != "cornerNav" || e.type == "wheel")){

	
	$("#Wrapper").addClass("borderBackUp").removeClass("wrapperFarView");
	function removeBorder(){

		$("#Wrapper").removeClass("borderBackUp");
	}
	setTimeout(removeBorder, 1000);

	$("#hiddenMenu").fadeOut(300);
	
	zoomed = 0;
}
}

function animateMargin(event){

if(event.type == "mouseover" || event.type == "mouseenter"){
	
	$("#cornerNav > span").animate({margin:"7px 0" }, 100);
}else{

	$("#cornerNav > span").animate({margin:"3px 0" }, 100);

}
}

function updateRedDot(){

	$(".chosen").parent().css({"color": "red"});
}


var scrollTimer, lastScrollFireTime = 0;

function scroller(e) {

    var minScrollTime = 1000;
    var now = new Date().getTime();

    

    if (!scrollTimer) {
        if (now - lastScrollFireTime > (1.5 * minScrollTime)) {
            pageChangeTest(e);   // fire immediately on first scroll
            lastScrollFireTime = now;
        }
        
    }
};


function windowResized(){

console.log("trigga");
	if(window.innerWidth < 600){

		if(gridAreaName){

	$("#Wrapper").css({


		"grid-template-areas": "'header header header header''"+gridAreaName+" "+gridAreaName+" "+gridAreaName+" "+gridAreaName+" ' '. . . . '"

	});
}else{

	$("#Wrapper").css({ "grid-template-areas": "'header header header header''mainContent mainContent  mainContent . ' '. . . . '"});

}
	}else if(window.innerWidth > 600){

		if(gridAreaName){

		$("#Wrapper").css({ "grid-template-areas": "'header header header header''. siderNav "+gridAreaName+" . ' '. . . . '"});
	}else{

		
		$("#Wrapper").css({ "grid-template-areas": "'header header header header''. siderNav mainContent . ' '. . . . '"});


	}


	
}

if(window.innerWidth >= 600 && window.innerWidth <= 800  && window.matchMedia("(orientation: portrait)").matches){


			
			if(gridAreaName){

	$("#Wrapper").css({


		"grid-template-areas": "'header header header header'' siderNav "+gridAreaName+" "+gridAreaName+" "+gridAreaName+" ' '. . . . '"

	});

}else{

	$("#Wrapper").css({ "grid-template-areas": "'header header header header'' siderNav mainContent mainContent  mainContent  ' '. . . . '"});
	
		

}

	}else{

		console.log("not there");

	}

}
var gridAreaName;
windowResized();
updateRedDot();
$("#siderNavMenu").on("mouseover", redLi).on("mouseleave", redLi).on("click", pageChangeTest);
$("#hiddenMenu").on("click", demensionView).on("click", pageChangeTest);
$("span").on("mouseleave", redLi);
$("#cornerNav").on("mouseenter", animateMargin).on("mouseleave", animateMargin).on("click", demensionView);
$("#cornerNav > span").on("click", demensionView);
$("#Wrapper").on("click", demensionView);
$("#hireMe").on("click", pageChangeTest);
$("#hireMe").on("click", pageChangeTest);

document.addEventListener("wheel", scroller);
window.addEventListener("resize", windowResized);



