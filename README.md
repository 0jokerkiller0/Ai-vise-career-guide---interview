<div align="center">

<img src="https://img.shields.io/badge/AI%20Vise-Career%20Intelligence%20Platform-6366f1?style=for-the-badge&logoColor=white" alt="AI Vise Banner" />

# 🧠 AI Vise — Career Guide & Interview Platform

**Your AI-powered co-pilot for landing the job you deserve.**

AI Vise is a full-stack intelligent career platform that generates personalized career roadmaps, conducts AI-driven mock interviews, and delivers real-time industry insights — all powered by Google Gemini and built on the modern Next.js 15 ecosystem.

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel)](https://your-vercel-url.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/0jokerkiller0/Ai-vise-career-guide---interview?style=for-the-badge&logo=github&color=6366f1)](https://github.com/0jokerkiller0/Ai-vise-career-guide---interview)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

---

</div>

## 📸 Screenshots

> _Add screenshots of your dashboard, mock interview screen, and onboarding flow here._

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 **Smart Onboarding** | Industry-specific onboarding flow that tailors the entire experience to your career goals |
| 🤖 **AI Mock Interviews** | Gemini-powered conversational mock interviews with real-time feedback and scoring |
| 🗺️ **Career Roadmaps** | Personalized, step-by-step career path recommendations based on your profile |
| 📊 **Industry Insights** | Live salary trends, in-demand skills, and market intelligence per role |
| 📝 **Interview Q&A Bank** | Curated, AI-generated question sets tailored to your target role and experience level |
| ⚡ **Background Jobs** | Async processing via Inngest for non-blocking AI generation tasks |
| 🔐 **Secure Auth** | Production-grade authentication and user management with Clerk |

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **AI Engine** | Google Gemini API |
| **Auth** | Clerk |
| **Database** | Neon PostgreSQL (Serverless) |
| **ORM** | Prisma |
| **Background Jobs** | Inngest |
| **UI Components** | Shadcn/ui + Tailwind CSS |
| **Deployment** | Vercel |

</div>

---

## 🚀 Getting Started

### Prerequisites

- Node.js **18.x** or higher
- A [Neon](https://neon.tech) PostgreSQL database
- A [Clerk](https://clerk.dev) application
- A [Google Gemini API](https://aistudio.google.com/app/apikey) key
- An [Inngest](https://inngest.com) account

### 1. Clone the Repository

```bash
git clone https://github.com/0jokerkiller0/Ai-vise-career-guide---interview.git
cd Ai-vise-career-guide---interview
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# ── Clerk Auth ───────────────────────────────────────────
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# ── Database ─────────────────────────────────────────────
DATABASE_URL=your_neon_postgresql_connection_string

# ── Google Gemini ─────────────────────────────────────────
GEMINI_API_KEY=your_google_gemini_api_key

# ── Inngest ───────────────────────────────────────────────
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

### 4. Set Up the Database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

---

## 📁 Project Structure

```
ai-vise/
├── app/                    # Next.js App Router pages & layouts
│   ├── (auth)/             # Sign-in / Sign-up routes (Clerk)
│   ├── (main)/             # Protected app routes
│   │   ├── onboarding/     # User onboarding flow
│   │   ├── dashboard/      # Main dashboard
│   │   ├── interview/      # Mock interview module
│   │   └── career/         # Career roadmap & insights
│   └── api/                # API route handlers + Inngest webhook
├── components/             # Reusable Shadcn/ui components
├── lib/                    # Utility functions, Prisma client, Gemini setup
├── inngest/                # Inngest background job functions
├── prisma/                 # Prisma schema & migrations
│   └── schema.prisma
├── actions/                # Next.js Server Actions
└── public/                 # Static assets
```

---

## 🔄 How It Works

```
User Signs Up (Clerk)
        │
        ▼
Onboarding Form — collects industry, role, experience level
        │
        ▼
Server Action triggers Inngest background job
        │
        ▼
Gemini API generates:
  ├── Career Roadmap
  ├── Industry Insights (salary, skills, trends)
  └── Personalized Interview Question Bank
        │
        ▼
Data saved to Neon PostgreSQL via Prisma
        │
        ▼
Dashboard renders personalized career intelligence
        │
        ▼
User starts AI Mock Interview → Gemini evaluates answers → Score + Feedback
```

---

## 🌐 Deployment

This project is optimized for **Vercel** deployment.

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com/new)
3. Add all environment variables from `.env.local` to Vercel's project settings
4. Deploy — Vercel auto-detects Next.js and handles the build

> **Inngest Note:** Register your Vercel deployment URL as the Inngest webhook endpoint in your Inngest dashboard under `App URL → /api/inngest`.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 👤 Author

**Sushant Telrandhe**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/sushant-telrandhe-1917b0236)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/0jokerkiller0)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail)](mailto:work.sushanttelrandhe@gmail.com)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

_Built with ❤️ using Next.js 15, Google Gemini, and a lot of caffeine._

⭐ **If you found this useful, give it a star!** ⭐

</div>
