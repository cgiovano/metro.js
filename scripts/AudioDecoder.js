// Decodes the audio from a file. The url of the file must be specified and the current audio context.
class AudioDecoder {
    constructor (audioContext, urlList) {
        this._audioContext = audioContext;
        this._urlList = urlList;
        this._decodedAudioDataList = [];

        this.decodeAudio();
    }

    // Returns the decoded audio data as an array.
    get decodedAudioDataList() {
        return (this._decodedAudioDataList);
    }

    // Read and Decode
    decodeAudio() {
        try {
            for (let i = 0; i < this._urlList.length; i++) {
                let request = new XMLHttpRequest();
                request.open('GET', this._urlList[i], true);
                request.responseType = 'arraybuffer';

                request.onload = () => this._audioContext.decodeAudioData(request.response, (buffer) => this._decodedAudioDataList[i] = buffer, (error) => console.log(error));

                request.send();
            }

            console.log("Sound sources were loaded succesfully!");
        }
        catch (error) {
            console.error("wasn't possible load sound sources!" + error);
        }
    }
}