<div align="center">

<img src="public/ai-vise.png" alt="AI Vise Logo" width="180" />

# AI Vise — AI-Powered Career Guide & Interview Platform

**Personalized career guidance, mock interviews, resume building, and industry insights — all powered by Google Gemini AI.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://ai-vise-career-guide-interview.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](https://github.com/0jokerkiller0/Ai-vise-career-guide---interview/pulls)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [How It Works](#-how-it-works)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Overview

**AI Vise** is a full-stack AI-powered career development platform that helps professionals and students accelerate their careers. It combines personalized career coaching, AI-generated mock interviews, ATS-optimized resume building, and real-time industry insights — all in one place.

Built with **Next.js 15**, **Google Gemini API**, **Clerk Authentication**, and **Neon PostgreSQL**, the platform delivers a seamless, intelligent experience from onboarding to job offer.

---

## 🌐 Live Demo

🔗 **[https://ai-vise-career-guide-interview.vercel.app](https://ai-vise-career-guide-interview.vercel.app/)**

> Sign up for free to explore all features. No credit card required.

---

## ✨ Features

### 🤖 AI Career Coach
- Personalized career advice powered by Google Gemini
- Industry-specific guidance across 15+ sectors
- Skill gap analysis and learning path recommendations
- Interactive Q&A career chatbot

### 🎤 Mock Interview Preparation
- AI-generated role-specific interview questions
- Experience-level-adjusted question difficulty
- Instant performance feedback and scoring
- Interview history tracking and progress analytics

### 📄 Resume & Cover Letter Builder
- ATS-optimized resume generation
- AI-assisted cover letter writing
- PDF export via html2pdf.js
- LinkedIn profile optimization tips

### 📊 Industry Insights Dashboard
- Real-time industry trend analysis
- Salary benchmarking data
- Market demand forecasting
- Weekly AI-generated insight reports (powered by Inngest)

### 👤 User Onboarding & Profile
- Industry and specialization selection (15+ industries)
- Skills and experience level setup
- Professional bio builder
- Personalized dashboard based on profile

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15.5 (App Router, Turbopack) |
| **Frontend** | React 19, Tailwind CSS, Shadcn UI, Radix UI |
| **AI Engine** | Google Gemini API (`@google/generative-ai`) |
| **Authentication** | Clerk (`@clerk/nextjs` v6) |
| **Database** | PostgreSQL via Neon Serverless |
| **ORM** | Prisma v6 |
| **Background Jobs** | Inngest v3 (event-driven, scheduled tasks) |
| **Forms** | React Hook Form + Zod validation |
| **Charts** | Recharts |
| **PDF Export** | html2pdf.js |
| **Markdown Editor** | @uiw/react-md-editor |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
Ai-vise-career-guide---interview/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Sign-in / Sign-up pages (Clerk)
│   ├── (main)/                 # Protected app routes
│   │   ├── dashboard/          # Main dashboard
│   │   ├── onboarding/         # User profile setup
│   │   ├── interview/          # Mock interview feature
│   │   ├── resume/             # Resume builder
│   │   └── ai-cover-letter/    # Cover letter generator
│   ├── api/
│   │   └── inngest/            # Inngest background job endpoint
│   └── layout.js               # Root layout with Clerk provider
│
├── actions/                    # Next.js Server Actions
│   ├── user.js                 # Profile update, onboarding
│   ├── dashboard.js            # Industry insights generation
│   ├── interview.js            # Interview Q&A logic
│   └── resume.js               # Resume CRUD operations
│
├── components/                 # Reusable UI components
│   ├── ui/                     # Shadcn UI primitives
│   └── ...                     # Feature-specific components
│
├── data/                       # Static data
│   └── faqs.js                 # FAQ content
│
├── hooks/                      # Custom React hooks
│
├── lib/                        # Utilities
│   ├── prisma.js               # Prisma client singleton
│   ├── inngest/                # Inngest client + functions
│   └── utils.js                # Helper functions
│
├── prisma/
│   └── schema.prisma           # Database schema
│
├── public/                     # Static assets
│   └── ai-vise.png             # App logo
│
├── .env                        # Environment variables (not committed)
├── middleware.js               # Clerk auth middleware
├── next.config.mjs             # Next.js config
└── package.json
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- A [Neon](https://neon.tech/) PostgreSQL database
- A [Clerk](https://clerk.com/) account (for authentication)
- A [Google AI Studio](https://aistudio.google.com/) API key (Gemini)
- An [Inngest](https://www.inngest.com/) account (for background jobs)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/0jokerkiller0/Ai-vise-career-guide---interview.git
cd Ai-vise-career-guide---interview
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

Create a `.env` file in the root directory (see [Environment Variables](#-environment-variables) section below).

**4. Run database migrations**

```bash
npx prisma migrate dev
npx prisma generate
```

**5. Start the development server**

```bash
npm run dev
```

**6. Open in browser**

```
http://localhost:3000
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following keys:

```env
# ─── Database (Neon PostgreSQL) ───────────────────────────────
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# ─── Clerk Authentication ─────────────────────────────────────
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxx

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# ─── Google Gemini AI ─────────────────────────────────────────
GEMINI_API_KEY=AIzaxxxxxxxxxxxxxxxxxxxxxxxx

# ─── Inngest (Background Jobs) ────────────────────────────────
INNGEST_EVENT_KEY=xxxxxxxxxxxxxxxx
INNGEST_SIGNING_KEY=signkey-xxxxxxxxxxxxxxxx
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

### Where to get each key

| Key | Source |
|---|---|
| `DATABASE_URL` | [Neon Console](https://console.neon.tech/) → Your Project → Connection String |
| `CLERK_*` | [Clerk Dashboard](https://dashboard.clerk.com/) → API Keys |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `INNGEST_*` | [Inngest Dashboard](https://app.inngest.com/) → Event Keys |

---

## 💡 How It Works

```
User Signs Up (Clerk)
        │
        ▼
  Onboarding Page
  (Select Industry, Skills, Experience)
        │
        ▼
   Dashboard
  ┌──────────────────────────────────────────┐
  │  Industry Insights  │  Interview Prep    │
  │  (Inngest weekly    │  (Gemini generates │
  │   AI generation)    │   role questions)  │
  ├──────────────────────────────────────────┤
  │  Resume Builder     │  Cover Letter AI   │
  │  (Markdown editor + │  (Gemini drafts    │
  │   PDF export)       │   personalized)    │
  └──────────────────────────────────────────┘
```

1. **Sign up** — Clerk handles secure authentication
2. **Onboard** — Select your industry, specialization, experience level, and skills
3. **Get insights** — Inngest triggers a weekly background job that calls Gemini to generate industry-specific market analysis
4. **Practice interviews** — Choose a job role; Gemini generates adaptive questions and scores your answers
5. **Build resume** — Use the markdown editor to craft your resume; export as PDF

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

```bash
# 1. Fork the repo on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/Ai-vise-career-guide---interview.git

# 3. Create a feature branch
git checkout -b feature/your-feature-name

# 4. Make your changes and commit
git commit -m "feat: add your feature description"

# 5. Push to your fork
git push origin feature/your-feature-name

# 6. Open a Pull Request on GitHub
```

Please follow the existing code style and keep PRs focused on a single feature or fix.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built by [Sushant Telrandhe](https://linkedin.com/in/sushant-telrandhe-1917b0236) · Powered by Next.js & Google Gemini

⭐ If you found this useful, please star the repo!

</div>
