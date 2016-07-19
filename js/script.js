// abcjs note table
var bassNotes = ["C,,","D,,","E,,","F,,","G,,","A,,","B,,","C,","D,","E,","F,","G,","A,","B,","C","D"];
var trebleNotes = ["A,","B,","C","D","E","F","G","A","B","c","d","e","f","g","a","b","c'","d'"];

// mapping abc notation to its real counterpart
var map = {
	"C,,":"C2",
	"D,,":"D2",
	"E,,":"E2",
	"F,,":"F2",
	"G,,":"G2",
	"A,,":"A2",
	"B,,":"B2",
	"C,":"C3",
	"D,":"D3",
	"E,":"E3",
	"F,":"F3",
	"G,":"G3",
	"A,":"A3",
	"B,":"B3",
	"C":"C4",
	"D":"D4",
	"E":"E4",
	"F":"F4",
	"G":"G4",
	"A":"A4",
	"B":"B4",
	"c":"C5",
	"d":"D5",
	"e":"E5",
	"f":"F5",
	"g":"G5",
	"a":"A5",
	"b":"B5",
	"c'":"C6",
	"d'":"D6"
};

// DOM elements
var music = document.getElementById("music");
var settings = document.getElementById("settings");
var controls = document.getElementById("controls");

// Playback
var song = new BandJS();
song.setTimeSignature(4,4);
song.setTempo(140);
var righthand = song.createInstrument("sawtooth");
var lefthand = song.createInstrument("triangle");


// Add event handlers
document.getElementById("generate").addEventListener ("click", function() {
	var timeSig = "M: 4/4\n";
	var defLength = "L: 1/4\n";
	var keySig = "K: "+ document.getElementById("key").value + document.getElementById("majmin").value + "\n";
	var staffSetup = "%%staves {lefthand righthand}\nV: tclef clef=treble\nV: bclef clef=bass\n";
	var maxLeap = document.getElementById("maxint").value;

	var song = timeSig + defLength + keySig + staffSetup + generateMusic(document.getElementById("key").value.substring(0,1));
	
	settings.style.display="none";
	controls.style.display="block";
	music.style.display="block";

	ABCJS.renderAbc('music', song, {}, {scale: 1.8, staffwidth: 900});
});

document.getElementById('play').addEventListener("click", function(){
    
    var player = song.finish();
	player.play();

	console.log("Play");
});

document.getElementById("goback").addEventListener ("click", function(){
	music.innerHTML="";
	music.style.display="none";
	settings.style.display="block";
	controls.style.display="none";

});

document.getElementById('majmin').addEventListener("change", function(){
	if(document.getElementById('majmin').value == "min") {
		//Major exclusives
		document.getElementById("key").options[0].disabled = true;
		document.getElementById("key").options[3].disabled = true;
		document.getElementById("key").options[10].disabled = true;
		document.getElementById("key").options[5].disabled = false;
		document.getElementById("key").options[15].disabled = false;
		document.getElementById("key").options[12].disabled = false;
	}
	else{
		//Minor exclusives
		document.getElementById("key").options[5].disabled = true;
		document.getElementById("key").options[15].disabled = true;
		document.getElementById("key").options[12].disabled = true;
		document.getElementById("key").options[0].disabled = false;
		document.getElementById("key").options[3].disabled = false;
		document.getElementById("key").options[10].disabled = false;
	}
});

document.getElementById('another').addEventListener("click", function(){
	
	var timeSig = "M: 4/4\n";
	var defLength = "L: 1/4\n";
	var keySig = "K: "+ document.getElementById("key").value + document.getElementById("majmin").value + "\n";
	var staffSetup = "%%staves {lefthand righthand}\nV: tclef clef=treble\nV: bclef clef=bass\n";
	var maxLeap = document.getElementById("maxint").value;
	var song = timeSig + defLength + keySig + staffSetup + generateMusic(document.getElementById("key").value.substring(0,1));

	music.innerHTML="";
	ABCJS.renderAbc('music', song, {}, {scale: 2, staffwidth: 900});
});

function generateMusic(key){
	var trebleShift = 0;
	var bassShift = 0;
	var trebleInt = 9;
	var bassInt = 7;
	var trebleClef = "[V: tclef]";
	var bassClef = "\n[V: bclef]";

	switch(key){
		case "A":
			trebleShift = -2;
			bassShift = -2;
			break;
		case "B":
			trebleShift = -1;
			bassShift = -1;
			break;
		case "C":
			//Do nothing
			break;
		case "D":
			trebleShift = 1;
			bassShift = 1;
			break;
		case "E":
			trebleShift = 2;
			bassShift = 2;
			break;
		case "F":
			trebleShift = -4;
			bassShift = 3;
			break;
		case "G":
			trebleShift = -3;
			bassShift = 4;
			break;
	};

	// Starting notes
	trebleClef += trebleNotes[trebleInt+trebleShift];
	bassClef += bassNotes[bassInt+bassShift];

	righthand.note("quarter",map[trebleNotes[trebleInt+trebleShift]]);
	lefthand.note("quarter",map[bassNotes[bassInt+bassShift]]);


	for (var i = 15; i > 0; i--) {
		var random = Math.random();

		if(random < 0.60){
			trebleInt += 1;
			bassInt += 1;
			trebleClef += trebleNotes[trebleInt+trebleShift];
			bassClef += bassNotes[bassInt+bassShift];
			righthand.note("quarter",map[trebleNotes[trebleInt+trebleShift]]);
			lefthand.note("quarter",map[bassNotes[bassInt+bassShift]]);
		}
		else{
			trebleInt -= 1;
			bassInt -= 1;
			trebleClef += trebleNotes[trebleInt+trebleShift];
			bassClef += bassNotes[bassInt+bassShift];
			righthand.note("quarter",map[trebleNotes[trebleInt+trebleShift]]);
			lefthand.note("quarter",map[bassNotes[bassInt+bassShift]]);
		}
		if(i == 13 || i == 9 || i == 5){
			trebleClef += "|";
			bassClef += "|";
		}
	};

	return trebleClef + "|]" + bassClef + "|]";

}