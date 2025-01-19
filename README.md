## About the Project
"Keep My Wife's Name Out Your Fkn Mouth" is the multiplayer game you didn’t know you needed. It lets you challenge your friends to epic virtual slap battles without the risk of losing teeth or friendships! Imagine the thrill of slapping your bestie into next Tuesday, live streaming the chaos on StreamPlace, and watching the internet cheer—or roast—you in real-time. Think of it as combining the intensity of a UFC fight with the humor of a comedy roast, minus the medical bills.

## What Inspired Us
The internet loves slap battles—those viral videos that make you laugh and question humanity at the same time. We thought, “Why let only professional slap artists have all the fun?” So, we decided to create a safe, interactive way to slap your friends silly while giving the world front-row seats to the showdown. It’s about settling petty rivalries, flexing your dodging skills, and proving who’s the slap champion—all without getting a concussion.

## How we built it
- MediaPipe: Used for detecting facial landmarks and hand skeletons to construct real-time models for further analysis. Provided by Google, this framework was instrumental in building the foundation for facial and hand tracking.

- Next.js: Integrated the frontend with the smart contracts and machine learning models for facial detection. Centralized all application logic, enabling seamless interaction between users and backend systems.

- WebRTC (Peer-to-Peer Connection): Implemented from scratch to enable live video calls between users. Ensured minimal latency during gameplay while overlaying skeleton models on top of users' faces.

- Express.js and Socket.IO: Facilitated synchronization of keypoints and shared data across players. Enabled real-time communication for a smooth multiplayer experience.

- Render.com: Used for deploying the backend server to ensure reliable and scalable performance.

- Vercel: Deployed the frontend application, ensuring fast and consistent delivery of the user interface.

- Solidity and Hardhat: Developed smart contracts, including BidFactory and Bid, to handle bidding logic securely. Utilized Chai and Mocha for rigorous testing of smart contracts. Implemented an RPC protocol to connect the smart contracts with the frontend seamlessly.

- Stream.place: Enabled live streaming of the game directly on the website. Provided players and spectators with a seamless and interactive viewing experience.
Here’s a cleaner and more polished version for the README:

---

## What We Learned
Building "Keep My Wife's Name Out Your Fkn Mouth" taught us valuable lessons:

- *Mastering Real-Time Gameplay:* We honed our skills in latency reduction to ensure every slap and dodge happens instantly.  
- *Efficient ML Integration:* Managing heavy machine learning models was key to keeping the game smooth and responsive.  
- *Seamless Synchronization:* Syncing two players in real-time required innovative data handling to maintain flawless gameplay.

---

## Challenges We Faced

### *Video Sharing and Latency*
*The Problem:* StreamPlace’s video sharing introduced a 5–6 second delay—way too long for a real-time game.  
*Our Solution:* We built a custom WebRTC setup, cutting latency to deliver every slap in crisp, real-time action.

### *Tracking Two Players*
*The Problem:* Running 8 ML models simultaneously (for tracking faces and hands) overwhelmed devices.  
*Our Solution:* Each device tracks its own player and syncs movements with the opponent via WebSockets, reducing lag and improving performance.

### *Keeping Gameplay in Sync*
*The Problem:* Even minor desyncs turned fast-paced slapping into awkward slap ballets.  
*Our Solution:* Real-time data exchange with WebSockets kept both players perfectly aligned.

---

## The Experience
"Keep My Wife's Name Out Your Fkn Mouth" is more than a game—it’s a hilariously competitive arena. Whether you’re settling sibling rivalries, challenging friends, or entertaining your group chat with live matches, it’s all about chaotic fun. Grab a friend and get slapping!

--- 

This version is concise, easy to read, and engaging while maintaining a professional tone.

## What’s Next?
We’re working on making it even better with features like slap customization (pineapple hand, anyone?), in-game challenges, and real-time audience reactions during streams. Virtual Power Slap is here to turn friendly rivalries into internet gold. So, gather your friends, warm up those virtual hands, and let the slapping begin!
