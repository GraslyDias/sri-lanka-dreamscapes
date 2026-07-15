# Home Page Interactive Sri Lanka Experience Map Section

## Objective

Create a premium, interactive homepage section inspired by luxury tourism brands such as Jetwing Travels, but redesigned with a modern, immersive UX.

This section should showcase Sri Lanka's key travel experiences through an interactive illustrated map.

---

# Section Title

Small Label:
"Discover Sri Lanka"

Main Heading:
"Explore Our Island"

Sub Heading:
"Every destination tells a different story."

CTA Button:
"View All Experiences"

---

# Layout

Desktop Layout:

- Large illustrated Sri Lanka map centered.
- 3 experience cards on left side.
- 3 experience cards on right side.
- Experience cards connected visually to map.
- Clean white background.
- Soft shadows and premium spacing.
- Luxury tourism branding style.

Mobile Layout:

- Cards displayed in horizontal scroll carousel.
- Map displayed below cards.
- Active selected category highlights destination on map.

---

# Experience Categories

1. Popular Beaches
2. History & Culture
3. Wildlife & Nature
4. Lesser Travelled
5. Adventure
6. Gastronomy

---

# Interactive Behavior

## Default State

- Sri Lanka map visible.
- No destination selected.
- Subtle animated location dots visible on map.
- Soft floating effect on map.

---

## Hover Interaction (Desktop)

When user hovers a category card:

### Popular Beaches

Show animated destination dots:

- Mirissa
- Unawatuna
- Arugam Bay
- Bentota
- Nilaveli

Behavior:

- Relevant dots glow.
- Dots pulse gently.
- Destination names appear above dots.
- Other category dots fade.

---

### History & Culture

Show:

- Sigiriya
- Anuradhapura
- Polonnaruwa
- Dambulla
- Kandy

Behavior:

- Highlight these locations.
- Show destination labels.
- Animate map focus smoothly.

---

### Wildlife & Nature

Show:

- Yala
- Udawalawe
- Wilpattu
- Horton Plains
- Sinharaja

Behavior:

- Green glow effect.
- Wildlife icon animation.

---

### Lesser Travelled

Show:

- Jaffna
- Mannar
- Kalpitiya
- Knuckles
- Belihuloya

Behavior:

- Hidden gems highlighted.
- Soft golden pulse.

---

### Adventure

Show:

- Ella
- Kitulgala
- Adam's Peak
- Knuckles
- Riverston

Behavior:

- Adventure-themed highlight.
- Mountain markers appear.

---

### Gastronomy

Show:

- Colombo
- Galle
- Kandy
- Jaffna
- Negombo

Behavior:

- Food-themed markers.
- Warm orange highlight.

---

# Click Interaction

When user clicks category:

Open dedicated experience page.

Examples:

Popular Beaches:
/experiences/beaches

History & Culture:
/experiences/history-culture

Wildlife & Nature:
/experiences/wildlife

Lesser Travelled:
/experiences/hidden-gems

Adventure:
/experiences/adventure

Gastronomy:
/experiences/gastronomy

---

# Map Marker Design

Marker Style:

- Premium circular dot.
- Brand primary color.
- Soft outer glow.
- Pulse animation every 2 seconds.

States:

Default:
- Small dot.

Hover:
- Larger dot.
- Label visible.

Active:
- Larger glow.
- Label pinned.

---

# Animation Requirements

Use Framer Motion.

Category Card Hover:

- Scale 1.03
- Smooth transition

Map Marker:

- Pulse animation
- Fade in labels

Map Focus:

- Smooth zoom/pan effect
- Duration 600ms

Section Entrance:

- Fade up animation
- Trigger on scroll

---

# Visual Design

Style:
- Luxury Tourism
- Premium
- Elegant
- Clean
- Modern

Colors:

Primary:
#16A34A

Secondary:
#0F766E

Accent:
#F59E0B

Text:
#111827

Background:
#FFFFFF

Border:
#E5E7EB

---

# Accessibility

- Keyboard navigation support.
- Hover effects must also work on focus.
- ARIA labels for all markers.
- High contrast text.
- Mobile touch support.

---

# Technical Requirements

Framework:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion

Component Structure:

components/
├── sri-lanka-map-section.tsx
├── experience-card.tsx
├── sri-lanka-map.tsx
├── destination-marker.tsx

---

# UX Goal

The section should immediately communicate:

"Different parts of Sri Lanka offer different travel experiences."

Users should naturally explore categories through interaction with the map, increasing engagement and encouraging them to discover tours and destinations.