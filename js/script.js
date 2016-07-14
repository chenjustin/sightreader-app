//var button = document.createElement("button");
//button.innerHTML = "Generate";
//button.id="generate";
//var body = document.getElementById("controls");
//body.appendChild(button);

//Buttons
var generate = document.getElementById("generate");
var goBack = document.getElementById("goback");
var generateAnother = document.getElementById("another");

// 3. Add event handler
generate.addEventListener ("click", function() {
	var timeSig = "M: 4/4\n";
	var defLength = "L: 1/4\n";
	var keySig = "K: "+ document.getElementById("key").value + document.getElementById("majmin").value + "\n";
	var staffSetup = "%%staves {lefthand righthand}\nV: tclef clef=treble\nV: bclef clef=bass\n";
	var maxLeap = document.getElementById("maxint").value;
	var trebleClef = "[V: tclef]C/2C/2CC|cdec|gabc'|d'e'f'g'|";
	var bassClef = "\n[V: bclef]B,,2C|C,E,F,C|A,B,A,B,|G,A,B,C|";

	var song = timeSig + defLength + keySig + staffSetup + trebleClef + bassClef;
	
	document.getElementById("settings").style.display="none";
	document.getElementById("controls").style.display="block";
	document.getElementById("music").style.display="block";
	ABCJS.renderAbc('music', song, {}, {scale: 1.4, staffwidth: 900});
	console.log("clicked");
});

goBack.addEventListener ("click", function(){
	document.getElementById("music").innerHTML="";
	document.getElementById("music").style.display="none";
	document.getElementById("settings").style.display="block";
	document.getElementById("controls").style.display="none";
	console.log("clicked");
});