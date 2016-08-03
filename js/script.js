// M: 4/4\nL: 1/4\nK: Cmaj\n%%staves {lefthand righthand}\nV: tclef clef=treble\nV: bclef clef=bass\n[V: tclef]xxxx|xxxx|xxxx|xxxx|]\n[V: bclef]xxxx|xxxx|xxxx|xxxx|]

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
var modal = document.getElementById("keysig-modal");
var keySigButton = document.getElementById("keySignature");
var close = document.getElementsByClassName("close")[0];

document.getElementById("keySignature").onclick = function(){
	document.getElementById("keysig-modal").style.display = "block";
}

document.getElementsByClassName("close")[0].onclick = function(){
	document.getElementById("keysig-modal").style.display = "none";
}

window.onclick = function(event){
    if (event.target == document.getElementById("keysig-modal")) {
        document.getElementById("keysig-modal").style.display = "none";
    }
}

// Preparation
var difficulty = "";
var time_signature = "";
var key_signature = "";

// Faster way to do this??
document.getElementById("Cbmaj").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: Cb major";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Cmaj").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: C major";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("C#maj").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: C# major";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Dbmaj").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: Db major";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Dmaj").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: D major";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Ebmaj").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: Eb major";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Emaj").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: E major";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Fmaj").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: F major";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("F#maj").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: F# major";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Gbmaj").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: Gb major";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Gmaj").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: G major";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Abmaj").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: Ab major";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Amaj").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: A major";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Bbmaj").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: Bb major";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Bmaj").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: B major";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Cmin").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: C minor";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("C#min").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: C# minor";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Dmin").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: D minor";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("D#min").onclick = function(){
	key_signature = "K: " + this.value + "\n";

	document.getElementById("info-key-sig").innerHTML = "Key signature: D# minor";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Ebmin").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: Eb minor";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Emin").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: E minor";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Fmin").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: F minor";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("F#min").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: F# minor";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Gbmin").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: Gb minor";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Gmin").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: G minor";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Abmin").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: Ab minor";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Amin").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: A minor";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("A#min").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: A# minor";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Bbmin").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: Bb minor";
    document.getElementById("keysig-modal").style.display = "none";
}
document.getElementById("Bmin").onclick = function(){
	key_signature = "K: " + this.value + "\n";
	document.getElementById("info-key-sig").innerHTML = "Key signature: B minor";
    document.getElementById("keysig-modal").style.display = "none";
}



ABCJS.renderAbc('rendered', "M: 4/4\nL: 1/4\nK: Cmaj\n%%staves {lefthand righthand}\nV: tclef clef=treble\nV: bclef clef=bass\n[V: tclef]xxxx|xxxx|xxxx|xxxx|]\n[V: bclef]xxxx|xxxx|xxxx|xxxx|]", {}, {scale: 2, staffwidth: 920, paddingtop: 25, paddingbottom: 25});