<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

<div align="center">

# ✦ NeoFocus

### Immersive Pixel-Art Productivity Universe

*Focus timers · Animated companions · Cozy environments · Behavioral analytics · Gamified progression*

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![PixiJS](https://img.shields.io/badge/PixiJS-e91e8c?style=flat-square&logo=pixijs&logoColor=white)](https://pixijs.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)

</div>

---

## Overview

NeoFocus is a next-generation productivity platform that transforms traditional study timers into a **living pixel-art ecosystem**. Rather than functioning as a standard Pomodoro dashboard, NeoFocus creates an immersive study universe where pixel companions react to focus sessions, environments evolve dynamically, and productivity becomes emotionally engaging — like progression inside a cozy RPG world.

> **Core Principle:** *Studying should feel immersive, rewarding, emotionally engaging, and alive.*
![Focus Dashboard](https://raw.githubusercontent.com/dctbao09x/NeoFocus-for-Studying-v1/025075c159756cc0025d2dba34516c52bb7a112c/Focus%20Dashboard.png)
Link: https://neo-focus-for-studying-v1.vercel.app/
---

## Table of Contents

1. [Key Features](#key-features)
2. [Technical Architecture](#technical-architecture)
3. [Getting Started](#getting-started)
4. [Focus Engine](#1-advanced-focus-engine)
5. [Companion System](#2-pixel-companion-system)
6. [Living Pixel World](#3-living-pixel-world)
7. [Deep Focus Mode](#4-deep-focus-mode)
8. [Study Session Workflow](#5-study-session-workflow)
9. [Task Pipeline](#6-task-pipeline)
10. [Smart Notes](#7-smart-notes-ecosystem)
11. [Productivity Analytics](#8-productivity-analytics)
12. [Gamification](#11-gamification-system)
13. [Comparison](#comparison)
14. [Roadmap](#roadmap)

---

## Key Features

| System | Description |
|--------|-------------|
| 🕐 **Focus Engine** | Pomodoro, Deep Work, Countdown, and Adaptive sessions with animated radial timers |
| 🐾 **Companion System** | 7 pixel companions with behavior state machines, XP progression, and unlockable skins |
| 🌍 **Living Pixel World** | Multi-layer parallax environments with day/night cycles and weather systems |
| 📊 **Behavioral Analytics** | Heatmaps, burnout detection, peak focus hours, and AI-generated insights |
| ✅ **Task Pipeline** | Drag-and-drop workflow with nested subtasks, priorities, and pixel completion animations |
| 📝 **Smart Notes** | Markdown-enabled, session-linked notes with global brain dump overlay |
| 🎮 **Gamification** | XP, levels, streaks, achievements, and unlockable companion accessories |
| 🔇 **Deep Focus Mode** | Fullscreen ambient mode with layered soundscapes and cinematic transitions |
| 📱 **Mobile-First** | Touch gestures, floating timers, and adaptive pixel layouts |

---

## Technical Architecture

### Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | Next.js · React · TypeScript |
| **Styling & Motion** | TailwindCSS · Framer Motion |
| **Canvas & Animation** | PixiJS · Sprite sheet animation · State machine architecture |
| **State Management** | Zustand |
| **Data Visualization** | Recharts |
| **Persistence** | IndexedDB · Supabase · Background sync |

### Architecture Principles

- **60 FPS rendering** — canvas-optimized sprite and environment controllers
- **Modular architecture** — lazy loading, isolated animation controllers, efficient rendering
- **Session recovery** — reload-safe timer persistence with background sync
- **State machine companions** — each companion runs an independent behavior FSM

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-org/neofocus.git
cd neofocus

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:3000` to launch NeoFocus.

```bash
# Build for production
npm run build && npm start

# Run tests
npm test
```

---

## 1. Advanced Focus Engine

A complete study timing ecosystem supporting multiple session modes.

### Session Modes

| Mode | Description |
|------|-------------|
| **Pomodoro** | Classic 25/5 cycle with configurable intervals |
| **Countdown Timer** | Fixed-duration focus with break scheduling |
| **Stopwatch** | Open-ended tracking with pause support |
| **Deep Work** | Extended sessions with minimal interruption |
| **Adaptive Focus** | Dynamic durations based on behavioral history |
| **Auto Repeat** | Loop cycles with configurable long break intervals |

### Visual Timer System

- Animated radial timer with pixel energy core design
- Breathing glow effects and dynamic lighting
- Session progress animations and cinematic transitions
- Floating mini timer for global session persistence and reload recovery

---

## 2. Pixel Companion System

A fully interactive companion ecosystem built on individual behavior state machines.

### Available Companions

`Pixel Dog` · `Pixel Cat` · `Pixel Rabbit` · `Pixel Fox` · `Pixel Hamster` · `Pixel Capybara` · `Pixel Girl`

### Behavior States

| State | Trigger |
|-------|---------|
| **Focused** | Active focus session — companions study and interact |
| **Running** | Background movement during study |
| **Sleeping** | Break mode — companions rest and stretch |
| **Excited** | Session completion — sparkles and celebration jumps |
| **Tired** | Extended sessions or burnout detection |
| **Idle** | Standby — ambient animations |

### Progression System

- XP and level system tied to session completions
- Unlockable skins, accessories, and animation packs
- Personality traits that evolve with usage patterns

---

## 3. Living Pixel World

The entire application environment is a reactive, animated pixel-art world.

### Environment Features

- Multi-layer parallax backgrounds with animated clouds, moving grass, and pixel particles
- Fireflies, birds, and ambient world motion
- Dynamic lighting system and pixel weather
- Day/night cycles synced to real-world time

### Environmental Reactivity

| Trigger | World Response |
|---------|----------------|
| Longer session duration | Gradual lighting shift |
| Night-time focus | Star ambience activation |
| Session completion | Environmental celebration burst |
| Streak progression | World evolution and new elements unlocked |

---

## 4. Deep Focus Mode

A distraction-free immersive environment for deep work sessions.

- Fullscreen mode with hidden dashboard elements and minimal UI
- Cinematic zoom transitions and ambient background motion
- Layered ambient soundscapes:

  `Rain` · `Cafe` · `Keyboard` · `Wind` · `White Noise` · `Lofi` · `Fantasy`

---

## 5. Study Session Workflow

### Pre-Session Configuration

Configure: **Subject · Goal · Tags · Estimated duration · Energy level · Focus difficulty · Sound profile**

### Post-Session Summary

Receive: **Focus duration · Focus score · Interruption log · Productivity insights · Reflection notes**

---

## 6. Task Pipeline

A structured drag-and-drop workflow system.

- Nested subtasks with priorities and estimated durations
- Subject tagging and completion state tracking
- Pixel progress fills and smooth completion animations
- Focus task highlighting during active sessions

---

## 7. Smart Notes Ecosystem

- Markdown support with code blocks and checklists
- Session-linked and subject-linked note organization
- Pinned notes, full-text search, auto-save, and recent history
- **Brain Dump Overlay** — global quick-note panel via keyboard shortcut

---

## 8. Productivity Analytics

Commercial-grade behavioral analytics with full visualization systems.

### Metrics

| Category | Tracked Signals |
|----------|----------------|
| **Subject Analysis** | Time per subject · Weekly/monthly trends · Learning consistency |
| **Productivity Intelligence** | Focus score · Deep work ratio · Interruption rate · Completion rate |
| **Behavioral Patterns** | Peak focus hours · Best-performing days · Burnout detection · Consistency scoring |

### Visualizations

Heatmaps · Line charts · Radar charts · Pie charts · Streak charts · Timeline analysis

### AI Insight Examples

> *"You focus best at 8PM."*  
> *"Math sessions show lower completion rates."*  
> *"Deep work ratio decreased this week."*

---

## 9. Calendar & Timeline

A visual productivity timeline inspired by GitHub contribution graphs.

- Study heatmaps and session timelines
- Focus block visualization and daily summaries
- Streak systems and milestone tracking

---

## 10. Countdown Hub

Multi-event countdown tracking with dashboard widgets.

**Use cases:** Exams · Project deadlines · Product launches · Assignment due dates

---

## 11. Gamification System

Progression mechanics inspired by modern game design.

| System | Description |
|--------|-------------|
| **XP & Levels** | Earned through completed focus sessions |
| **Streaks** | Daily and weekly consistency tracking |
| **Achievements** | *7-Day Focus Streak* · *100 Hours Focused* · *Deep Work Master* · *Consistency Champion* |
| **Unlockables** | Companion skins, accessories, animation packs, environments |

---

## 12. Floating Session System

A persistent global mini focus controller — inspired by the Spotify mini player.

- Draggable floating timer with compact and expanded modes
- Mini companion animations and subject tracking
- Pause/resume controls accessible from any view

---

## Comparison

| Feature | Standard Pomodoro App | NeoFocus |
|---------|-----------------------|----------|
| Timer modes | 1–2 basic modes | 6 modes + adaptive |
| Companion system | ✗ | 7 companions + state machine |
| Environment | Static background | Living pixel world |
| Analytics | Session count | Behavioral intelligence + AI insights |
| Gamification | ✗ | XP, levels, streaks, achievements |
| Note-taking | ✗ | Session-linked markdown notes |
| Mobile experience | Responsive layout | Touch-native pixel interactions |
| Sound system | ✗ | 8-channel layered ambient audio |

---

## Inspiration

Forest · Notion · Todoist · Duolingo · Stardew Valley · Eastward · Celeste · Arc Browser · Spotify · GitHub

---

## Roadmap

| Feature | Status |
|---------|--------|
| Multiplayer study rooms | Planned |
| Shared focus sessions | Planned |
| AI productivity assistant | Planned |
| Online companion marketplace | Planned |
| Seasonal environments | Planned |
| Custom environment editor | Planned |
| Companion AI behaviors | Planned |
| Focus guilds & social streaks | Planned |

---

<div align="center">

*NeoFocus is not a generic timer.*  
*It is a living pixel-art productivity universe where studying feels immersive, relaxing, emotional, and rewarding.*

</div>
