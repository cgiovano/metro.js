class AudioDecoder {
    /**
     * Decode the audio from files specified to audio buffer.
     * @param {AudioContext} audioContext The current audio context to be used.
     * @param {Array} urlList The relative path of the audio files to be decoded.
     */
    constructor (audioContext, urlList) {
        this._audioContext = audioContext;
        this._urlList = urlList;
        this._decodedAudioDataList = [];

        this.decodeAudio();
    }


    get decodedAudioDataList() {
        return (this._decodedAudioDataList);
    }

    decodeAudio() {
        try {
            for (let i = 0; i < this._urlList.length; i++) {
                let request = new XMLHttpRequest();
                request.open('GET', this._urlList[i], true);
                request.responseType = 'arraybuffer';

                request.onload = () => this._audioContext.decodeAudioData(request.response, (buffer) => this._decodedAudioDataList[i] = buffer, (error) => console.log(error));

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