document.addEventListener('DOMContentLoaded', function () {
  var toggleButton = document.getElementById('toggleButton');

  toggleButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: togglePlay
      });
    });
  });

  function togglePlay() {
    var video = document.querySelector('video');
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  }
});
