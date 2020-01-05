let beatsPerBar_display = document.getElementById('beats-per-bar-display');
let beatUnit_display = document.getElementById('beat-unit-display');
let beatsPerBarSub_button = document.getElementById('beats-per-bar-sub');
let beatsPerBarAdd_button = document.getElementById('beats-per-bar-add');
let beatUnitSub_button = document.getElementById('beat-unit-sub');
let beatUnitAdd_button = document.getElementById('beat-unit-add');

function beatsPerBarSub_watcher(arrayPos) {
    beatsPerBar_display.innerText = BEATS_PER_BAR_ARRAY[arrayPos];   //mudar

    if (arrayPos == 0)
        beatsPerBarSub_button.disabled = true;
    else if (BEATS_PER_BAR_ARRAY[arrayPos] < 30 && beatsPerBarAdd_button.disabled == true)
        beatsPerBarAdd_button.disabled = false;
}

function beatsPerBarAdd_watcher(arrayPos) {
    beatsPerBar_display.innerText = BEATS_PER_BAR_ARRAY[arrayPos];

    if (BEATS_PER_BAR_ARRAY[arrayPos] == 30)
        beatsPerBarAdd_button.disabled = true;
    else if (BEATS_PER_BAR_ARRAY[arrayPos] > 1 && beatsPerBarSub_button.disabled == true)
        beatsPerBarSub_button.disabled = false;
}

function beatUnitSub_watcher(arrayPos) {
    beatUnit_display.innerText = beatUnitArray[arrayPos].toString();

    if (arrayPos == 0)
        beatUnitSub_button.disabled = true;
    else if (arrayPos < beatUnitArray.length - 1 && beatUnitAdd_button.disabled == true)
        beatUnitAdd_button.disabled = false;
}

function beatUnitAdd_watcher(arrayPos) {
    beatUnit_display.innerText = beatUnitArray[arrayPos].toString();

    if (arrayPos == beatUnitArray.length - 1)
        beatUnitAdd_button.disabled = true;
    else if (arrayPos > 0 && beatUnitSub_button.disabled == true)
        beatUnitSub_button.disabled = false;
}

function toggleButtonStyle(isRunning) {
    if (metronome.isRunning) {
        togglePlay_button.innerText = 'Stop';
        togglePlay_button.style["background-color"] = "#de4040";
    }
    else {
        togglePlay_button.innerText = 'Start';
        togglePlay_button.style["background-color"] = "#32a852";
    }
}