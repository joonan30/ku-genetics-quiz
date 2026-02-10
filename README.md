# Genetics RPG — Korean Rare Plants Learning Adventure

> Begin your journey in Anam, Seoul, and travel across Korea to uncover the secrets of genetics. From peaceful villages near Seoul to the ultimate challenge on Jeju Island, each location teaches you deeper genetic concepts. Your companion? One of 20 rare Korean plants, each with unique powers.

## Features

- **20 Rare Korean Plant Characters** — 4 specialization categories (DNA, Mendelian, Molecular, Evolution) with unique traits and bonuses
- **16-Stage Journey Map** — Travel from Anam, Seoul to Jeju Island (40–450km)
- **4 XP Categories** — DNA-XP, Mendelian-XP, Molecular-XP, Evolution-XP
- **Korean Cultural Item System** — Weapons, armor, and accessories inspired by Korean heritage
- **Achievement System** — 15 achievements from "First Step" to "National Champion"
- **5-Tab Leaderboard** — Overall + 4 category rankings
- **Combo System** — Streak bonuses (+10/+25/+50 XP for 3/5/10 streaks)
- **Level-up Animations** — Petal-falling celebration effects
- **Radar Chart Stats** — 4-axis specialization visualization
- **120+ Quiz Questions** — Sourced from a university-level Human Genetics textbook

## Tech Stack

- React 19 + Vite 7
- Firebase (Authentication + Firestore)
- Tailwind CSS v4
- Framer Motion
- React Router v7
- GitHub Pages deployment

## Installation & Setup

### 1. Clone & Install

```bash
git clone <repository-url>
cd quiz
npm install
```

### 2. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project
2. **Authentication** → Sign-in method → Enable **Email/Password**
3. **Firestore Database** → Create database (start in test mode)
4. Project Settings → Web App → Copy the Firebase config values

### 3. Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your Firebase values:

```
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 4. Seed Question Data (Optional)

```bash
npm install dotenv
npm run seed
```

This uploads 120+ genetics questions to Firestore. **Note:** Questions are also loaded from local data files, so the app works without seeding.

### 5. Run Development Server

```bash
npm run dev
```

Open `http://localhost:5173/claude-quiz/`

### 6. Firestore Security Rules (Production)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /questions/{questionId} {
      allow read: if request.auth != null;
      allow write: if false;
    }
    match /users/{userId} {
      allow read: if request.auth != null;
      allow create: if request.auth.uid == userId;
      allow update: if request.auth.uid == userId;
    }
  }
}
```

## GitHub Pages Deployment

```bash
npm install -D gh-pages
npm run deploy
```

Then in GitHub → Settings → Pages → Branch: `gh-pages` / `(root)`

## Project Structure

```
src/
├── components/
│   ├── auth/           # LoginForm, SignupForm, CharacterSelection
│   ├── quiz/           # QuizCard, QuizResults
│   ├── profile/        # StatsRadar, Equipment, Inventory
│   ├── map/            # JourneyMap
│   ├── leaderboard/    # LeaderboardTabs (5-tab)
│   └── common/         # Navbar, LevelUpModal, AchievementPopup, ProtectedRoute
├── contexts/
│   └── AuthContext.jsx  # Authentication + user profile state
├── data/
│   ├── characters.js    # 20 Korean rare plants
│   ├── stages.js        # 16 journey stages
│   ├── items.js         # 30+ Korean cultural items
│   ├── achievements.js  # 15 achievements
│   ├── questions.js     # 120+ genetics questions
│   └── seed.js          # Firestore seed script
├── firebase/
│   └── config.js        # Firebase initialization
├── pages/
│   ├── Home.jsx         # Landing page
│   ├── Dashboard.jsx    # Player overview
│   ├── Quiz.jsx         # Quiz gameplay
│   ├── MapPage.jsx      # Journey map
│   ├── ProfilePage.jsx  # Full profile
│   └── LeaderboardPage.jsx
├── utils/
│   ├── xpCalculator.js  # Level formula, XP bonuses, combos
│   └── stageUnlock.js   # Stage availability logic
├── App.jsx
├── main.jsx
└── index.css
```

## Game Mechanics

### Level Formula
Level n requires `100 × n^1.5` total XP

### XP by Stage Tier
| Tier | XP per Question | Questions |
|------|----------------|-----------|
| Beginner | 10 | 5 |
| Intermediate | 20 | 7 |
| Advanced | 30 | 8 |
| Master | 50–75 | 10–15 |

### Character Specialization Bonus
+30% XP bonus when answering questions in your character's specialty category

### Stage Unlock Requirements
- Beginner stages: complete the previous stage
- Intermediate: complete previous + minimum total XP
- Advanced: complete previous + 600 total XP
- Master: complete previous + 1200 total XP
- Final (Jeju): complete Busan + 2000 total XP
- All stages require 80% accuracy to pass

## Educational Value

Questions are sourced from a comprehensive university-level Human Genetics textbook covering:
- The Human Genome Project & T2T genome
- Next-Generation Sequencing technologies
- Genetic variant annotation & databases
- Mendelian inheritance in the NGS era
- Polygenic traits & GWAS
- Heritability & quantitative genetics
- Population genetics & structure
- Genetic linkage & recombination
- CRISPR & gene editing
- Gene regulation & epigenetics
- QTL analysis

The 20 plant characters represent real endangered Korean species, promoting awareness of biodiversity conservation alongside genetics education.

## Adding Questions

Add to the `questions` array in `src/data/questions.js`:

```js
{
  id: 'unique-id',
  stage: 'stage-id',        // from stages.js
  category: 'dna',          // dna | mendelian | molecular | evolution
  difficulty: 'beginner',   // beginner | intermediate | advanced | master
  question: 'Your question text?',
  choices: ['A', 'B', 'C', 'D'],
  correctAnswer: 0,         // 0-indexed
  explanation: 'Why this is the correct answer.',
}
```
