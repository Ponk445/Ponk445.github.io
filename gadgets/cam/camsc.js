let currentStream;

navigator.mediaDevices.getUserMedia({
  video: {
    facingMode: 'environment'
  }
})
.then(function(stream) {
  var video = document.querySelector('video');
  video.srcObject = stream;
  video.onloadedmetadata = function(e) {
    video.play();
  };
  currentStream = stream;
})
.catch(function(err) {
  console.log(err.name + ": " + err.message);
});

const switchButton = document.getElementById('switch');
switchButton.addEventListener('click', function() {
  if (currentStream) {
    currentStream.getTracks().forEach(function(track) {
      track.stop();
    });
  }

  // Switch to the next camera in the list
  navigator.mediaDevices.enumerateDevices()
 .then(function(devices) {
    let videoDevices = devices.filter(device => device.kind === 'videoinput');
    let currentIndex = videoDevices.findIndex(device => device.deviceId === currentStream.getVideoTracks()[0].getSettings().deviceId);
    let nextIndex = (currentIndex + 1) % videoDevices.length;
    let nextConstraints = {
      video: {
        facingMode: { exact: 'user' }
      }
    };

    navigator.mediaDevices.getUserMedia(nextConstraints)
   .then(function(stream) {
      var video = document.querySelector('video');
      video.srcObject = stream;
      video.onloadedmetadata = function(e) {
        video.play();
      };
      currentStream = stream;
    })
   .catch(function(err) {
      console.log(err.name + ": " + err.message);
    });
  });
});