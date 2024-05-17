let mediaRecorder;
let recordedBlobs = [];

// Check if the MediaDevices API is supported
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Get the user's microphone
  navigator.mediaDevices.getUserMedia({ audio: true })
 .then(stream => {
      // Create a new MediaRecorder object
      mediaRecorder = new MediaRecorder(stream);

      // Add an event listener for the start button
      document.getElementById('start').addEventListener('click', () => {
        // Start the recording
        mediaRecorder.start();
        recordedBlobs = []; // Reset the recorded blobs array
      });

      // Add an event listener for the stop button
      document.getElementById('stop').addEventListener('click', () => {
        // Stop the recording
        mediaRecorder.stop();
      });

      // Add an event listener for the dataavailable event
      mediaRecorder.ondataavailable = (event) => {
        // Collect the recorded audio blobs
        recordedBlobs.push(event.data);
      };

      // Add an event listener for the stop event
      mediaRecorder.onstop = () => {
        // Create a new Blob object from the recorded audio blobs
        const audioBlob = new Blob(recordedBlobs, { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const recordedAudio = document.getElementById('recordedAudio');
        recordedAudio.src = audioUrl;
      };
    })
 .catch(error => {
      console.error('Error accessing microphone:', error);
    });
} else {
  console.error('MediaDevices API not supported');
}

document.getElementById('save').addEventListener('click', () => {
  // Prompt the user for a file name
  const fileName = prompt("Save as:", "recorded_audio");
  
  // Save the recorded audio as an MP3 file
  const audioBlob = new Blob(recordedBlobs, { type: 'audio/mp3' });
  const url = URL.createObjectURL(audioBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.mp3`;
  a.click();
  URL.revokeObjectURL(url);
});