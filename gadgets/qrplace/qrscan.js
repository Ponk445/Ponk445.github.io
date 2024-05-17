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

const canvas = document.getElementById('canvas');
const qrCodeMessage = document.getElementById('qrCodeMessage');
const scanner = new Instascan.Scanner({ video: document.querySelector('video') });

scanner.addListener('scan', function(content) {
  const scanResult = document.createElement('div');
  scanResult.textContent = 'Scanned: ' + content;
  qrCodeMessage.appendChild(scanResult);
});

scanner.start(currentStream);
const context = canvas.getContext('2d');
setInterval(() => {
  context.drawImage(document.querySelector('video'), 0, 0, canvas.width, canvas.height);
}, 1000 / 30);