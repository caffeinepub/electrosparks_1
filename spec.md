# Specification

## Summary
**Goal:** Replace the static phoenix image in `PhoenixIntro.tsx` with a video animation (`phoenix.mp4`) synced with a sound effect (`phoenix-sound.mp3`), and coordinate text animations with the video playback.

**Planned changes:**
- Remove the static phoenix bird image from `PhoenixIntro.tsx`
- Add an HTML5 `<video>` element sourced from `frontend/public/assets/phoenix.mp4` that autoplays muted, is centered on screen, fades in smoothly, and has a fiery orange/red radial glow effect
- Add an HTML5 `<audio>` element sourced from `frontend/public/assets/phoenix-sound.mp3` with volume 0.5 and no looping; play it when the video's `onplay` event fires and stop/reset it on `onended`
- Unmute the video when it starts playing
- Animate the "Department of Electronics and Communication Engineering" text upward (CSS `translateY`) when the video begins playing
- Fade in and scale up the "VibECX-2K26" title after the department text rises, then show the "2K26" subtitle — all in Times New Roman with orange/red neon glow
- On `onended`: stop audio, trigger a full-screen fade-out on the intro container, then call `onComplete()` to navigate directly to the Home page with no loading screen

**User-visible outcome:** When the intro starts, a phoenix video plays with a synced flying sound effect, animated text rises and appears in sequence, and the screen smoothly fades into the Home page when the video ends — with no static image, no loading screen, and no lingering audio.
