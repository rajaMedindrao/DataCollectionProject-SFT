import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, ChevronRight, ArrowLeft, LogOut, BookMarked, Minimize2, Maximize2, X } from 'lucide-react';
import { CATEGORIES, QUAL_TEST_PROMPTS, QUAL_EXAMPLES, QUAL_RUBRIC } from '../../data/categories';
import RubricDisplay from '../../components/RubricDisplay';
import GuidelinesPanel from '../../components/GuidelinesPanel';
import SubmissionForm from '../../components/SubmissionForm';

function ReferencePanel({ open, minimized, onToggleMin, onClose, cat, example }) {
  const [tab, setTab] = useState('example');
  if (!open) return null;

  return (
    <div
      className={`fixed bottom-0 right-0 transition-all shadow-2xl z-40 ${minimized ? 'w-72' : 'w-[28rem]'}`}
      style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRight: 'none', borderBottom: 'none', maxHeight: minimized ? '3.5rem' : '70vh', overflow: 'hidden' }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-ink)]">
        <div className="flex items-center gap-2">
          <BookMarked size={14} className="text-[var(--color-cream)]" />
          <span className="font-[var(--font-mono)] text-[0.72rem] tracking-widest text-[var(--color-cream)] font-medium">
            REFERENCE — {cat.title.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onToggleMin} className="p-1 text-[var(--color-cream)] hover:opacity-70">
            {minimized ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
          </button>
          <button onClick={onClose} className="p-1 text-[var(--color-cream)] hover:opacity-70">
            <X size={14} />
          </button>
        </div>
      </div>
      {!minimized && (
        <>
          <div className="flex border-b border-[var(--color-border)]">
            {[{ id: 'example', label: 'Example' }, { id: 'rubric', label: 'Rubric' }, { id: 'rules', label: 'Guidelines' }].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 py-2.5 text-xs transition-colors ${tab === t.id ? 'font-semibold text-[var(--color-ink)] bg-[var(--color-cream-dark)] border-b-2 border-[var(--color-accent)]' : 'text-[var(--color-muted)] border-b-2 border-transparent'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(70vh - 7rem)' }}>
            {tab === 'example' && (
              <div className="space-y-3">
                <div>
                  <div className="font-[var(--font-mono)] text-[0.65rem] tracking-widest text-[var(--color-accent)] mb-1">EXAMPLE PROMPT</div>
                  <div className="p-2.5 bg-[var(--color-cream-dark)] text-xs text-[var(--color-ink)] italic leading-relaxed">{example.prompt}</div>
                </div>
                <div>
                  <div className="font-[var(--font-mono)] text-[0.65rem] tracking-widest text-[var(--color-accent)] mb-1">FILLED JSON</div>
                  <pre className="p-2.5 bg-[var(--color-ink)] text-[var(--color-cream)] font-[var(--font-mono)] text-[0.68rem] leading-relaxed overflow-x-auto max-h-56 overflow-y-auto">
                    {JSON.stringify(example.filledJson, null, 2)}
                  </pre>
                </div>
              </div>
            )}
            {tab === 'rubric' && <RubricDisplay rubric={QUAL_RUBRIC} />}
            {tab === 'rules' && <GuidelinesPanel />}
          </div>
        </>
      )}
    </div>
  );
}

export default function QualificationTest({ onComplete }) {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [refOpen, setRefOpen] = useState(true);
  const [refMinimized, setRefMinimized] = useState(false);
  const cat = CATEGORIES[categoryId.toUpperCase()];
  const prompts = QUAL_TEST_PROMPTS[categoryId.toUpperCase()];
  const example = QUAL_EXAMPLES[categoryId.toUpperCase()];

  if (!cat) return <div className="p-8">Category not found.</div>;

  const handleSubmit = () => {
    setSubmitted(true);
    if (onComplete) onComplete(categoryId.toUpperCase());
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-8 py-16 text-center">
        <div className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.15em] text-[var(--color-success)] mb-3">
          SUBMITTED SUCCESSFULLY
        </div>
        <h1 className="font-[var(--font-display)] text-3xl text-[var(--color-ink)] font-medium mb-4">
          The qualification test has been submitted.
        </h1>
        <p className="text-sm text-[var(--color-ink-light)] leading-relaxed max-w-md mx-auto mb-6">
          Answers will be reviewed within 12 hours. A notification will be sent once the submission is graded.
        </p>
        <Link to="/qualification" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-ink)] text-[var(--color-cream)] text-sm font-medium">
          <ArrowLeft size={15} /> Back to categories
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-8 py-8 pb-32">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.15em] text-[var(--color-accent)]">
            TEST IN PROGRESS — {cat.title.toUpperCase()}
          </div>
          <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-ink)] font-medium mt-1">
            Three questions. Take your time.
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 border border-[var(--color-border)] bg-white">
            <Clock size={14} className="text-[var(--color-accent)]" />
            <span className="font-[var(--font-mono)] text-xs text-[var(--color-ink-light)]">Est. {cat.estTime}</span>
          </div>
          <Link
            to="/qualification"
            className="flex items-center gap-2 px-3 py-1.5 border border-[var(--color-danger)] text-[var(--color-danger)] text-sm font-medium hover:bg-[#FBF0EB] transition-colors"
          >
            <LogOut size={14} /> Exit
          </Link>
        </div>
      </div>

      {/* Question 1 */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-[var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)] font-medium">QUESTION 01</span>
          <span className="font-[var(--font-mono)] text-[0.7rem] text-[var(--color-ink-light)] bg-[var(--color-cream-dark)] px-2 py-0.5">Given prompt — fill the answer</span>
        </div>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Read the prompt below and fill out all answer fields accurately.
        </p>
        <SubmissionForm promptEditable={false} givenPrompt={prompts.q1} category={categoryId.toUpperCase()} />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-10">
        <div className="flex-1 h-px bg-[var(--color-border)]"></div>
        <span className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.15em] text-[var(--color-muted)]">QUESTION 02</span>
        <div className="flex-1 h-px bg-[var(--color-border)]"></div>
      </div>

      {/* Question 2 */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-[var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)] font-medium">QUESTION 02</span>
          <span className="font-[var(--font-mono)] text-[0.7rem] text-[var(--color-ink-light)] bg-[var(--color-cream-dark)] px-2 py-0.5">Write your own prompt</span>
        </div>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Write a {cat.title} prompt, matching the difficulty and style of the worked example. The question must be different from Q1 and the example.
        </p>
        <div className="bg-white border border-[var(--color-border)] p-6">
          <label className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-ink-light)] font-medium block mb-1.5">YOUR PROMPT</label>
          <textarea
            placeholder="Write a financial question appropriate for this category..."
            className="w-full p-3 border border-[var(--color-border)] bg-[var(--color-cream)] text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] min-h-[5rem] resize-y"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-10">
        <div className="flex-1 h-px bg-[var(--color-border)]"></div>
        <span className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.15em] text-[var(--color-muted)]">QUESTION 03</span>
        <div className="flex-1 h-px bg-[var(--color-border)]"></div>
      </div>

      {/* Question 3 */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-[var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)] font-medium">QUESTION 03</span>
          <span className="font-[var(--font-mono)] text-[0.7rem] text-[var(--color-ink-light)] bg-[var(--color-cream-dark)] px-2 py-0.5">Write another prompt</span>
        </div>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Write another {cat.title} prompt, different from Q1, Q2, and the example.
        </p>
        <div className="bg-white border border-[var(--color-border)] p-6">
          <label className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-ink-light)] font-medium block mb-1.5">YOUR PROMPT</label>
          <textarea
            placeholder="Write another financial question appropriate for this category..."
            className="w-full p-3 border border-[var(--color-border)] bg-[var(--color-cream)] text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] min-h-[5rem] resize-y"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-10 flex items-center justify-between">
        <Link to="/qualification" className="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]">
          <ArrowLeft size={15} /> Back to categories
        </Link>
        <button
          onClick={handleSubmit}
          className="flex items-center gap-3 px-8 py-4 bg-[var(--color-accent)] text-[var(--color-cream)] text-sm font-medium tracking-wide hover:gap-5 transition-all"
        >
          Submit qualification test
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Reference Panel */}
      <ReferencePanel
        open={refOpen}
        minimized={refMinimized}
        onToggleMin={() => setRefMinimized(!refMinimized)}
        onClose={() => setRefOpen(false)}
        cat={cat}
        example={example}
      />
      {!refOpen && (
        <button
          onClick={() => setRefOpen(true)}
          className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 shadow-lg bg-[var(--color-ink)] text-[var(--color-cream)] text-sm font-medium hover:translate-y-[-2px] transition-all"
        >
          <BookMarked size={15} /> Open reference
        </button>
      )}
    </div>
  );
}
