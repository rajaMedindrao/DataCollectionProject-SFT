import { Link } from 'react-router-dom';
import { ChevronRight, FileText, CheckCircle2 } from 'lucide-react';

export default function ReviewHub({ categoryStatus }) {
  const hasAccess = Object.values(categoryStatus).some(s => s === 'passed');

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      <div className="mb-10">
        <div className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.15em] text-[var(--color-accent)] mb-2">
          REVIEW SUBMISSIONS
        </div>
        <h1 className="font-[var(--font-display)] text-3xl text-[var(--color-ink)] font-medium tracking-tight">
          Review and grade submissions.
        </h1>
        <p className="text-sm text-[var(--color-ink-light)] mt-2 max-w-xl leading-relaxed">
          Grade submissions for quality assurance. Only categories that have been qualified for are accessible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ReviewSectionCard
          to="/review/eval"
          icon={<CheckCircle2 size={20} />}
          title="Eval Review"
          description="Grade qualification test submissions. Score out of 10 according to the rubric."
          hasAccess={hasAccess}
        />
        <ReviewSectionCard
          to="/review/data"
          icon={<FileText size={20} />}
          title="Data Submissions Review"
          description="Review data collection submissions. Accept, edit and resubmit, or reject based on quality criteria."
          hasAccess={hasAccess}
        />
      </div>

      <div className="mt-8 p-4 bg-[var(--color-cream-dark)] border border-[var(--color-border)]">
        <p className="text-sm text-[var(--color-ink-light)]">
          <strong>Note:</strong> Self-authored submissions cannot be reviewed. Reviews are limited per profile.
        </p>
      </div>
    </div>
  );
}

function ReviewSectionCard({ to, icon, title, description, hasAccess }) {
  return (
    <Link
      to={hasAccess ? to : '#'}
      className={`group block bg-white border border-[var(--color-border)] p-6 transition-all ${hasAccess ? 'hover:border-[var(--color-accent)] hover:translate-y-[-2px]' : 'opacity-50 cursor-not-allowed'}`}
      onClick={e => !hasAccess && e.preventDefault()}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-[var(--color-accent)]">{icon}</div>
      </div>
      <h3 className="font-[var(--font-display)] text-lg text-[var(--color-ink)] font-medium mb-2">{title}</h3>
      <p className="text-sm text-[var(--color-ink-light)] leading-relaxed mb-4">{description}</p>
      {hasAccess ? (
        <div className="flex items-center gap-1 text-sm text-[var(--color-accent)] font-medium group-hover:gap-2 transition-all">
          Enter <ChevronRight size={14} />
        </div>
      ) : (
        <span className="text-xs font-[var(--font-mono)] text-[var(--color-muted)]">PASS A QUALIFICATION TO UNLOCK</span>
      )}
    </Link>
  );
}
