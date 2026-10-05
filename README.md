# AI PROJECT FORGE
### Campaign: THE 60-MINUTE AI CAMPUS CHALLENGE

> **Core Growth Hypothesis:** Instead of asking engineering students to register for another generic AI workshop, first give them immediate personalized value. Turn real campus problems into structured, buildable AI projects (with architecture, stack, 60-minute scope, and buildability score) *before* asking them to register.

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation & Run
```bash
# Clone or navigate to the directory
cd ai-project-forge

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev

# Or build for production
npm run build && npm run start
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎯 Campaign Constraints & Goals
- **Objective:** 500 final-year engineering students registered for the free online workshop: *"Build Your First AI Project in 60 Minutes"*
- **Budget:** ₹2,000 total marketing budget
- **Timeline:** 7-day sprint
- **Growth Engine:** Content-driven viral loop powered by campus problem solving and peer project sharing

---

## 🧠 Architecture & Tech Stack
- **Framework:** Next.js (App Router, Turbopack, TypeScript)
- **Styling:** Tailwind CSS v4, Lucide Icons, Modern Dark Technical Aesthetic
- **Motion:** Framer Motion
- **Visualizations:** Recharts
- **Validation:** Zod
- **State Management:** Zustand with safe localStorage versioning (`ai-project-forge:v1`) and in-memory fallback
- **Storage Strategy:** Zero-database runtime. All state is local & client-persisted with high-fidelity synthetic campaign datasets.
- **AI Strategy:** Dual-mode AI architecture. Works 100% autonomously with deterministic domain reasoning engines, with optional live LLM fallback support.

---

## 📁 Key Routes
- `/` — High-converting Value-First Landing Page
- `/problem` — Campus Problem Input Experience (Categorized, Severity, Stakeholders)
- `/project` — AI Generated Project Blueprint & 60-Minute Feasibility Scope
- `/register` — High-intent Workshop Registration (unlocked only after value delivery)
- `/student` — AI Builder Profile & Shareable Campus Project Badge
- `/team` — AI Skill Matrix & Team Matcher
- `/campus` — Campus Problem Intelligence & Recurring Theme Analytics
- `/challenge` — Collective Campus AI Challenges synthesized from student problems
- `/admin` — Growth Command Center & Funnel Intelligence
- `/admin/experiments` — A/B Experimentation Hub (Value-First vs Direct CTA)
- `/demo` — Interactive 7-Day Campaign Simulator (50 to 1,000 students)
- `/about` — Product Thinking & Human-in-the-Loop Decision Manifesto
