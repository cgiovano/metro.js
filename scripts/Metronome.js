class Metronome {
    constructor(beatsPerMinute, beatsPerBar, beatUnit) {
        this._beatUnit = beatUnit;
        this._beatsPerBar = beatsPerBar;
        this._beatsPerMinute = beatsPerMinute;
        this.tempoMarkList = ["Grave", "Larghissimo", "Largo", "Larghetto", "Adagio", "Adagietto","Andantino", "Marcia Moderato", "Andante", "Andante Moderato", "Moderato", "Allegro Moderato", "Allegro ma non troppo", "Allegro", "Vivace", "Vivacissimo", "Alegricissimo", "Presto", "Prestissimo"];
        
        this.arrayBuffer = [];
        this.isRunning = false;
        this.counter = 1;
        this.audioContext = new AudioContext();
        this.bufferSourceNode = undefined;

        this.readFileAsArrayBuffer();
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
     * @param {Number} "new beatUnit value"
     */
    set beatUnit(newBeatUnitValue) {
        this._beatUnit = newBeatUnitValue;
    }

    // Main
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

    getTempoMark() {
        switch(true) {
            case (this.beatsPerMinute >= 20 && this.beatsPerMinute < 40):
                return (this.tempoMarkList[0]);
                break;
            case (this.beatsPerMinute >= 40 && this.beatsPerMinute < 45):
                return (this.tempoMarkList[1]);
                break;
            case (this.beatsPerMinute >= 45 && this.beatsPerMinute < 50):
                return (this.tempoMarkList[2]);
                break;
            case (this.beatsPerMinute >= 50 && this.beatsPerMinute < 55):
                return (this.tempoMarkList[3]);
                break;
            case (this.beatsPerMinute >= 55 && this.beatsPerMinute < 65):
                return (this.tempoMarkList[4]);
                break;
            case (this.beatsPerMinute >= 65 && this.beatsPerMinute < 70):
                return (this.tempoMarkList[5]);
                break;
            case (this.beatsPerMinute >= 70 && this.beatsPerMinute < 108):
                return (this.tempoMarkList[8]);
                break;
            case (this.beatsPerMinute >= 108 && this.beatsPerMinute < 112):
                return (this.tempoMarkList[10]);
                break;
            case (this.beatsPerMinute >= 112 && this.beatsPerMinute < 116):
                return (this.tempoMarkList[11]);
                break;
            case (this.beatsPerMinute >= 116 && this.beatsPerMinute < 120):
                return (this.tempoMarkList[12]);
                break;
            case (this.beatsPerMinute >= 120 && this.beatsPerMinute < 140):
                return (this.tempoMarkList[13]);
                break;
            case (this.beatsPerMinute >= 140 && this.beatsPerMinute < 160):
                return (this.tempoMarkList[14]);
                break;
            case (this.beatsPerMinute >= 160 && this.beatsPerMinute < 170):
                return (this.tempoMarkList[15]);
                break;
            case (this.beatsPerMinute >= 170 && this.beatsPerMinute < 180):
                return (this.tempoMarkList[16]);
                break;
            case (this.beatsPerMinute >= 180 && this.beatsPerMinute < 200):
                return (this.tempoMarkList[17]);
                break;
            case (this.beatsPerMinute >= 200):
                return (this.tempoMarkList[18]);
                break;
            default:
                return ("unknown tempo mark");
                break;
        }
    }

    // Load Sound Sources
    readFileAsArrayBuffer() {
        let urlList = ['./assets/beep-one.wav', './assets/beep-two.wav'];

        try {
            for (let i = 0; i < 2; i++) {
                let request = new XMLHttpRequest();
                request.open('GET', urlList[i], true);
                request.responseType = 'arraybuffer';

                request.onload = () => this.audioContext.decodeAudioData(request.response, (buffer) => this.arrayBuffer[i] = buffer, (error) => console.log(error));

                request.send();
            }

            //DEBUG
            console.log("Sound sources were loaded succesfully!");
        }
        catch (error) {
            console.error("wasn't possible load sound sources!" + error);
        }
    }
}