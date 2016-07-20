// abcjs note table
var bassNotes = ["C,,","D,,","E,,","F,,","G,,","A,,","B,,","C,","D,","E,","F,","G,","A,","B,","C","D", "E"];
var trebleNotes = ["A,","B,","C","D","E","F","G","A","B","c","d","e","f","g","a","b","c'"];

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
	"c'":"C6"
};

// DOM elements
var music = document.getElementById("music");
var settings = document.getElementById("settings");
var controls = document.getElementById("controls");

// Playback
var song = new BandJS();
song.setTimeSignature(4,4);
song.setTempo(100);
var righthand = song.createInstrument("sawtooth");
var lefthand = song.createInstrument("triangle");
var player;

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

	ABCJS.renderAbc('music', song, {}, {scale: 2, staffwidth: 900, paddingtop: 50, paddingbottom: 50});
});

document.getElementById('play').addEventListener("click", function(){
	player.play();
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

	song = new BandJS();
	song.setTimeSignature(4,4);
	song.setTempo(100);
	righthand = song.createInstrument("sawtooth");
	lefthand = song.createInstrument("triangle");
	
	var timeSig = "M: 4/4\n";
	var defLength = "L: 1/4\n";
	var keySig = "K: "+ document.getElementById("key").value + document.getElementById("majmin").value + "\n";
	var staffSetup = "%%staves {lefthand righthand}\nV: tclef clef=treble\nV: bclef clef=bass\n";
	var maxLeap = document.getElementById("maxint").value;
	var song = timeSig + defLength + keySig + staffSetup + generateMusic(document.getElementById("key").value.substring(0,1));

	music.innerHTML="";
	ABCJS.renderAbc('music', song, {}, {scale: 2, staffwidth: 900, paddingtop: 50, paddingbottom: 50});
});

function generateMusic(key){
	var currentTrebleNote = 9;
	var currentBassNote = 7;
	var trebleClef = "[V: tclef]";
	var bassClef = "\n[V: bclef]";

	switch(key){
		case "A":
			currentTrebleNote += -2;
			currentBassNote += -2;
			break;
		case "B":
			currentTrebleNote += -1;
			currentBassNote += -1;
			break;
		case "C":
			//Do nothing
			break;
		case "D":
			currentTrebleNote += 1;
			currentBassNote += 1;
			break;
		case "E":
			currentTrebleNote += 2;
			currentBassNote += 2;
			break;
		case "F":
			currentTrebleNote += -4;
			currentBassNote += 3;
			break;
		case "G":
			currentTrebleNote += -3;
			currentBassNote += 4;
			break;
	};

	// Starting notes
	trebleClef += trebleNotes[currentTrebleNote];
	bassClef += bassNotes[currentBassNote];

	righthand.note("quarter",map[trebleNotes[currentTrebleNote]]);
	lefthand.note("quarter",map[bassNotes[currentBassNote]]);

	for (var i = 15; i > 0; i--) {
		
		currentTrebleNote = generateNote(currentTrebleNote, "easy");
		trebleClef += trebleNotes[currentTrebleNote];
		righthand.note("quarter", map[trebleNotes[currentTrebleNote]]);

		currentBassNote = generateNote(currentBassNote, "easy");
		bassClef += bassNotes[currentBassNote];
		lefthand.note("quarter", map[bassNotes[currentBassNote]]);

		if(i == 13 || i == 9 || i == 5){
			trebleClef += "|";
			bassClef += "|";
		}
	};

	console.log(trebleClef);
	console.log(bassClef);
	player = song.finish();
	return trebleClef + "|]" + bassClef + "|]";
}

function generateNote(start, difficulty){
	var note = start;

	if(start > 16){
		console.log("Started > 16");
		console.log(start);
	}
	if(start < 0){
		console.log("Started < 0");
		console.log(start);
	}

	if(difficulty == "easy"){
		var random = Math.random();
		if(random < 0.25){
			note += 1;
			if(note > 16){
				console.log("plus 1. result: " + note);
				return generateNote(start, difficulty);
			}
		}
		else if(random < 0.5){
			note -= 1;
			if(note < 0){
				console.log("minus 1. result: " + note);
				return generateNote(start, difficulty);
			}
		}
		else if(random < 0.75){
			note += 0;
		}
		else if(random < 0.87){
			note -= 2;
			if(note < 0){
				console.log("minus 2. result: " + note);
				return generateNote(start, difficulty);
			}
		}
		else if(random < 1.00){
			note += 2;
			if(note > 16){
				console.log("plus 2. result: " + note);
				return generateNote(start, difficulty);
			}
		}
		return note;
	}
}