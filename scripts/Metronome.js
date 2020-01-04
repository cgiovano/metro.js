class metronome {
    /**
     * Creates a new metronome.
     * @param {Number} beatsPerMinute The value of beats per minute to be played.
     * @param {Number} beatsPerBar The value of beats that one bar should have.
     * @param {Number} beatUnit The rhythm figure that will represent the beat. The values must be 1, 2, 4, 8, 16, 32 or 64.
     */
    constructor(beatsPerMinute, beatsPerBar, beatUnit) {
        const _urlList = ['./assets/beep-one.wav', './assets/beep-two.wav'];

        this._beatUnit = beatUnit;
        this._beatsPerBar = beatsPerBar;
        this._beatsPerMinute = beatsPerMinute;

        this._isRunning = false;
        this._audioContext = new AudioContext();
        this._bufferSourceNode = undefined;

        let _audioDecoder = new AudioDecoder(this._audioContext, _urlList);
        this._arrayBuffer = _audioDecoder.decodedAudioDataList;
    }
    
    // GETTERS

    /**
     * Returns the current metronome state.
     */
    get isRunning() {
        return (this._isRunning);
    }

    /**
     * Returns the beats per minute.
     */
    get beatsPerMinute() {
        return (this._beatsPerMinute);
    }

    /**
     * Returns the beats per bar.
     */
    get beatsPerBar() {
        return (this._beatsPerBar);
    }

    /**
     * Returns the beat unit.
     */
    get beatUnit() {
        return (this._beatUnit);
    }

    //SETTERS

    /**
     * Sets the new beats per minute value.
     * @param {Number} beatsPerMinute
     */
    set beatsPerMinute(newBeatsPerMinuteValue) {
        this._beatsPerMinute = newBeatsPerMinuteValue;
    }

    /**
     * Sets the new beats per bar value.
     * @param {Number} beatsPerBar
     */
    set beatsPerBar(newBeatsPerBarValue) {
        this._beatsPerBar = newBeatsPerBarValue;
    }

    /**
     * Sets the new value for beat interval.
     * @param {Number} newBeatUnitValue
     */
    set beatUnit(newBeatUnitValue) {
        this._beatUnit = newBeatUnitValue;
    }

    /**
     * Start the metronome main function.
     */
    start() {
        const m = this;
        let counter = 1;
        let t;

        function run() {
            m._bufferSourceNode = m._audioContext.createBufferSource();
            
            if (counter == 1) {
                m._bufferSourceNode.buffer = m._arrayBuffer[0];
    
                if (counter == m._beatsPerBar)
                    counter = 0;
            }
            else {
                m._bufferSourceNode.buffer = m._arrayBuffer[1];
    
                if (counter == m._beatsPerBar)
                    counter = 0;
            }
    
            m._bufferSourceNode.connect(m._audioContext.destination);
            m._bufferSourceNode.start();
            counter++;

            if (m._isRunning) {
                t = setTimeout(run, (60 / (m._beatsPerMinute * (m._beatUnit / 4))) * 1000);
                return;
            }
            else {
                m._bufferSourceNode.stop();
                m._bufferSourceNode.disconnect(m._audioContext.destination);
                counter = 1;
                clearTimeout(t);
                return;
            }
        }

        m._isRunning ? m._isRunning = false : m._isRunning = true;

        run();
    }
}