import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Lock } from 'lucide-react';
import { CATEGORIES, SAMPLE_QUAL_SUBMISSIONS, QUAL_RUBRIC } from '../../data/categories';
import RubricDisplay from '../../components/RubricDisplay';

export default function EvalReview({ categoryStatus }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  if (selectedSubmission) {
    return <GradingScreen submission={selectedSubmission} category={selectedCategory} onBack={() => setSelectedSubmission(null)} />;
  }

  if (selectedCategory) {
    const submissions = SAMPLE_QUAL_SUBMISSIONS[selectedCategory] || [];
    return (
      <div className="max-w-5xl mx-auto px-8 py-10">
        <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-2 text-sm text-[var(--color-muted)] mb-6 hover:text-[var(--color-ink)]">
          <ArrowLeft size={15} /> Back to categories
        </button>
        <div className="mb-6">
          <div className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.15em] text-[var(--color-accent)] mb-2">
            EVAL REVIEW | CATEGORY {selectedCategory}
          </div>
          <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-ink)] font-medium">
            Available qualification submissions to review
          </h1>
        </div>

        {submissions.length === 0 ? (
          <div className="bg-white border border-[var(--color-border)] p-8 text-center">
            <p className="text-sm text-[var(--color-muted)]">No submissions available for review at this time.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {submissions.map(sub => (
              <div key={sub.id} className="bg-white border border-[var(--color-border)] p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-[var(--font-mono)] text-xs text-[var(--color-accent)]">{sub.id}</span>
                    <StatusBadge status={sub.status} />
                  </div>
                  <p className="text-sm text-[var(--color-ink-light)]">Submitted on {sub.submitted_at}</p>
                  {sub.score !== null && <p className="text-sm font-medium text-[var(--color-ink)] mt-1">Score: {sub.score}/10</p>}
                </div>
                {sub.status === 'pending_review' && (
                  <button
                    onClick={() => setSelectedSubmission(sub)}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--color-ink)] text-[var(--color-cream)] text-sm font-medium"
                  >
                    Grade <ChevronRight size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <Link to="/review" className="flex items-center gap-2 text-sm text-[var(--color-muted)] mb-6 hover:text-[var(--color-ink)]">
        <ArrowLeft size={15} /> Back to review hub
      </Link>
      <div className="mb-8">
        <div className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.15em] text-[var(--color-accent)] mb-2">
          EVAL REVIEW
        </div>
        <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-ink)] font-medium">
          Select a category to review qualification submissions.
        </h1>
      </div>

      <div className="space-y-3">
        {Object.entries(CATEGORIES).map(([key, cat]) => {
          const hasAccess = categoryStatus[key] === 'passed';
          return (
            <button
              key={key}
              disabled={!hasAccess}
              onClick={() => setSelectedCategory(key)}
              className={`w-full text-left bg-white border border-[var(--color-border)] p-4 flex items-center justify-between transition-all ${hasAccess ? 'hover:border-[var(--color-accent)]' : 'opacity-50 cursor-not-allowed'}`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-[var(--font-mono)] text-xs text-[var(--color-accent)]">{cat.title.toUpperCase()}</span>
                  {!hasAccess && <Lock size={12} className="text-[var(--color-muted)]" />}
                </div>
                <p className="text-sm text-[var(--color-ink-light)] mt-1">{cat.subtitle}</p>
              </div>
              {hasAccess && <ChevronRight size={16} className="text-[var(--color-ink)]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DocumentMetadataDisplay({ documents }) {
  if (!documents || documents.length === 0) return null;
  return (
    <div>
      <div className="font-[var(--font-mono)] text-[0.65rem] text-[var(--color-muted)] mb-1">DOCUMENT METADATA</div>
      <div className="space-y-3">
        {documents.map((doc, i) => (
          <div key={i} className="bg-[var(--color-cream)] p-3 border border-[var(--color-border)]">
            <div className="font-[var(--font-mono)] text-[0.6rem] tracking-widest text-[var(--color-accent)] mb-2">DOCUMENT {String(i + 1).padStart(2, '0')}</div>
            <div className="grid grid-cols-3 gap-x-4 gap-y-2">
              <div>
                <span className="font-[var(--font-mono)] text-[0.6rem] text-[var(--color-muted)]">Company</span>
                <p className="text-sm text-[var(--color-ink)]">{doc.metadata.company_name}</p>
              </div>
              <div>
                <span className="font-[var(--font-mono)] text-[0.6rem] text-[var(--color-muted)]">Ticker</span>
                <p className="text-sm text-[var(--color-ink)]">{doc.metadata.ticker}</p>
              </div>
              <div>
                <span className="font-[var(--font-mono)] text-[0.6rem] text-[var(--color-muted)]">CIK</span>
                <p className="text-sm text-[var(--color-ink)]">{doc.metadata.CIK}</p>
              </div>
              <div>
                <span className="font-[var(--font-mono)] text-[0.6rem] text-[var(--color-muted)]">Doc Type</span>
                <p className="text-sm text-[var(--color-ink)]">{doc.metadata.doc_type}</p>
              </div>
              <div>
                <span className="font-[var(--font-mono)] text-[0.6rem] text-[var(--color-muted)]">Filing Date</span>
                <p className="text-sm text-[var(--color-ink)]">{doc.metadata.filing_date}</p>
              </div>
              <div>
                <span className="font-[var(--font-mono)] text-[0.6rem] text-[var(--color-muted)]">Period</span>
                <p className="text-sm text-[var(--color-ink)]">{doc.metadata.doc_period}</p>
              </div>
            </div>
            <div className="mt-2 space-y-1">
              <div>
                <span className="font-[var(--font-mono)] text-[0.6rem] text-[var(--color-muted)]">SEC URL</span>
                <p className="text-xs text-[var(--color-ink)] break-all">{doc.sec_url}</p>
              </div>
              {doc.pdf_url && (
                <div>
                  <span className="font-[var(--font-mono)] text-[0.6rem] text-[var(--color-muted)]">PDF URL</span>
                  <p className="text-xs text-[var(--color-ink)] break-all">{doc.pdf_url}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GradingScreen({ submission, category, onBack }) {
  const [scores, setScores] = useState({ answer: '', facts: '', justification: '', schema: '', q2: '', q3: '' });
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-8 py-16 text-center">
        <div className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.15em] text-[var(--color-success)] mb-3">REVIEW SUBMITTED</div>
        <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-ink)] font-medium mb-4">The review has been recorded.</h1>
        <button onClick={onBack} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-ink)] text-[var(--color-cream)] text-sm font-medium mt-4">
          <ArrowLeft size={14} /> Back to submissions
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-[var(--color-muted)] mb-6 hover:text-[var(--color-ink)]">
        <ArrowLeft size={15} /> Back to list
      </button>

      <div className="mb-6">
        <div className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.15em] text-[var(--color-accent)] mb-2">
          GRADING | {submission.id}
        </div>
        <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-ink)] font-medium">
          Grade this qualification submission
        </h1>
      </div>

      {/* Submitted content */}
      <div className="bg-white border border-[var(--color-border)] p-5 mb-6 space-y-4">
        <div className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-accent)]">SUBMITTED ANSWERS</div>

        <div>
          <div className="font-[var(--font-mono)] text-[0.65rem] text-[var(--color-muted)] mb-1">QUESTION 1: PROMPT (GIVEN)</div>
          <p className="text-sm text-[var(--color-ink)] italic leading-relaxed bg-[var(--color-cream)] p-3 border border-[var(--color-border)]">"{submission.q1_prompt}"</p>
        </div>
        <div>
          <div className="font-[var(--font-mono)] text-[0.65rem] text-[var(--color-muted)] mb-1">EXPERT ANSWER</div>
          <p className="text-sm text-[var(--color-ink)] leading-relaxed bg-[var(--color-cream)] p-3 border border-[var(--color-border)]">{submission.q1_answer}</p>
        </div>
        <div>
          <div className="font-[var(--font-mono)] text-[0.65rem] text-[var(--color-muted)] mb-1">SUPPORTING FACTS</div>
          <p className="text-sm text-[var(--color-ink)] leading-relaxed bg-[var(--color-cream)] p-3 border border-[var(--color-border)]">{submission.q1_facts}</p>
        </div>
        <div>
          <div className="font-[var(--font-mono)] text-[0.65rem] text-[var(--color-muted)] mb-1">JUSTIFICATION</div>
          <p className="text-sm text-[var(--color-ink)] leading-relaxed bg-[var(--color-cream)] p-3 border border-[var(--color-border)]">{submission.q1_justification}</p>
        </div>

        <DocumentMetadataDisplay documents={submission.q1_documents} />

        <div className="border-t border-[var(--color-border)] pt-4">
          <div className="font-[var(--font-mono)] text-[0.65rem] text-[var(--color-muted)] mb-1">QUESTION 2: SELF-WRITTEN PROMPT</div>
          <p className="text-sm text-[var(--color-ink)] italic leading-relaxed bg-[var(--color-cream)] p-3 border border-[var(--color-border)]">"{submission.q2_prompt}"</p>
        </div>

        <div>
          <div className="font-[var(--font-mono)] text-[0.65rem] text-[var(--color-muted)] mb-1">QUESTION 3: SELF-WRITTEN PROMPT</div>
          <p className="text-sm text-[var(--color-ink)] italic leading-relaxed bg-[var(--color-cream)] p-3 border border-[var(--color-border)]">"{submission.q3_prompt}"</p>
        </div>
      </div>

      {/* Rubric */}
      <div className="mb-8">
        <RubricDisplay rubric={QUAL_RUBRIC} />
      </div>

      {/* Scoring form */}
      <div className="bg-white border border-[var(--color-border)] p-6 space-y-4">
        <h3 className="font-medium text-[var(--color-ink)]">Scores</h3>

        <div className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-accent)] mt-2">QUESTION 1</div>
        <div className="grid grid-cols-2 gap-4">
          <ScoreInput label="Expert Answer & Accuracy" value={scores.answer} onChange={v => setScores(p => ({ ...p, answer: v }))} />
          <ScoreInput label="Supporting Facts" value={scores.facts} onChange={v => setScores(p => ({ ...p, facts: v }))} />
          <ScoreInput label="Justification" value={scores.justification} onChange={v => setScores(p => ({ ...p, justification: v }))} />
          <ScoreInput label="Schema Compliance" value={scores.schema} onChange={v => setScores(p => ({ ...p, schema: v }))} />
        </div>

        <div className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-accent)] mt-4">QUESTIONS 2 & 3</div>
        <div className="grid grid-cols-2 gap-4">
          <ScoreInput label="Question 2" value={scores.q2} onChange={v => setScores(p => ({ ...p, q2: v }))} />
          <ScoreInput label="Question 3" value={scores.q3} onChange={v => setScores(p => ({ ...p, q3: v }))} />
        </div>

        <div>
          <label className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-ink-light)] font-medium block mb-1.5">REVIEWER NOTES</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Optional notes about this submission..."
            className="w-full p-3 border border-[var(--color-border)] bg-[var(--color-cream)] text-sm min-h-[4rem] resize-y focus:outline-none focus:border-[var(--color-accent)]"
          />
        </div>

        <div className="pt-4 border-t border-[var(--color-border)] flex items-center gap-3">
          <button
            onClick={() => setSubmitted(true)}
            className="px-6 py-3 bg-[var(--color-accent)] text-[var(--color-cream)] text-sm font-medium"
          >
            Submit
          </button>
          <button
            onClick={onBack}
            className="px-6 py-3 border border-[var(--color-border)] text-sm text-[var(--color-ink-light)] font-medium hover:bg-[var(--color-cream-dark)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoreInput({ label, value, onChange }) {
  return (
    <div>
      <span className="text-xs text-[var(--color-muted)]">{label}</span>
      <input
        type="number"
        step="0.5"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full mt-1 p-2 border border-[var(--color-border)] bg-[var(--color-cream)] text-sm focus:outline-none focus:border-[var(--color-accent)]"
      />
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending_review: { bg: '#FFF8E1', color: '#8B6914', text: 'Pending Review' },
    graded: { bg: '#EDF2E7', color: 'var(--color-success)', text: 'Graded' },
  };
  const s = styles[status] || styles.pending_review;
  return (
    <span className="font-[var(--font-mono)] text-[0.65rem] px-2 py-0.5" style={{ backgroundColor: s.bg, color: s.color }}>
      {s.text.toUpperCase()}
    </span>
  );
}
