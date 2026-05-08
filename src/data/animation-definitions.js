export const ANIMATION_DEFINITIONS = {
  '@keyframes': {
    label: '@keyframes',
    definition:
      '@keyframes defines the intermediate steps of an animation. The browser interpolates between those keyframes over the animation timeline.',
    usage: `@keyframes pulseCard {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.08);
  }
}`,
  },
  animation: {
    label: 'animation',
    definition:
      'The animation shorthand connects a keyframe name with duration, timing, delay, iteration count, direction, fill mode, and play state.',
    usage: `.card {
  animation: pulseCard 1200ms ease-in-out 0ms infinite alternate both running;
}`,
  },
  'animation-timing-function': {
    label: 'animation-timing-function',
    definition:
      'animation-timing-function controls how the animation accelerates and decelerates between keyframes. You can also use steps() for discrete frame-like motion.',
    usage: `.card {
  animation-timing-function: steps(4, end);
}`,
  },
  'animation-direction': {
    label: 'animation-direction',
    definition:
      'animation-direction decides whether each cycle plays forward, backward, or alternates directions between iterations.',
    usage: `.card {
  animation-direction: alternate;
}`,
  },
  'animation-fill-mode': {
    label: 'animation-fill-mode',
    definition:
      'animation-fill-mode controls whether keyframe styles apply before the animation starts, after it ends, or both.',
    usage: `.card {
  animation-fill-mode: both;
}`,
  },
  opacity: {
    label: 'Opacity In Keyframes',
    definition:
      'Opacity is commonly animated inside @keyframes to build fades and depth shifts. It works well with transforms for subtle motion design.',
    usage: `@keyframes fadePulse {
  0% {
    opacity: 0.35;
    transform: scale(0.98);
  }

  100% {
    opacity: 1;
    transform: scale(1.05);
  }
}`,
  },
};