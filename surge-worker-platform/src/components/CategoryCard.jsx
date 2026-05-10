import { Lock, CheckCircle2, ChevronRight, Clock } from 'lucide-react';

export default function CategoryCard({ category, status, onClick }) {
  const isLocked = status === 'locked';
  const isPassed = status === 'passed';

  return (
    <button
      disabled={isLocked}
      onClick={onClick}
      className={`group text-left w-full transition-all ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:translate-x-1'}`}
      style={{
        backgroundColor: '#FFFFFF',
        border: `1px solid ${isPassed ? 'var(--color-success)' : 'var(--color-border)'}`,
        padding: '1.75rem'
      }}
    >
      <div className="flex items-start justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-[var(--font-mono)] text-xs tracking-wider text-[var(--color-accent)] font-medium">
              {category.title.toUpperCase()}
            </span>
            {[...Array(3)].map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: i < category.difficulty ? 'var(--color-accent)' : 'var(--color-border)' }} />
            ))}
            {isPassed && (
              <span className="flex items-center gap-1.5 px-2 py-0.5 font-[var(--font-mono)] text-[0.7rem] text-[var(--color-success)] bg-[#EDF2E7]">
                <CheckCircle2 size={12} /> PASSED
              </span>
            )}
            {isLocked && (
              <span className="flex items-center gap-1.5 px-2 py-0.5 font-[var(--font-mono)] text-[0.7rem] text-[var(--color-muted)] bg-[var(--color-cream-dark)]">
                <Lock size={11} /> LOCKED
              </span>
            )}
          </div>
          <h3 className="font-[var(--font-display)] text-xl text-[var(--color-ink)] font-medium mb-2">
            {category.subtitle}
          </h3>
          <p className="text-sm text-[var(--color-ink-light)] leading-relaxed max-w-xl">
            {category.description}
          </p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-[var(--color-muted)]" />
              <span className="font-[var(--font-mono)] text-xs text-[var(--color-muted)]">{category.estTime}</span>
            </div>
          </div>
        </div>
        {!isLocked && <ChevronRight size={20} className="mt-2 transition-transform group-hover:translate-x-1 text-[var(--color-ink)]" />}
      </div>
    </button>
  );
}
