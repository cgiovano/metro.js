class Metronome {
    constructor(beatsPerMinute, beatsPerBar, beatUnit) {
        const urlList = ['./assets/beep-one.wav', './assets/beep-two.wav'];

        this._beatUnit = beatUnit;
        this._beatsPerBar = beatsPerBar;
        this._beatsPerMinute = beatsPerMinute;

        this.isRunning = false;
        this.counter = 1;
        this.audioContext = new AudioContext();
        this.bufferSourceNode = undefined;

        let audioDecoder = new AudioDecoder(this.audioContext, urlList);
        this.arrayBuffer = audioDecoder.decodedAudioDataList;
    }
    // GETTERS
    get currentState() {
        return (this.isRunning);
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
    /**
     * @param {Number} "new beatsPerMinute value"
     */
    set beatsPerMinute(newBeatsPerMinuteValue) {
        this._beatsPerMinute = newBeatsPerMinuteValue;
    }

    /**
     * @param {Number} "new beatsPerBar value"
     */
    set beatsPerBar(newBeatsPerBarValue) {
        this._beatsPerBar = newBeatsPerBarValue;
    }

    /**
     * Set the new value for beat interval
     * @param {Number} newBeatUnitValue new value for BeatUnit
     */
    set beatUnit(newBeatUnitValue) {
        this._beatUnit = newBeatUnitValue;
    }

    /**
     * Start the metronome main function.
     */
    task() {
        const m = this;
        let t;

        function start() {
            m.bufferSourceNode = m.audioContext.createBufferSource();
            
            if (m.counter == 1) {
                m.bufferSourceNode.buffer = m.arrayBuffer[0];
    
                if (m.counter == m._beatsPerBar)
                    m.counter = 0;
            }
            else {
                m.bufferSourceNode.buffer = m.arrayBuffer[1];
    
                if (m.counter == m._beatsPerBar)
                    m.counter = 0;
            }
    
            m.bufferSourceNode.connect(m.audioContext.destination);
            m.bufferSourceNode.start();
            m.counter++;

            if (m.isRunning) {
                t = setTimeout(start, (60 / (m._beatsPerMinute * (m._beatUnit / 4))) * 1000);
                return;
            }
            else {
                m.bufferSourceNode.stop();
                m.bufferSourceNode.disconnect(m.audioContext.destination);
                m.counter = 1;
                clearTimeout(t);
                return;
            }
        }

        m.isRunning ? m.isRunning = false : m.isRunning = true;

        start();
    }
}