import { initProcessTimeline } from './process-timeline.js';

initProcessTimeline({ reduceMotion: matchMedia('(prefers-reduced-motion: reduce)') });
