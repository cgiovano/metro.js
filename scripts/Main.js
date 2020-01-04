
let togglePlay_button = document.getElementById('toggle-play');
let beatsPerMinute_range = document.getElementById('bpm-range');
let beatsPerMinute_display = document.getElementById('beats-per-minute-display');
let beatsPerBar_display = document.getElementById('beats-per-bar-display');
let beatUnit_display = document.getElementById('beat-unit-display');
let beatsPerBarSub_button = document.getElementById('beats-per-bar-sub');
let beatsPerBarAdd_button = document.getElementById('beats-per-bar-add');
let beatUnitSub_button = document.getElementById('beat-unit-sub');
let beatUnitAdd_button = document.getElementById('beat-unit-add');
let tempoMarking_display = document.getElementById('tempo-marking-display');

let metronome = undefined;

let defaultValues = [60, 4, 2]; //beatsPerMinute, beatsPerBar, beatUnitArray index respectively.
let beatUnitArray = [1, 2, 4, 8, 16, 32, 64];

let beatsPerBarCounter = defaultValues[1];
let beatUnitArrayPos = defaultValues[2];

document.addEventListener('DOMContentLoaded', init(), false);

function init() {
    metronome = new metronome(defaultValues[0], defaultValues[1], beatUnitArray[defaultValues[2]]);

    beatsPerMinute_range.value = defaultValues[0];
    beatsPerMinute_display.innerText = defaultValues[0].toString();
    beatsPerBar_display.innerText = defaultValues[1].toString();
    beatUnit_display.innerText = beatUnitArray[defaultValues[2]].toString();
    tempoMarking_display.innerText = getTempoMark(defaultValues[0]);
    togglePlay_button.style["background-color"] = "#32a852";
}

function beatsPerBarSub_onClick() {
    beatsPerBarCounter--;
    beatsPerBar_display.innerText = beatsPerBarCounter;
    metronome.beatsPerBar = beatsPerBarCounter;

    if (beatsPerBarCounter == 1)
        beatsPerBarSub_button.disabled = true;
    else if (beatsPerBarCounter < 30 && beatsPerBarAdd_button.disabled == true)
        beatsPerBarAdd_button.disabled = false;
}

function beatsPerBarAdd_onClick() {
    beatsPerBarCounter++;
    beatsPerBar_display.innerText = beatsPerBarCounter;
    metronome.beatsPerBar = beatsPerBarCounter;

    if (beatsPerBarCounter == 30)
        beatsPerBarAdd_button.disabled = true;
    else if (beatsPerBarCounter > 1 && beatsPerBarSub_button.disabled == true)
        beatsPerBarSub_button.disabled = false;
}

function beatUnitSub_onClick() {
    beatUnitArrayPos--;
    beatUnit_display.innerText = beatUnitArray[beatUnitArrayPos].toString();
    metronome.beatUnit = beatUnitArray[beatUnitArrayPos];

    if (beatUnitArrayPos == 0)
        beatUnitSub_button.disabled = true;
    else if (beatUnitArrayPos < beatUnitArray.length - 1 && beatUnitAdd_button.disabled == true)
        beatUnitAdd_button.disabled = false;
}

function beatUnitAdd_onClick() {
    beatUnitArrayPos++;
    beatUnit_display.innerText = beatUnitArray[beatUnitArrayPos].toString();
    metronome.beatUnit = beatUnitArray[beatUnitArrayPos];

    if (beatUnitArrayPos == beatUnitArray.length - 1)
        beatUnitAdd_button.disabled = true;
    else if (beatUnitArrayPos > 0 && beatUnitSub_button.disabled == true)
        beatUnitSub_button.disabled = false;
}

function bpmRange_onInput() {
    metronome.beatsPerMinute = beatsPerMinute_range.value;
    beatsPerMinute_display.innerText = beatsPerMinute_range.value;

    if (tempoMarking_display.innerText == getTempoMark(beatsPerMinute_range.value))
        return;
    else
        tempoMarking_display.innerText = getTempoMark(beatsPerMinute_range.value);
}

function togglePlay_onClick(){
    metronome.start();

    if (metronome.isRunning) {
        togglePlay_button.innerText = 'Stop';
        togglePlay_button.style["background-color"] = "#de4040";
    }
    else {
        togglePlay_button.innerText = 'Start';
        togglePlay_button.style["background-color"] = "#32a852";
    }
}