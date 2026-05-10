import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Award, Shield, ChevronRight, LogOut, BookMarked, Minimize2, Maximize2, X } from 'lucide-react';
import { CATEGORIES, QUAL_EXAMPLES, DATA_SUBMISSION_RUBRIC, JSON_FIELD_GUIDE } from '../../data/categories';
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
            REFERENCE | {cat.title.toUpperCase()}
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
            {tab === 'rubric' && <RubricDisplay rubric={DATA_SUBMISSION_RUBRIC} />}
            {tab === 'rules' && <GuidelinesPanel />}
          </div>
        </>
      )}
    </div>
  );
}

export default function DataSubmissionCategory() {
  const { categoryId } = useParams();
  const [activeTab, setActiveTab] = useState('instructions');
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refOpen, setRefOpen] = useState(true);
  const [refMinimized, setRefMinimized] = useState(false);
  const cat = CATEGORIES[categoryId.toUpperCase()];
  const example = QUAL_EXAMPLES[categoryId.toUpperCase()];

  if (!cat) return <div className="p-8">Category not found.</div>;

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-8 py-16 text-center">
        <div className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.15em] text-[var(--color-success)] mb-3">SUBMITTED</div>
        <h1 className="font-[var(--font-display)] text-3xl text-[var(--color-ink)] font-medium mb-4">
          Submission received.
        </h1>
        <p className="text-sm text-[var(--color-ink-light)] leading-relaxed max-w-md mx-auto mb-6">
          The submission will go through automated validation and then human QA review. A notification will be sent with the result.
        </p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => { setSubmitted(false); setShowForm(true); }} className="px-5 py-2.5 bg-[var(--color-ink)] text-[var(--color-cream)] text-sm font-medium">
            Submit another
          </button>
          <Link to="/data-submission" className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--color-border)] text-sm text-[var(--color-ink-light)] font-medium">
            <ArrowLeft size={14} /> Back to categories
          </Link>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="max-w-5xl mx-auto px-8 py-8 pb-32">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.15em] text-[var(--color-accent)]">
              DATA SUBMISSION | {cat.title.toUpperCase()}
            </div>
            <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-ink)] font-medium mt-1">
              Create a new submission
            </h1>
            <p className="text-sm text-[var(--color-muted)] mt-1">
              Write both the prompt and the full answer. Max {cat.maxSubmissions} submissions per profile in this category.
            </p>
          </div>
          <Link
            to="/data-submission"
            className="flex items-center gap-2 px-3 py-1.5 border border-[var(--color-danger)] text-[var(--color-danger)] text-sm font-medium hover:bg-[#FBF0EB] transition-colors"
          >
            <LogOut size={14} /> Exit
          </Link>
        </div>
        <SubmissionForm
          promptEditable={true}
          category={categoryId.toUpperCase()}
          onSubmit={() => setSubmitted(true)}
        />

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

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <div className="mb-8">
        <div className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.15em] text-[var(--color-accent)] mb-2">
          DATA SUBMISSION | {cat.title.toUpperCase()}
        </div>
        <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-ink)] font-medium tracking-tight">
          {cat.subtitle}
        </h1>
        <p className="text-sm text-[var(--color-ink-light)] mt-2 max-w-xl leading-relaxed">
          Review the instructions, rubric, and guidelines before creating a submission. Both the question and the full answer must be provided.
        </p>
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-cream-dark)] border border-[var(--color-border)]">
          <span className="font-[var(--font-mono)] text-[0.72rem] text-[var(--color-ink)] font-medium">
            MAX {cat.maxSubmissions} SUBMISSIONS PER PROFILE
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border)] mb-6">
        {[
          { id: 'instructions', label: 'Instructions & Example', icon: BookOpen },
          { id: 'rubric', label: 'Grading Criteria', icon: Award },
          { id: 'rules', label: 'Rules & Guidelines', icon: Shield },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 -mb-px text-sm transition-all ${isActive ? 'font-semibold text-[var(--color-ink)] border-b-2 border-[var(--color-accent)]' : 'text-[var(--color-muted)] border-b-2 border-transparent'}`}
            >
              <Icon size={15} /> {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'instructions' && (
        <div className="space-y-6">
          <div>
            <div className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-accent)] mb-2">WHAT TO DO</div>
            <div className="bg-white border border-[var(--color-border)] p-5 space-y-3">
              <p className="text-sm text-[var(--color-ink)] leading-relaxed">
                Create a finance question appropriate for {cat.title} and provide a complete expert-level answer. Each submission must include:
              </p>
              <ul className="text-sm text-[var(--color-ink-light)] space-y-1.5 pl-4">
                <li>• A well-crafted prompt matching {cat.title} difficulty</li>
                <li>• An accurate expert answer with supporting facts and page references</li>
                <li>• Clear justification showing the reasoning (especially for computations)</li>
                <li>• Complete document metadata with verified SEC URLs</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-accent)] mb-2">CATEGORY DESCRIPTION</div>
            <p className="text-sm text-[var(--color-ink)] leading-relaxed">{cat.intro}</p>
          </div>

          {/* Field guide */}
          <div>
            <div className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-accent)] mb-2">WHAT TO PUT IN EACH FIELD</div>
            <div className="bg-white border border-[var(--color-border)]">
              {JSON_FIELD_GUIDE.map((item, i) => (
                <div key={i} className="flex gap-4 px-4 py-3 border-b last:border-b-0 border-[var(--color-cream-dark)]">
                  <code className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] font-medium min-w-[9rem] shrink-0">{item.key}</code>
                  <span className="text-sm text-[var(--color-ink-light)] leading-relaxed">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-accent)] mb-2">EXAMPLE SUBMISSION</div>
            <div className="p-4 bg-[var(--color-ink)] overflow-x-auto max-h-72 overflow-y-auto">
              <pre className="font-[var(--font-mono)] text-xs text-[var(--color-cream)] leading-relaxed">
                {JSON.stringify(example.filledJson, null, 2)}
              </pre>
            </div>
          </div>

          <div className="p-4 bg-[var(--color-cream-dark)] border border-[var(--color-border)] flex gap-3">
            <span className="text-[var(--color-accent)] mt-0.5">✦</span>
            <div>
              <div className="text-sm font-semibold text-[var(--color-ink)] mb-1">Why this passes</div>
              <p className="text-sm text-[var(--color-ink-light)] leading-relaxed">{example.whyItPasses}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rubric' && <RubricDisplay rubric={DATA_SUBMISSION_RUBRIC} />}
      {activeTab === 'rules' && <GuidelinesPanel />}

      {/* Navigation */}
      <div className="mt-10 pt-8 border-t border-[var(--color-border)] flex items-center justify-between">
        <Link to="/data-submission" className="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]">
          <ArrowLeft size={15} /> Back to categories
        </Link>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-3 px-7 py-3.5 bg-[var(--color-ink)] text-[var(--color-cream)] text-sm font-medium hover:gap-5 transition-all"
        >
          Start new submission
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}
