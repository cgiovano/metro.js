navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

let freq = document.getElementById("pitch");
let note = document.getElementById("note");
let detune_amt = document.getElementById("detune_amt");

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
        freq.innerText = frequency.toFixed(2);

        var n =  noteFromPitch(frequency);

        note.innerText = noteStrings[Math.floor(n%12)];//noteStrings[n];

        detune_amt.innerText = centsOffFromPitch(frequency, n);

        requestAnimationFrame(run);
    }

    run();
}

function autoCorrelate(sampleRate, dataBuffer) {
    const BUFFER_SIZE = dataBuffer.length;
    const MAX_SAMPLES = Math.floor(BUFFER_SIZE * 0.5);    // For correlation we're gonna use the half size of the buffer (FFT SIZE)

    let bestOffset = 0;
    let smallestDifference = Number.POSITIVE_INFINITY;
    let rms = getRMS(dataBuffer);

    // Check the level of the signal. If we don't have enough signal we will return -1.
    if (rms < 0.001) {
        return (-1);
    }

    // Correlate the data in audio is not compare a half signal size with itself (delayed)
    // We must get the average difference and then we get the correlation
    for (let offset = 1; offset < MAX_SAMPLES; offset++) {
        let difference = 0;

        for (let i = 0; i < MAX_SAMPLES; i++) {
            difference += Math.abs(dataBuffer[i] - dataBuffer[i + offset]); //Summing the amplitude diferences between each sample data
        }
        // Averaged or correlated difference. Is given by ifference summing divided by half of buffer size.
        //let correlation = 1 - (differenceSum / MAX_SAMPLES);
        difference /= MAX_SAMPLES;

        if (difference < 0.1) {
            if (difference < smallestDifference) {
                smallestDifference = difference;
                bestOffset = offset;  
            }

            if (bestOffset > 1) {
                return (sampleRate / bestOffset);
            }
        }
    }
}

function getRMS(dataBuffer) {
    let rms;

    for (let i = 0; i < dataBuffer.length; i++)
        rms += Math.pow(dataBuffer[i], 2);

    rms = Math.sqrt(rms / dataBuffer.length);

    return (rms);
}

function noteFromPitch( frequency ) {
	var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
	return Math.round( noteNum ) + 69;
}

function frequencyFromNoteNumber( note ) {
	return 440 * Math.pow(2,(note-69)/12);
}

function centsOffFromPitch( frequency, note ) {
	return Math.floor( 1200 * Math.log( frequency / frequencyFromNoteNumber( note ))/Math.log(2) );
}