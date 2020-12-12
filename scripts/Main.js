const BEATS_PER_BAR_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
const BEAT_UNIT_NOTE = [1, 2, 4, 8, 16, 32, 64];

let metronome = undefined;
let beatsPerBarArrayPos = 3;
let beatUnitArrayPos = 3;
let defaultValues = [60, 4, 2]; //beatsPerMinute, beatsPerBar, beatUnitArray index respectively.
let beatUnitArray = [1, 2, 4, 8, 16, 32, 64];

let togglePlay_button = document.getElementById('toggle-play');
let beatsPerMinute_range = document.getElementById('bpm-range');
let tempoMarking_display = document.getElementById('tempo-marking-display');
let beatsPerMinute_display = document.getElementById('beats-per-minute-display');

document.addEventListener('DOMContentLoaded', init(), false);

function init() {
    metronome = new Metronome(defaultValues[0], defaultValues[1], beatUnitArray[defaultValues[2]]);

    beatsPerMinute_range.value = defaultValues[0];
    beatsPerMinute_display.innerText = defaultValues[0].toString();
    beatsPerBar_display.innerText = defaultValues[1].toString();
    beatUnit_display.innerText = beatUnitArray[defaultValues[2]].toString();
    tempoMarking_display.innerText = getTempoMark(defaultValues[0]);

    opentabFirstOpen("metrojs");
}

function beatsPerBarSub_onClick() {
    beatsPerBarArrayPos--;
    metronome.beatsPerBar = BEATS_PER_BAR_ARRAY[beatsPerBarArrayPos];

    beatsPerBarSub_watcher(beatsPerBarArrayPos);
}

function beatsPerBarAdd_onClick() {
    beatsPerBarArrayPos++;
    metronome.beatsPerBar = BEATS_PER_BAR_ARRAY[beatsPerBarArrayPos];

    beatsPerBarAdd_watcher(beatsPerBarArrayPos);
}

function beatUnitSub_onClick() {
    beatUnitArrayPos--;
    metronome.beatUnit = beatUnitArray[beatUnitArrayPos];

    beatUnitSub_watcher(beatUnitArrayPos);
}

function beatUnitAdd_onClick() {
    beatUnitArrayPos++;
    metronome.beatUnit = beatUnitArray[beatUnitArrayPos];

    beatUnitAdd_watcher(beatUnitArrayPos);
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
    toggleButtonStyle(metronome.isRunning);
}