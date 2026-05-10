import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import CategoryCard from '../../components/CategoryCard';

export default function DataSubmissionHub({ categoryStatus }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      <div className="mb-10">
        <div className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.15em] text-[var(--color-accent)] mb-2">
          DATA SUBMISSION
        </div>
        <h1 className="font-[var(--font-display)] text-3xl text-[var(--color-ink)] font-medium tracking-tight">
          Submit financial data for AI training.
        </h1>
        <p className="text-sm text-[var(--color-ink-light)] mt-2 max-w-xl leading-relaxed">
          Create finance questions and expert-level answers based on SEC filings. Only categories that have been qualified for are accessible.
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(CATEGORIES).map(([key, data]) => {
          const status = categoryStatus[key] === 'passed' ? 'unlocked' : 'locked';
          return (
            <CategoryCard
              key={key}
              category={data}
              status={status}
              onClick={() => navigate(`/data-submission/${key.toLowerCase()}`)}
            />
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-[var(--color-cream-dark)] border border-[var(--color-border)]">
        <p className="text-sm text-[var(--color-ink-light)]">
          <strong>Note:</strong> The qualification test for a category must be passed before data can be submitted at that level. Submissions are limited to 10 per profile per category.
        </p>
      </div>
    </div>
  );
}
