# Surge AI — Financial Data Collection Platform

This is the task platform I built for the Surge AI Financial SFT Data Collection project. It's what financial experts will see and use when doing the actual work — taking qualification tests, submitting data, and reviewing each other's submissions.

Access the live website here: `https://rajamedindrao.github.io/DataCollectionProject-SFT/`

## What This Is

A static React app that shows the full platform experience for this project. No database, no login — just the UI with sample data so you can see exactly how contributors interact with the platform at each stage.

The platform has 3 main sections:

### 1. Qualification Tests
Contributors prove their financial analysis skills here. Three categories (A, B, C) unlock sequentially — you need 80% in Category A before B opens, and so on.

- Category A: Simple lookup from one 10-K/10-Q
- Category B: Multi-section synthesis or computation from one document
- Category C: Cross-firm comparison using 2-40 documents

Each category shows: an introduction, a worked example with filled JSON, the grading rubric, and the rules. Then the test is taken (3 questions per category).

### 2. Data Submission
Once qualified, contributors create actual training data here. They write both the question AND the full expert answer with supporting facts, justification, and document metadata. Same categories — you can only submit to levels you've qualified for.

### 3. Review Submissions
Contributors review each other's work here. Two sub-sections:
- **Eval Review**: Grade qualification test submissions (per-field scoring out of 10)
- **Data Submissions Review**: Accept, edit & resubmit, or reject

## Running It

```bash
cd surge-worker-platform
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Folder Structure

```
surge-worker-platform/
├── src/
│   ├── components/          # Shared UI components
│   │   ├── Header.jsx       # Navigation header with breadcrumbs
│   │   ├── CategoryCard.jsx # Reusable category selection card
│   │   ├── RubricDisplay.jsx# Renders rubric tables
│   │   ├── GuidelinesPanel.jsx # Guidelines + auto-reject criteria
│   │   └── SubmissionForm.jsx  # The JSON submission form
│   ├── data/
│   │   └── categories.js    # All content: rubrics, examples, samples
│   ├── pages/
│   │   ├── Home.jsx         # Landing page with project overview
│   │   ├── qualification/   # Qualification test flow
│   │   │   ├── QualificationHub.jsx      # Category selection
│   │   │   ├── QualificationBriefing.jsx # Pre-test instructions
│   │   │   └── QualificationTest.jsx     # The actual test
│   │   ├── datasubmission/  # Data submission flow
│   │   │   ├── DataSubmissionHub.jsx     # Category selection
│   │   │   └── DataSubmissionCategory.jsx # Instructions + form
│   │   └── review/          # Review/QA flow
│   │       ├── ReviewHub.jsx    # Eval vs Data review selection
│   │       ├── EvalReview.jsx   # Grade qualification submissions
│   │       └── DataReview.jsx   # Review data submissions
│   ├── App.jsx              # Routes + state management
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind + custom theme
├── index.html
├── package.json
└── vite.config.js
```

## Design Decisions

- **Looks like Surge AI**: Cream background, IBM Plex fonts, clean cards, minimal color palette. Professional and functional.
- **Progressive unlock**: Category B and C are locked until you pass the previous one. Same for Data Submission and Review sections.
- **Appropriate info only**: No internal metrics, submission counts, client details, or deadlines. Only what's needed to do the task.
- **Static with sample data**: All the sample submissions and qualification entries are hardcoded in `src/data/categories.js`. No backend needed for the demo.
- **Restrictions shown**: Max submissions per profile per category, grading criteria, and auto-reject rules are all clearly displayed before starting.

## Tech Stack

- React 19 + Vite
- Tailwind CSS 4
- React Router 7
- Lucide React (icons)

## For the Submission

This platform demonstrates the "Task instructions" portion of the project. Screenshots from this UI will be used in the submission document to show how instructions are presented across:
1. Identifying Right Contributors (Qualification section)
2. Main Data Creation (Data Submission section)
3. Quality and Assurance, Rating, and Review (Review section)
