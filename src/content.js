// content.js
import React, { useRef, useState, useEffect } from "react";
import * as tf from "./tf.es2017";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";
import * as fp from "fingerpose";
import victory from "./victory.png";
import thumbs_up from "./thumbs_up.png";

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'playVideo') {
    playVideo();
  }
});

// Function to play the YouTube video
function playVideo() {
  const video = document.querySelector('video');
  if (video) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    setTimeout(() => {
      console.log('Hold a second');
    }, 1000);
  }
}



// Get access to the user's webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    console.log("---getUserMedia");
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();
    runHandpose(video);
  })
  .catch((error) => {
    console.error('Error accessing webcam:', error);
  });

// Function to process the video frames and detect fingers
function runHandpose(video) {
  // Load the handpose model
  handpose.load().then((net) => {
    console.log('Handpose model loaded.');

    // Start processing the video frames
    setInterval(() => {
      detect(net, video);
    }, 500);
  });
}

// Function to detect fingers
function detect(net, video) {
  console.log("---detect");
  if (typeof video !== 'undefined' && video.readyState === 4) {
    // Perform finger detection logic using the handpose model
    net.estimateHands(video).then((hands) => {
      if (hands.length > 0) {
        console.log("---hands:",hands);
        // Perform finger detection and trigger desired actions based on conditions
        // Replace this logic with your specific finger detection and action code
        const detectedFingers = performFingerDetection(hands[0]);
        console.log("---detectedFingers:", detectedFingers);
        if (detectedFingers === 'victory') {
          // Send message to the background script or trigger desired action
          chrome.runtime.sendMessage({ action: 'playbackButton', gesture: 'victory' });
        }
      }
    });
  }
}

// Function to perform finger detection logic
function performFingerDetection(hand) {
  // Replace this with your specific finger detection logic
  // You can use the landmarks of the hand to determine finger positions and gestures

  // Example: Detect victory gesture
  const thumbTip = hand.landmarks[4];
  const indexTip = hand.landmarks[8];
  const middleTip = hand.landmarks[12];
  const ringTip = hand.landmarks[16];
  const pinkyTip = hand.landmarks[20];

  // Assuming victory gesture is when thumb and index finger are extended
  if (
    thumbTip[1] < indexTip[1] &&
    indexTip[1] < middleTip[1] &&
    middleTip[1] < ringTip[1] &&
    ringTip[1] < pinkyTip[1]
  ) {
    return 'victory';
  }

  // Add more finger detection conditions as needed

  return null;
}