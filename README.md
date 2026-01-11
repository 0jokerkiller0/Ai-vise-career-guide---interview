# AI Career Coach 🧑‍💻

An intelligent career guidance platform built with **Next.js**, **Neon DB**, **TailwindCSS**, **Prisma**, **Inngest**, and **Shadcn UI**.

---

## 👥 Team SynapSpark

Innovating at the intersection of AI, Web Development, and Career Growth.

**Members:**

- Ashish Bind
- Deep Mhatre
- Kunal Mali
- Shreya Patil
- Sushant Telrandhe
- Abhishek Mathpati
- Atharav Shirsat

---

## 🚀 Overview

**AI Career Coach** leverages Generative AI and modern web technologies to provide:

- Personalized career advice
- AI-powered skill recommendations
- Interactive Q&A chatbot
- Seamless authentication and onboarding
- Clean, responsive UI/UX

---

## 📌 Features

- AI-powered Q&A Career Chatbot
- Secure authentication (Clerk)
- Serverless Postgres DB (Neon) with Prisma ORM
- Event-driven workflows (Inngest)
- Responsive UI (TailwindCSS & Shadcn UI)
- Modern Next.js 14 App Router

---

## ⚡ Tech Stack

**Frontend:** [Next.js](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
**Backend:** [Node.js](https://nodejs.org/), [Inngest](https://www.inngest.com/)
**Database:** [Neon](https://neon.tech/) (Serverless Postgres), [Prisma](https://www.prisma.io/)
**Authentication:** [Clerk](https://clerk.com/)
**AI:** Google Gemini API

---

## 🎬 Demo Video

Showcase your project in action! Upload your demo video to the `public/` folder (e.g., `public/demo_video.mp4`) and add a link or embedded player below:

**Demo:**

[Watch Demo Video](https://drive.google.com/file/d/1oYziUMKt9e9-MWgs8q4ES0woEjHGsB3k/view?usp=drivesdk)


---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add:

```env
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
GEMINI_API_KEY=
```

### 4. Run the development server

```bash
npm run dev
```
