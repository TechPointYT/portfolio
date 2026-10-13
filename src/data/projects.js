// All project content lives here. Adding a project only means adding an entry.
//
// Each project gets a full section, in the order listed. Fields (status optional):
//   loops:  short phone-screen clips shown side by side. `audio: true` adds a sound toggle.
//   full:   the walkthrough opened in a dialog: { youtube: "<video id>", length } for a YouTube
//           embed, or { src, poster, length } for a video file in public/media/. Optional.
//   story:  write-up paragraphs. Optional.
//   stack:  "Built with" tags. Optional.
//
// Media paths point into public/media/. Keep them relative (no leading slash)
// so the site works on GitHub Pages under any repo name.
export const projects = [
  {
    id: 'storybook',
    title: 'Storybook',
    summary:
      'A kid draws a character, turns the page, and watches it star in its own animated fairy tale.',
    loops: [
      { src: 'media/loop-drawing.mp4', caption: 'Draw your hero' },
      { src: 'media/loop-pageturn.mp4', caption: 'Turn the page' },
      { src: 'media/loop-firstpage.mp4', caption: 'The story begins', audio: true },
    ],
    // YouTube Short: youtube.com/shorts/rxxB7gW4buw
    full: { youtube: 'rxxB7gW4buw', length: '2:25' },
    story: [
      "I wanted a child's drawing to come to life without being replaced. The generated character keeps the shape and soul of what they drew, and only adds color and polish so they see their own idea more clearly.",
      'Claude reads the drawing and writes the fairy tale, the narration, and a prompt for each scene. Runway generates and animates the visuals. A page-turn is the one moment that brings the character to life, and a little magic animation covers the wait while the world is made.',
      "PlantBuddy was my first taste of Runway. With Storybook, I wanted to see how far its public models could go with something personal, so I built it as a proof of concept. I also made the opening book animation myself in Rive.",
    ],
    stack: ['React Native', 'Redux', 'Runway API', 'Claude API', 'Rive'],
  },
  {
    id: 'plantbuddy',
    title: 'PlantBuddy',
    status: 'Proof of concept',
    summary:
      "Point your camera at a plant, and it tells you what it is, then pins the answer right onto the plant.",
    loops: [
      { src: 'media/plantbuddy-loop-scan.mp4', caption: 'Point it at a plant' },
      { src: 'media/plantbuddy-loop-identify.mp4', caption: 'Let it think' },
      { src: 'media/plantbuddy-loop-anchor.mp4', caption: 'The label stays put' },
    ],
    // YouTube Short: youtube.com/shorts/c5eAifIbY68
    full: { youtube: 'c5eAifIbY68', length: '0:49' },
    story: [
      "I love plants, and I wanted to build something around that. PlantBuddy started as an idea I couldn't shake: what if your phone could look at a plant and tell you what it is, right there in the world? I built it to see if I could, and it's one of the things I'm proudest of.",
      "You point the camera at a plant and it identifies it. I didn't want it confidently telling people the wrong thing, so it checks against two dedicated plant engines, Pl@ntNet and Kindwise, instead of one general model. The answer is pinned to the plant in AR and stays put as you walk around. It can also diagnose a struggling plant and explain the problem with a short animation made with Runway. That was my first real attempt at making something with Runway. I wanted to get my hands on their tools, and this gave me a reason to. I also made the PlantBuddy logo and the app's animations with Runway.",
      "It's Android-first in React Native and TypeScript, with an event-driven Redux store, a repository layer for networking, and ViroReact for AR.",
    ],
    stack: ['React Native', 'TypeScript', 'Expo', 'Redux', 'ViroReact', 'Pl@ntNet', 'Kindwise', 'Runway'],
  },
];
