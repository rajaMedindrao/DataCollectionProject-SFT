export default function RubricDisplay({ rubric }) {
  if (!rubric) return null;

  if (rubric.criteria) {
    return (
      <div>
        <div className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-accent)] mb-2">
          {rubric.title?.toUpperCase() || 'GRADING RUBRIC'}
        </div>
        {rubric.note && (
          <p className="text-sm text-[var(--color-ink-light)] mb-4 leading-relaxed">{rubric.note}</p>
        )}
        <div className="bg-white border border-[var(--color-border)]">
          {rubric.criteria.map((criterion, i) => (
            <div key={i} className="p-4 border-b last:border-b-0 border-[var(--color-border)]">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-medium text-[var(--color-ink)]">{criterion.name}</h4>
                {criterion.weight && <span className="font-[var(--font-mono)] text-xs text-[var(--color-accent)]">{criterion.weight}</span>}
              </div>
              {criterion.description && (
                <p className="text-sm text-[var(--color-ink-light)] leading-relaxed">{criterion.description}</p>
              )}
              {criterion.levels && (
                <div className="mt-2 space-y-1">
                  {criterion.levels.map((level, j) => (
                    <div key={j} className="flex gap-3">
                      <span className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] min-w-[2rem] font-medium">
                        {level.score || level.label}
                      </span>
                      <span className="text-sm text-[var(--color-ink-light)] leading-relaxed">{level.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {rubric.passingScore && (
          <div className="mt-3 p-3 bg-[var(--color-cream-dark)] border border-[var(--color-border)]">
            <p className="text-sm font-medium text-[var(--color-ink)]">{rubric.passingScore}</p>
          </div>
        )}
        {rubric.totalNote && (
          <p className="mt-2 text-xs text-[var(--color-muted)] italic">{rubric.totalNote}</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-accent)] mb-2">
        GRADING RUBRIC
      </div>
      <div className="bg-white border border-[var(--color-border)]">
        {rubric.q1Criteria?.map((criterion, i) => (
          <div key={i} className="p-4 border-b last:border-b-0 border-[var(--color-border)]">
            <div className="flex justify-between items-baseline mb-1">
              <h4 className="font-medium text-[var(--color-ink)]">{criterion.name}</h4>
              <span className="font-[var(--font-mono)] text-xs text-[var(--color-accent)]">{criterion.weight}</span>
            </div>
            <div className="mt-2 space-y-1">
              {criterion.levels.map((level, j) => (
                <div key={j} className="flex gap-3">
                  <span className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] min-w-[1.5rem] font-medium">{level.score}</span>
                  <span className="text-sm text-[var(--color-ink-light)] leading-relaxed">{level.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {rubric.q2q3Criteria?.map((criterion, i) => (
          <div key={`q2-${i}`} className="p-4 border-b last:border-b-0 border-[var(--color-border)]">
            <div className="flex justify-between items-baseline mb-1">
              <h4 className="font-medium text-[var(--color-ink)]">{criterion.name} (Q2 & Q3)</h4>
              <span className="font-[var(--font-mono)] text-xs text-[var(--color-accent)]">{criterion.weight}</span>
            </div>
            <div className="mt-2 space-y-1">
              {criterion.levels.map((level, j) => (
                <div key={j} className="flex gap-3">
                  <span className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] min-w-[1.5rem] font-medium">{level.score}</span>
                  <span className="text-sm text-[var(--color-ink-light)] leading-relaxed">{level.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {rubric.passingScore && (
        <div className="mt-3 p-3 bg-[var(--color-cream-dark)] border border-[var(--color-border)]">
          <p className="text-sm font-medium text-[var(--color-ink)]">{rubric.passingScore}</p>
        </div>
      )}
      {rubric.totalNote && (
        <p className="mt-2 text-xs text-[var(--color-muted)] italic">{rubric.totalNote}</p>
      )}
    </div>
  );
}
