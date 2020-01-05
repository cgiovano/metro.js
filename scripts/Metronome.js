class Metronome {
    constructor(beatsPerMinute, beatsPerBar, beatUnit) {
        const _URL_LIST = ['./assets/beep-one.wav', './assets/beep-two.wav'];

        this._beatUnit = beatUnit;
        this._beatsPerBar = beatsPerBar;
        this._beatsPerMinute = beatsPerMinute;
        this._isRunning = false;
        this._audioContext = new AudioContext();
        this._bufferSourceNode = undefined;

        let _audioDecoder = new AudioDecoder(this._audioContext, _URL_LIST);
        this._arrayBuffer = _audioDecoder.decodedAudioDataList;
    }
    
    // GETTERS
    get isRunning() {
        return (this._isRunning);
    }

    get beatsPerMinute() {
        return (this._beatsPerMinute);
    }

    get beatsPerBar() {
        return (this._beatsPerBar);
    }

    get beatUnit() {
        return (this._beatUnit);
    }

    //SETTERS
    set beatsPerMinute(newBeatsPerMinuteValue) {
        this._beatsPerMinute = newBeatsPerMinuteValue;
    }

    set beatsPerBar(newBeatsPerBarValue) {
        this._beatsPerBar = newBeatsPerBarValue;
    }

    set beatUnit(newBeatUnitValue) {
        this._beatUnit = newBeatUnitValue;
    }

    //Start the metronome
    start() {
        const METRONOME = this;
        let counter = 1;
        let timer;

        function run() {
            METRONOME._bufferSourceNode = METRONOME._audioContext.createBufferSource();
            
            if (counter == 1) {
                METRONOME._bufferSourceNode.buffer = METRONOME._arrayBuffer[0];
    
                if (counter == METRONOME._beatsPerBar)
                    counter = 0;
            }
            else {
                METRONOME._bufferSourceNode.buffer = METRONOME._arrayBuffer[1];
    
                if (counter == METRONOME._beatsPerBar)
                    counter = 0;
            }
    
            METRONOME._bufferSourceNode.connect(METRONOME._audioContext.destination);
            METRONOME._bufferSourceNode.start();
            counter++;

            if (METRONOME._isRunning) {
                timer = setTimeout(run, (60 / (METRONOME._beatsPerMinute * (METRONOME._beatUnit / 4))) * 1000);
                return;
            }
            else {
                METRONOME._bufferSourceNode.stop();
                METRONOME._bufferSourceNode.disconnect(METRONOME._audioContext.destination);
                clearTimeout(timer);
                counter = 1;
                return;
            }
        }

        METRONOME._isRunning ? METRONOME._isRunning = false : METRONOME._isRunning = true;

        run();
    }
}