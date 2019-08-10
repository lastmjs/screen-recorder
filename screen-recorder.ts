document.querySelector('#start-recording-button').addEventListener('click', () => {
    startRecording();
});

document.querySelector('#stop-recording-button').addEventListener('click', () => {
    stopRecording();
});


let recorder;
let recording = false;
let combinedStream;

async function startRecording() {
    try {
        const audioStream = await window.navigator.mediaDevices.getUserMedia({
            audio: true
        });
        const videoStream = await window.navigator.mediaDevices.getDisplayMedia();
    
        combinedStream = new MediaStream([...audioStream.getTracks(), ...videoStream.getTracks()]);

        recorder = new window.MediaRecorder(combinedStream);

        recorder.addEventListener('dataavailable', (e) => {
            const link = document.createElement('a');
            link.setAttribute('href', window.URL.createObjectURL(e.data));
            link.setAttribute('download', `${new Date()}.webm`);
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
        
        recorder.start();
    }
    catch(error) {
        alert(error);
        console.log(error);
    }
}

async function stopRecording() {
    recorder.stop();
    combinedStream.getTracks().forEach((track) => {
        track.stop();
    })
}