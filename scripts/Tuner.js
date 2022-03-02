navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

let freq = document.getElementById("pitch");
let note = document.getElementById("note");
let detune_amt = document.getElementById("detune_amt");
let bgCircleColor = document.getElementById("tuneCircle");

function backgroundCircleColor(cents) {    
    if (cents > -10 && cents < 10) {
        document.getElementById("tuneCircle").style.borderColor = "green";
    }
    else if (cents > -20 && cents < 20) {
        document.getElementById("tuneCircle").style.borderColor = "yellow";
    }
    else if (cents < -20 || cents > 20){
        document.getElementById("tuneCircle").style.borderColor = "red";
    }
}

var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function initTuner() {
    navigator.getUserMedia({ video: false, audio: true }, callback, console.log);
}

function callback(stream) {
    let ctx = new AudioContext();
    let mic = ctx.createMediaStreamSource(stream);
    let analyser = ctx.createAnalyser();
    ctx.sampleRate = 48000;
    mic.connect(analyser);
    
    let buffer = new Float32Array(analyser.frequencyBinCount);
    //let buffer = new Uint8Array(analyser.frequencyBinCount);

    function run() {
        // Fill up the wave data.
        analyser.getFloatTimeDomainData(buffer);
        //analyser.getByteTimeDomainData(buffer);
        let frequency = autoCorrelate(ctx.sampleRate, buffer);
        frequency = Math.floor(frequency * 100) / 100;

        if (!isNaN(frequency)) {
            freq.innerText = frequency.toFixed(2);
        }
        else {
            freq.innerText = "0";
        }

        var n =  noteFromPitch(frequency);

        if (!isNaN(n)) {
            note.innerText = noteStrings[Math.floor(n%12)];
        }
        else {
            note.innerText = "--";
        }

        if (!isNaN(frequency)) {
            detune_amt.innerText = centsOffFromPitch(frequency, n);
            backgroundCircleColor(detune_amt.innerText);
        }   
        else {
            detune_amt.innerText = "0";
            document.getElementById("tuneCircle").style.borderColor = "black";
        }

        requestAnimationFrame(run);
    }

    run();
}

function autoCorrelate(sampleRate, dataBuffer) {
    const BUFFER_SIZE = dataBuffer.length;
    const MAX_SAMPLES = Math.floor(BUFFER_SIZE * 0.5);    // For correlation we're gonna use the half size of the buffer (FFT SIZE)

    let bestOffset = 0;
    let smallestDifference = Number.POSITIVE_INFINITY;
    let lastDifference = Number.POSITIVE_INFINITY;
    let foundGoodDifference = false;
    var differences = new Array(MAX_SAMPLES);
    let rms = getRMS(dataBuffer);

    // Check the level of the signal. If we don't have enough signal we will return -1.
    if (rms < 0.01) {
        return (-1);
    }

    // Correlate the data in audio is not compare a half signal size with itself (delayed)
    // We must get the average difference and then we get the correlation
    for (let offset = 1; offset <= MAX_SAMPLES; offset++) {
        let difference = 0;

        for (let i = 0; i < MAX_SAMPLES; i++) {
            difference += Math.abs(dataBuffer[i] - dataBuffer[i + offset]); //Summing the amplitude diferences between each sample data
        }
        // Averaged or correlated difference. Is given by ifference summing divided by half of buffer size.
        //let correlation = 1 - (differenceSum / MAX_SAMPLES);
        difference = difference / MAX_SAMPLES;
        differences[offset] = difference;

        if (difference < 0.1 && difference < lastDifference) {
            foundGoodDifference = true;

            if (difference < smallestDifference) {
                smallestDifference = difference;
                bestOffset = offset;  
            }
        }
        else if (foundGoodDifference) {
            // short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
			// Now we need to tweak the offset - by interpolating between the values to the left and right of the
			// best offset, and shifting it a bit.  This is complex, and HACKY in this code (happy to take PRs!) -
			// we need to do a curve fit on correlations[] around best_offset in order to better determine precise
			// (anti-aliased) offset.
            var antiAliasedDifference = lerp(differences[bestOffset - 1], differences[bestOffset + 1], differences[bestOffset]);

            let res = sampleRate / (bestOffset - (antiAliasedDifference));  //12 is the number of chromatic notes;

            if (!isNaN(res)) {
                return(res);
            }
        }

        lastDifference = difference;
    }

    if (bestOffset > 1) {
        return (sampleRate / bestOffset);
    }
}

function getRMS(dataBuffer) {
    let rms;

    for (let i = 0; i < dataBuffer.length; i++)
        rms += Math.pow(dataBuffer[i], 2);

    rms = Math.sqrt(rms / dataBuffer.length);

    return (rms);
}

function noteFromPitch(frequency) {
	var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
	return (Math.round( noteNum ) + 69);
}

function frequencyFromNoteNumber(note) {
	return (440 * Math.pow(2,(note-69)/12));
}

function centsOffFromPitch(frequency, note) {
	return (Math.floor( 1200 * Math.log( frequency / frequencyFromNoteNumber( note ))/Math.log(2) ));
}

// método impreciso para calcular v = v1 quando t = 1 "floating-point arithimetic error" 
// Essa forma pode ser utilizada em hardware que possui intruções "Multiply-Add"
/*function lerp(v0, v1, t) {
    return v0 + t*(v1-v0);
}*/
  
// Método preciso que garante que v = v1 quando t = 1.
function lerp(v0, v1, t) {
    return (1-t)*v0 + t*v1;
}