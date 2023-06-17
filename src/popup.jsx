import React, { useRef, useState, useEffect } from "react";
import ReactDOM from 'react-dom';

function ToggleButton() {
  const handleClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: togglePlay,
      });
    });
  };

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

  return (
    <button id="toggleButton" onClick={handleClick}>
      Play Youtube
    </button>
  );
}
document.addEventListener('DOMContentLoaded', function () {
  const reactTargetBtn = document.getElementById('react-target-btn');
  if (reactTargetBtn) {
    // render ToggleButton to reactTarget
    ReactDOM.render(<ToggleButton />, reactTargetBtn);
  }
});
