navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

let freq = document.getElementById("pitch");

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

    function run() {
        // Fill up the wave data.
        analyser.getFloatTimeDomainData(buffer);
        let frequency = autoCorrelate(ctx.sampleRate, buffer);
        frequency = Math.floor(frequency * 100) / 100;

        freq.innerText = frequency.toFixed(2);

        requestAnimationFrame(run);
    }

    run();
}

function autoCorrelate(sampleRate, dataBuffer) {
    const BUFFER_SIZE = dataBuffer.length;
    const MAX_SAMPLES = Math.floor(BUFFER_SIZE * 0.5);    // For correlation we're gonna use the half size of the buffer (FFT SIZE)

    let bestOffset = 0;
    let smallestDifference = Number.POSITIVE_INFINITY;
    let rms = GetRMS(dataBuffer);

    // Check the level of the signal. If we don't have enough signal we will return -1.
    if (rms < 0.01) {
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

function GetRMS(dataBuffer) {
    let rms;

    for (let i = 0; i < dataBuffer.length; i++)
        rms += Math.pow(dataBuffer[i], 2);

    rms = Math.sqrt(rms / dataBuffer.length);

    return (rms);
}