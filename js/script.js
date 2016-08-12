// M: 4/4\nL: 1/4\nK: Cmaj\n%%staves {lefthand righthand}\nV: tclef clef=treble\nV: bclef clef=bass\n[V: tclef]xxxx|xxxx|xxxx|xxxx|]\n[V: bclef]xxxx|xxxx|xxxx|xxxx|]

// abcjs note table
var bassNotes = ["C,,","D,,","E,,","F,,","G,,","A,,","B,,","C,","D,","E,","F,","G,","A,","B,","C","D", "E", "D", "C", "B,", "A,", "G,", "F,", "E,"];
var trebleNotes = ["A,","B,","C","D","E","F","G","A","B","c","d","e","f","g","a","b","c'", "b", "a", "g", "f", "e", "d", "c", "B", "A"];

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
var keysigButton = document.getElementById("keySignature");
var keysigModal = document.getElementById("keysig-modal");
var keysigClose = document.getElementsByClassName("close")[0];
var difficultyButton = document.getElementById("difficulty");
var difficultyModal = document.getElementById("difficulty-modal");
var difficultyClose = document.getElementsByClassName("close")[1];

keysigButton.onclick = function(){
	keysigModal.style.display = "block";
}
keysigClose.onclick = function(){
	keysigModal.style.display = "none";
}
difficultyButton.onclick = function(){
	difficultyModal.style.display = "block";
}
difficultyClose.onclick = function(){
	difficultyModal.style.display = "none";
}

window.onclick = function(event){
    if (event.target == document.getElementById("keysig-modal")) {
        keysigModal.style.display = "none";
    }
    if (event.target == document.getElementById("difficulty-modal")){
		difficultyModal.style.display = "none";
	}
}

// Preparation
var difficulty = "easymode";
var time_signature = "4/4";
var key_signature = "K: Cmaj\n";

// Generate
document.getElementById("generate-music-button").onclick = function(){

	var abcstring = "";

	if(difficulty == "easymode"){
		abcstring = generateEasy(key_signature.substring(3,4));
	}
	console.log(key_signature.replace("K: ", "").replace("\n", ""))
	setKeySignature(key_signature.replace("K: ", "").replace("\n", ""));
	ABCJS.renderAbc("rendered", "M: 4/4\nL: 1/4\n" + key_signature + 
		"%%staves {lefthand righthand}\nV: tclef clef=treble\nV: bclef clef=bass\n" + abcstring, {}, 
		{scale: 2, staffwidth: 1100, paddingtop: 25, paddingbottom: 25});
	/*
	ABCJS.renderAbc(
		'rendered', 
		"M: 4/4\nL: 1/4\n" + key_signature + 
		"%%staves {lefthand righthand}\nV: tclef clef=treble\nV: bclef clef=bass\n" + 
		"[V: tclef]cccc|xxxx|xxxx|xxxx|]\n[V: bclef]c,c,,d,,e,,|xxxx|xxxx|xxxx|]", 
		{}, {scale: 2, staffwidth: 920, paddingtop: 25, paddingbottom: 25});
	*/
}

/*
	Easy mode:
	- Notes on one hand only.
	- Sometimes the clefs will alternate
	- No intervals higher than a 3rd
	- No chords
*/
function generateEasy(key){

	var currentTrebleNote = 9;
	var currentBassNote = 7;
	var trebleClef = "[V: tclef]";
	var bassClef = "\n[V: bclef]";

	function generateBar(beats, clef){

		function generateQuarterNote(){
			// There's a 33% chance that the note will move up, down, or stay the same
			if(clef == "treble"){
				var rand = Math.random();
				if(rand < 0.33){
					currentTrebleNote -= 1;
					trebleClef += trebleNotes[currentTrebleNote];
				}
				else if(rand < 0.66){
					currentTrebleNote += 1;
					trebleClef += trebleNotes[currentTrebleNote];
				}
				else{
					trebleClef += trebleNotes[currentTrebleNote];
				}
			}
			// Copy of the above except with bass
			else{
				var rand = Math.random();
				if(rand < 0.33){
					currentBassNote -= 1;
					bassClef += bassNotes[currentBassNote];
				}
				else if(rand < 0.66){
					currentBassNote += 1;
					bassClef += bassNotes[currentBassNote];
				}
				else{
					bassClef += bassNotes[currentBassNote];
				}
			}
		}
		function generateEighthNotes(){
			for(var j = 0; j < 2; j++){
				generateQuarterNote();
				if(clef == "treble"){
					trebleClef += "/2";
				}
				else{
					bassClef += "/2";
				}
			}
		}

		// Create the specified number of beats in the measure by calling the above functions
		for(var i = 0; i < beats; i++){
			if(Math.random() < 0.8){
				generateQuarterNote();
			}
			else{
				generateEighthNotes();
			}
			if(clef == "treble"){
				bassClef += "x";
			}
			else{
				trebleClef += "x";
			}
		}
		trebleClef += "|";
		bassClef += "|";
	}

	//Change the starting note depending on the key.
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

	// Creates the first note manually. This is an edge case where we don't want the
	// first note to be randomized.
	// 50% chance that it will be on the treble clef, 50% bass clef
	if(Math.random() < 0.5){

		// The first notes have a 25% chance of being eighth notes (just for some variety)
		if(Math.random() < 0.25){
			trebleClef += trebleNotes[currentTrebleNote] + "/2";
			// The next note can either be a step above, below, or the same
			var rand = Math.random();
			if(rand < 0.33){
				currentTrebleNote -= 1
				trebleClef += trebleNotes[currentTrebleNote] + "/2";
			}
			else if(rand < 0.66){
				currentTrebleNote += 1;
				trebleClef += trebleNotes[currentTrebleNote] + "/2";
			}
			else{
				trebleClef += trebleNotes[currentTrebleNote] + "/2";
			}
		}
		else{
			trebleClef += trebleNotes[currentTrebleNote];
		}
		bassClef += "x";
		generateBar(3, "treble");
	}
	// A copy of the code above except "trebleClef" --> "bassClef"
	else{
		if(Math.random() < 0.25){
			bassClef += bassNotes[currentBassNote] + "/2";
			var rand = Math.random();
			if(rand < 0.33){
				currentBassNote -= 1;
				bassClef += bassNotes[currentBassNote] + "/2";
			}
			else if(rand < 0.66){
				currentBassNote += 1
				bassClef += bassNotes[currentBassNote] + "/2";
			}
			else{
				bassClef += bassNotes[currentBassNote] + "/2";
			}
		}
		else{
			bassClef += bassNotes[currentBassNote];
		}
		trebleClef += "x";
		generateBar(3, "bass");
	}

	// Loops four times to create four measures of music
	for(var i = 0; i < 3; i++){
		if(Math.random() < 0.50){
			generateBar(4, "treble");
		}
		else{
			generateBar(4, "bass");
		}
	}

	console.log(trebleClef);
	console.log(bassClef);
	return trebleClef + "]" + bassClef + "]";
}

function setKeySignature(key){
	switch(key){
		// Special cases
		// 7 flats
		case "Cbmaj":
		case "Abmin":
			resetKeySignature();
			for(var elem in map){
				map[elem] = map[elem].charAt(0) + "b" + map[elem].charAt(1);
			}
			break;
		// 7 sharps
		case "C#maj":
		case "Amin":
			resetKeySignature();
			for(var elem in map){
				map[elem] = map[elem].charAt(0) + "#" + map[elem].charAt(1);
			}
			break;

		// In order of sharps, then flats. G, D, A, E, B, F#, C#
		// 1 sharp keys
		case "Gmaj":
		case "Emin":
			resetKeySignature();
			for(var elem in map){
				if(map[elem].charAt(0) == "F"){
					map[elem] = map[elem].charAt(0) + "#" + map[elem].charAt(1);
				}
			}
			break;
		// 2 sharps keys
		case "Dmaj":
		case "Bmin":
			resetKeySignature();
			for(var elem in map){
				if(map[elem].charAt(0) == "F" || map[elem].charAt(0) == "C"){
					map[elem] = map[elem].charAt(0) + "#" + map[elem].charAt(1);
				}
			}
			break;
		// 3 sharps keys
		case "Amaj":
		case "F#min":
			resetKeySignature();
			for(var elem in map){
				if(map[elem].charAt(0) == "F" || map[elem].charAt(0) == "C" || map[elem].charAt(0) == "G"){
					map[elem] = map[elem].charAt(0) + "#" + map[elem].charAt(1);
				}
			}
			break;
		// 4 sharps keys
		case "Emaj":
		case "C#min":
			resetKeySignature();
			for(var elem in map){
				if(map[elem].charAt(0) == "F" || map[elem].charAt(0) == "C" || map[elem].charAt(0) == "G" || map[elem].charAt(0) == "D"){
					map[elem] = map[elem].charAt(0) + "#" + map[elem].charAt(1);
				}
			}
			break;
		// 5 sharps keys
		case "Bmaj":
		case "G#min":
			resetKeySignature();
			for(var elem in map){
				if(map[elem].charAt(0) == "F" || map[elem].charAt(0) == "C" || map[elem].charAt(0) == "G" || map[elem].charAt(0) == "D" || map[elem].charAt(0) == "A"){
					map[elem] = map[elem].charAt(0) + "#" + map[elem].charAt(1);
				}
			}
			break;
		// 6 sharps keys
		case "F#maj":
		case "D#min":
			resetKeySignature();
			for(var elem in map){
				if(map[elem].charAt(0) == "F" || map[elem].charAt(0) == "C" || map[elem].charAt(0) == "G" || map[elem].charAt(0) == "D" || map[elem].charAt(0) == "A" || map[elem].charAt(0) == "E"){
					map[elem] = map[elem].charAt(0) + "#" + map[elem].charAt(1);
				}
			}
			break;
		// 1 flat keys
		case "Fmaj":
		case "Dmin":
			resetKeySignature();
			for(var elem in map){
				if(map[elem].charAt(0) == "B"){
					map[elem] = map[elem].charAt(0) + "b" + map[elem].charAt(1);
				}
			}
			break;
		// 2 flats keys
		case "Bbmaj":
		case "Gmin":
			resetKeySignature();
			for(var elem in map){
				if(map[elem].charAt(0) == "B" || map[elem].charAt(0) == "E"){
					map[elem] = map[elem].charAt(0) + "b" + map[elem].charAt(1);
				}
			}
			break;
		// 3 flats keys
		case "Ebmaj":
		case "Cmin":
			resetKeySignature();
			for(var elem in map){
				if(map[elem].charAt(0) == "B" || map[elem].charAt(0) == "E" || map[elem].charAt(0) == "A"){
					map[elem] = map[elem].charAt(0) + "b" + map[elem].charAt(1);
				}
			}
			break;
		// 4 flats keys
		case "Abmaj":
		case "Fmin":
			resetKeySignature();
			for(var elem in map){
				if(map[elem].charAt(0) == "B" || map[elem].charAt(0) == "E" || map[elem].charAt(0) == "A" || map[elem].charAt(0) == "D"){
					map[elem] = map[elem].charAt(0) + "b" + map[elem].charAt(1);
				}
			}
			break;
		// 5 flats keys
		case "Dbmaj":
		case "Bbmin":
			resetKeySignature();
			for(var elem in map){
				if(map[elem].charAt(0) == "B" || map[elem].charAt(0) == "E" || map[elem].charAt(0) == "A" || map[elem].charAt(0) == "D" || map[elem].charAt(0) == "G"){
					map[elem] = map[elem].charAt(0) + "b" + map[elem].charAt(1);
				}
			}
			break;
		// 6 flats keys
		case "Gbmaj":
		case "Ebmin":
			resetKeySignature();
			for(var elem in map){
				if(map[elem].charAt(0) == "B" || map[elem].charAt(0) == "E" || map[elem].charAt(0) == "A" || map[elem].charAt(0) == "D" || map[elem].charAt(0) == "G" || map[elem].charAt(0) == "C"){
					map[elem] = map[elem].charAt(0) + "b" + map[elem].charAt(1);
				}
			}
			break;
		
	};
}

function resetKeySignature(){
	for (var elem in map) {
		var temp = map[elem].search("#");
		if(temp == -1){
			temp = map[elem].search("b");
			if(temp != -1){
				map[elem] = map[elem].slice(0, temp) + map[elem].slice(temp+1);
			}
		}
		else{
			map[elem] = map[elem].slice(0, temp) + map[elem].slice(temp+1);
		}
	}
}

// Event listener for the key signature buttons
var keysigParent = document.querySelector("#modal-select-keysig");
keysigParent.addEventListener("click", keysigListener, false);
 
function keysigListener(e) {
    if (e.target !== e.currentTarget) {
        key_signature = "K: " + e.target.id; + "\n";
		document.getElementById("info-key-sig").innerHTML = "<strong>Key signature:</strong> " + e.target.innerHTML;
	    document.getElementById("keysig-modal").style.display = "none";
    }
    e.stopPropagation();
}

// Difficulties
document.getElementById("easymode").onclick = function(){
	difficulty = this.id;
	document.getElementById("info-difficulty").innerHTML = "<strong>Difficulty:</strong> Easy</p>";
    document.getElementById("difficulty-modal").style.display = "none";
}
// End difficulties

ABCJS.renderAbc('rendered', "M: 4/4\nL: 1/4\nK: Cmaj\n%%staves {lefthand righthand}\nV: tclef clef=treble\nV: bclef clef=bass\n[V: tclef]xxxx|xxxx|xxxx|xxxx|]\n[V: bclef]xxxx|xxxx|xxxx|xxxx|]", {}, {scale: 2, staffwidth: 1100, paddingtop: 25, paddingbottom: 25});