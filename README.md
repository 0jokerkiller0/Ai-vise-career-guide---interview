# AI Vise - Comprehensive AI-Powered Career Guidance & Mock Interview Platform

## 🚀 Project Overview

AI Vise is a dual-platform solution combining two cutting-edge AI-powered applications designed to revolutionize career development and job preparation:

1. **AI-Powered Mock Interview Platform** - Interactive platform for practicing interview skills
2. **AI Career Coach** - Comprehensive career guidance system with personalized recommendations

Both platforms leverage advanced AI technologies to provide users with personalized career support and interview preparation tools.

## 🏗️ Architecture Overview

### AI-Powered Mock Interview Platform
- **Technology Stack**: Next.js 14, Tailwind CSS, PostgreSQL (Neon), Drizzle ORM
- **AI Integration**: Google Gemini API for interview question generation and feedback
- **Features**:
  - AI-driven Interview Experience
  - Personalized Interview Sessions based on job roles and industries
  - Experience Level Adjusted Questions
  - Detailed Performance Feedback and Insights
  - Extensive Question Bank
  - Performance Grading System
  - Interview History Tracking

### AI Career Coach Platform
- **Technology Stack**: Next.js 14, Neon DB, TailwindCSS, Prisma ORM, Inngest, Shadcn UI
- **AI Integration**: Google Gemini API for career advice and skill recommendations
- **Features**:
  - AI-powered Q&A Career Chatbot
  - Personalized Career Advice
  - Skill-based Recommendations
  - Interactive Q&A System
  - Assessment and Progress Tracking
  - Industry-Specific Guidance

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | Next.js 14, React, Tailwind CSS, Shadcn UI |
| **Backend** | Node.js, Next.js App Router |
| **Database** | PostgreSQL (Neon Serverless), Prisma ORM, Drizzle ORM |
| **Authentication** | Clerk |
| **AI Engine** | Google Gemini API |
| **Event Processing** | Inngest |
| **Styling** | Tailwind CSS, Custom Components |

## 📋 Key Features

### Mock Interview Platform Features:
- ✅ AI-powered interview questions and feedback
- ✅ Personalized interview experiences
- ✅ Adaptive questions based on experience level
- ✅ Detailed performance analysis
- ✅ Comprehensive question bank
- ✅ Performance grading system
- ✅ Interview history tracking

### Career Coach Platform Features:
- ✅ AI-powered career guidance chatbot
- ✅ Personalized skill recommendations
- ✅ Interactive Q&A system
- ✅ Career assessment tools
- ✅ Industry-specific guidance
- ✅ Progress tracking and analytics
- ✅ Professional development resources

## 🏁 Getting Started

### Prerequisites
- Node.js (version 18+)
- npm or yarn package manager
- Google Gemini API key
- Database credentials (Neon/PostgreSQL)

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd AI-vise
```

2. **Navigate to each platform directory and install dependencies:**

For the Mock Interview Platform:
```bash
cd Ai-mock-Interview
npm install
```

For the Career Coach Platform:
```bash
cd ai-career-coach/Ai-vise-career-guide---interview
npm install
```

3. **Configure environment variables:**

For the Mock Interview Platform (`.env.local`):
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
GEMINI_API_KEY=
DATABASE_URL=
```

For the Career Coach Platform (`.env`):
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

4. **Run the development servers:**

For the Mock Interview Platform:
```bash
npm run dev
```

For the Career Coach Platform:
```bash
npm run dev
```

5. **Access the applications:**
- Mock Interview Platform: http://localhost:3000
- Career Coach Platform: http://localhost:3000 (or separate port if configured)

## 🏗️ Project Structure

```
AI vise/
├── Ai-mock-Interview/           # AI-Powered Mock Interview Platform
│   ├── app/                    # Next.js app router
│   ├── components/             # Reusable UI components
│   ├── utils/                  # Utility functions (DB, AI Modal)
│   ├── public/                 # Static assets
│   └── ...
├── ai-career-coach/            # AI Career Coach Platform
│   └── Ai-vise-career-guide---interview/
│       ├── app/                # Next.js app router
│       ├── components/         # Reusable UI components
│       ├── actions/            # Server actions
│       ├── data/               # Static data files
│       ├── lib/                # Library utilities
│       ├── public/             # Static assets
│       └── ...
```

## 💡 Usage

### Mock Interview Platform:
1. Create an account and complete onboarding
2. Select interview type (technical, behavioral) and job role
3. Participate in AI-generated interview questions
4. Receive immediate feedback and performance analysis
5. Review past interviews and track progress

### Career Coach Platform:
1. Sign up and complete profile setup
2. Interact with the AI career advisor
3. Take assessments to identify skill gaps
4. Receive personalized recommendations
5. Track progress and career development

## 🤝 Contributing

We welcome contributions to improve the AI Vise platform! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team SynapSpark

Innovating at the intersection of AI, Web Development, and Career Growth.

**Team Members:**
- Ashish Bind
- Deep Mhatre
- Kunal Mali
- Shreya Patil
- Sushant Telrandhe
- Abhishek Mathpati
- Atharav Shirsat

## 🔗 Contact

For feedback and inquiries, please reach out to the team members.

---

Made with ❤️ by Team SynapSpark