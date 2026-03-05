# Haaramma - A Sister's Love Journey

## Current State
New project. No existing frontend or backend code.

## Requested Changes (Diff)

### Add
- Full-screen cinematic interactive website dedicated to the user's sister "Haaramma"
- 4-screen journey with smooth animated transitions
- Screen 1 (Opening): Dreamy gradient background, floating glowing hearts, centered glowing CTA button "Click here, my dear Haaramma ❤️"
- Screen 2 (Emotional Message): Typing animation text from brother to sister, with "Start our little memory journey" button
- Screen 3 (Memory Questions): 8 questions shown one by one with slide/fade transitions, floating hearts surrounding each question, rich premium love animations per page; questions include Telugu and English text
- Screen 4 (Magical Final): Fullscreen photo of brother and sister (uploaded image `/assets/uploads/Screenshot_20260306_021018-1.jpg`) as background, semi-transparent dark overlay, large glowing emotional message with slow fade-in, floating glowing upward-drifting hearts, closing line "From your Annayya, with endless And Infinity love ❤️"
- Background elements: floating glowing heart particles, soft sparkles, subtle light rays throughout all screens
- Hand-heart icon (two hands forming half-half heart together) used as decorative element
- Glassmorphism card effects on text containers
- Smooth sliding transitions between all screens
- Fully mobile-responsive design

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Single-page React app with section-based navigation (no routing needed)
2. Custom CSS animations: floating hearts, sparkles, typing effect, fade-in, slide transitions
3. Canvas or CSS particle system for background hearts/sparkles
4. Screen state managed with React useState (currentScreen: 0–3, questionIndex: 0–7)
5. Typing animation hook for Screen 2 message
6. Question carousel with prev/next transition for Screen 3
7. Final screen uses uploaded image as full-screen background with overlay
8. All text content exactly as specified by user (Telugu + English)
9. Glassmorphism panels for readable text over animated backgrounds
10. data-ocid markers on all interactive buttons
