import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Lock, Edit3, Check, X, Plus, Trash2 } from 'lucide-react';
import { CATEGORIES, SAMPLE_SUBMISSIONS, REVIEW_RUBRIC } from '../../data/categories';
import RubricDisplay from '../../components/RubricDisplay';

export default function DataReview({ categoryStatus }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  if (selectedSubmission) {
    return <ReviewScreen submission={selectedSubmission} onBack={() => setSelectedSubmission(null)} category={selectedCategory} />;
  }

  if (selectedCategory) {
    const submissions = SAMPLE_SUBMISSIONS[selectedCategory] || [];
    return (
      <div className="max-w-5xl mx-auto px-8 py-10">
        <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-2 text-sm text-[var(--color-muted)] mb-6 hover:text-[var(--color-ink)]">
          <ArrowLeft size={15} /> Back to categories
        </button>
        <div className="mb-6">
          <div className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.15em] text-[var(--color-accent)] mb-2">
            DATA REVIEW | CATEGORY {selectedCategory}
          </div>
          <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-ink)] font-medium">
            Submissions available for review
          </h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            Reviews are limited per profile in this category.
          </p>
        </div>

        <div className="space-y-3">
          {submissions.map(sub => (
            <div key={sub.id} className="bg-white border border-[var(--color-border)] p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-[var(--font-mono)] text-xs text-[var(--color-accent)]">{sub.id}</span>
                    <StatusBadge status={sub.status} />
                  </div>
                  <p className="text-sm text-[var(--color-ink)] leading-relaxed mb-1 max-w-lg">{sub.prompt}</p>
                  <p className="text-xs text-[var(--color-muted)]">{sub.submitted_at}</p>
                </div>
                {sub.status === 'pending_review' && (
                  <button
                    onClick={() => setSelectedSubmission(sub)}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--color-ink)] text-[var(--color-cream)] text-sm font-medium shrink-0"
                  >
                    Review <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
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
          DATA SUBMISSIONS REVIEW
        </div>
        <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-ink)] font-medium">
          Select a category to review data submissions.
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

function buildEditableDocuments(docs) {
  if (!docs || docs.length === 0) {
    return [{ metadata: { company_name: '', ticker: '', CIK: '', doc_type: '10-K', filing_date: '', doc_period: '' }, sec_url: '', pdf_url: '' }];
  }
  return docs.map(d => ({
    metadata: { ...d.metadata },
    sec_url: d.sec_url || '',
    pdf_url: d.pdf_url || '',
  }));
}

function ReviewScreen({ submission, onBack, category }) {
  const [decision, setDecision] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [editing, setEditing] = useState(false);

  const [prompt, setPrompt] = useState(submission.prompt || '');
  const [expertAnswer, setExpertAnswer] = useState(submission.expert_answer || '');
  const [supportingFacts, setSupportingFacts] = useState(submission.supporting_facts || '');
  const [justification, setJustification] = useState(submission.justification || '');
  const [documents, setDocuments] = useState(buildEditableDocuments(submission.documents));

  const handleDecision = (id) => {
    setDecision(id);
    setEditing(id === 'fix');
  };

  const updateDocMeta = (docIdx, field, value) => {
    setDocuments(prev => prev.map((d, i) => i === docIdx ? { ...d, metadata: { ...d.metadata, [field]: value } } : d));
  };

  const updateDocField = (docIdx, field, value) => {
    setDocuments(prev => prev.map((d, i) => i === docIdx ? { ...d, [field]: value } : d));
  };

  const addDocument = () => {
    setDocuments(prev => [...prev, { metadata: { company_name: '', ticker: '', CIK: '', doc_type: '10-K', filing_date: '', doc_period: '' }, sec_url: '', pdf_url: '' }]);
  };

  const removeDocument = (idx) => {
    if (documents.length > 1) setDocuments(prev => prev.filter((_, i) => i !== idx));
  };

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

  const inputClass = "w-full p-3 border border-[var(--color-border)] bg-[var(--color-cream)] text-sm focus:outline-none focus:border-[var(--color-accent)]";
  const readOnlyClass = "text-sm text-[var(--color-ink)] leading-relaxed bg-[var(--color-cream)] p-3 border border-[var(--color-border)]";

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-[var(--color-muted)] mb-6 hover:text-[var(--color-ink)]">
        <ArrowLeft size={15} /> Back to list
      </button>

      <div className="mb-6">
        <div className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.15em] text-[var(--color-accent)] mb-2">
          REVIEWING | {submission.id}
        </div>
        <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-ink)] font-medium">
          Review this data submission
        </h1>
        {editing && (
          <p className="text-sm text-[var(--color-accent)] mt-1 font-medium">Editing mode: modify the fields below, then submit your review.</p>
        )}
      </div>

      {/* Submission content - editable when decision is "fix" */}
      <div className="bg-white border border-[var(--color-border)] p-5 mb-6 space-y-4">
        <div className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-accent)]">SUBMISSION CONTENT</div>

        <div>
          <div className="font-[var(--font-mono)] text-[0.65rem] text-[var(--color-muted)] mb-1">PROMPT</div>
          {editing ? (
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)} className={inputClass + " min-h-[4rem] resize-y"} />
          ) : (
            <p className={readOnlyClass + " italic"}>"{prompt}"</p>
          )}
        </div>

        <div>
          <div className="font-[var(--font-mono)] text-[0.65rem] text-[var(--color-muted)] mb-1">EXPERT ANSWER</div>
          {editing ? (
            <textarea value={expertAnswer} onChange={e => setExpertAnswer(e.target.value)} className={inputClass + " min-h-[4rem] resize-y"} />
          ) : (
            <p className={readOnlyClass}>{expertAnswer}</p>
          )}
        </div>

        <div>
          <div className="font-[var(--font-mono)] text-[0.65rem] text-[var(--color-muted)] mb-1">SUPPORTING FACTS</div>
          {editing ? (
            <textarea value={supportingFacts} onChange={e => setSupportingFacts(e.target.value)} className={inputClass + " min-h-[4rem] resize-y"} />
          ) : (
            <p className={readOnlyClass}>{supportingFacts}</p>
          )}
        </div>

        <div>
          <div className="font-[var(--font-mono)] text-[0.65rem] text-[var(--color-muted)] mb-1">JUSTIFICATION</div>
          {editing ? (
            <textarea value={justification} onChange={e => setJustification(e.target.value)} className={inputClass + " min-h-[4rem] resize-y"} />
          ) : (
            <p className={readOnlyClass}>{justification}</p>
          )}
        </div>

        {/* Document Metadata */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="font-[var(--font-mono)] text-[0.65rem] text-[var(--color-muted)]">DOCUMENT METADATA</div>
            {editing && (
              <button onClick={addDocument} className="flex items-center gap-1 text-xs text-[var(--color-accent)] font-medium hover:underline">
                <Plus size={12} /> Add document
              </button>
            )}
          </div>
          <div className="space-y-3">
            {documents.map((doc, i) => (
              <div key={i} className="bg-[var(--color-cream)] p-3 border border-[var(--color-border)]">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-[var(--font-mono)] text-[0.6rem] tracking-widest text-[var(--color-accent)]">DOCUMENT {String(i + 1).padStart(2, '0')}</div>
                  {editing && documents.length > 1 && (
                    <button onClick={() => removeDocument(i)} className="text-[var(--color-danger)] hover:opacity-70"><Trash2 size={13} /></button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                  {[
                    { key: 'company_name', label: 'Company' },
                    { key: 'ticker', label: 'Ticker' },
                    { key: 'CIK', label: 'CIK' },
                    { key: 'doc_type', label: 'Doc Type' },
                    { key: 'filing_date', label: 'Filing Date' },
                    { key: 'doc_period', label: 'Period' },
                  ].map(f => (
                    <div key={f.key}>
                      <span className="font-[var(--font-mono)] text-[0.6rem] text-[var(--color-muted)]">{f.label}</span>
                      {editing ? (
                        <input
                          value={doc.metadata[f.key]}
                          onChange={e => updateDocMeta(i, f.key, e.target.value)}
                          className="w-full mt-0.5 p-1.5 border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:border-[var(--color-accent)]"
                        />
                      ) : (
                        <p className="text-sm text-[var(--color-ink)]">{doc.metadata[f.key]}</p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-2 space-y-1">
                  <div>
                    <span className="font-[var(--font-mono)] text-[0.6rem] text-[var(--color-muted)]">SEC URL</span>
                    {editing ? (
                      <input value={doc.sec_url} onChange={e => updateDocField(i, 'sec_url', e.target.value)} className="w-full mt-0.5 p-1.5 border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:border-[var(--color-accent)]" />
                    ) : (
                      <p className="text-xs text-[var(--color-ink)] break-all">{doc.sec_url}</p>
                    )}
                  </div>
                  <div>
                    <span className="font-[var(--font-mono)] text-[0.6rem] text-[var(--color-muted)]">PDF URL</span>
                    {editing ? (
                      <input value={doc.pdf_url} onChange={e => updateDocField(i, 'pdf_url', e.target.value)} className="w-full mt-0.5 p-1.5 border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:border-[var(--color-accent)]" />
                    ) : (
                      <p className="text-xs text-[var(--color-ink)] break-all">{doc.pdf_url || 'N/A'}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rubric reference */}
      <div className="mb-6">
        <RubricDisplay rubric={REVIEW_RUBRIC} />
      </div>

      {/* Review form */}
      <div className="bg-white border border-[var(--color-border)] p-6 space-y-5">
        <h3 className="font-medium text-[var(--color-ink)]">Your Review</h3>

        <div>
          <label className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-ink-light)] font-medium block mb-2">DECISION</label>
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'accept', label: 'Accept', icon: Check, color: 'var(--color-success)' },
              { id: 'fix', label: 'Edit & Resubmit', icon: Edit3, color: 'var(--color-accent)' },
              { id: 'reject', label: 'Reject', icon: X, color: 'var(--color-danger)' },
            ].map(opt => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleDecision(opt.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border transition-colors ${decision === opt.id ? 'border-[var(--color-accent)] bg-[var(--color-cream-dark)]' : 'border-[var(--color-border)] hover:border-[var(--color-accent)]'}`}
                >
                  <Icon size={14} style={{ color: opt.color }} />
                  {opt.label}
                </button>
              );
            })}
          </div>
          {editing && (
            <p className="text-xs text-[var(--color-accent)] mt-2">The submission fields above are now editable. Make corrections before submitting.</p>
          )}
        </div>

        <div>
          <label className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-ink-light)] font-medium block mb-1.5">REVIEWER NOTES</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Explain your decision. If fixing, describe what needs to change..."
            className="w-full p-3 border border-[var(--color-border)] bg-[var(--color-cream)] text-sm min-h-[5rem] resize-y focus:outline-none focus:border-[var(--color-accent)]"
          />
        </div>

        <div className="pt-4 border-t border-[var(--color-border)] flex items-center gap-3">
          <button
            onClick={() => setSubmitted(true)}
            className="px-6 py-3 bg-[var(--color-accent)] text-[var(--color-cream)] text-sm font-medium"
          >
            Submit Review
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

function StatusBadge({ status }) {
  const styles = {
    pending_review: { bg: '#FFF8E1', color: '#8B6914', text: 'Pending Review' },
    accepted: { bg: '#EDF2E7', color: 'var(--color-success)', text: 'Accepted' },
    needs_fix: { bg: '#FBF0EB', color: 'var(--color-danger)', text: 'Needs Fix' },
  };
  const s = styles[status] || styles.pending_review;
  return (
    <span className="font-[var(--font-mono)] text-[0.65rem] px-2 py-0.5" style={{ backgroundColor: s.bg, color: s.color }}>
      {s.text.toUpperCase()}
    </span>
  );
}
