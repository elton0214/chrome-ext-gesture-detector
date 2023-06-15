// // Immediately-invoked function expression (IIFE) to encapsulate the code
// (() => {
//   let youtubeLeftControls, youtubePlayer;
//   let currentVideo = "";
//   let currentVideoBookmarks = [];


//   // const addNewBookmarkEventHandler = async () => {
    
//   //   const currentTime = youtubePlayer.currentTime;
//   //   const newBookmark = {
//   //     time: currentTime,
//   //     desc: "Bookmark at " + getTime(currentTime),
//   //   };

//   //   // Fetch existing bookmarks
//   //   currentVideoBookmarks = await fetchBookmarks();

//   //   // Save an updated array of bookmarks (currentVideoBookmarks with newBookmark added) to the synchronized storage
//   //   chrome.storage.sync.set({
//   //     [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
//   //   });
//   // };

//   // Listener for messages from the extension (from the background.js and popup.js)
//   chrome.runtime.onMessage.addListener((obj, sender, response) => {
//     // Destructing the message
//     const { type, value, videoId } = obj;

//       youtubePlayer.currentTime = value;

//   });

//   // Call newVideoLoaded when the page loads
//   newVideoLoaded();
// })();

// // Function to format time
// const getTime = t => {
//   var date = new Date(0);
//   date.setSeconds(t);

//   return date.toISOString().substr(11, 8);
// };
