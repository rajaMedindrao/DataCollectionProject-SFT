import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import CategoryCard from '../../components/CategoryCard';

export default function QualificationHub({ categoryStatus }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      <div className="mb-10">
        <div className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.15em] text-[var(--color-accent)] mb-2">
          QUALIFICATION
        </div>
        <h1 className="font-[var(--font-display)] text-3xl text-[var(--color-ink)] font-medium tracking-tight">
          Choose a category to qualify for.
        </h1>
        <p className="text-sm text-[var(--color-ink-light)] mt-2 max-w-xl leading-relaxed">
          Each category has its own qualification test. Pass with <strong>80% or higher</strong> to unlock data submission and review for that level.
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(CATEGORIES).map(([key, data]) => (
          <CategoryCard
            key={key}
            category={data}
            status={categoryStatus[key]}
            onClick={() => navigate(`/qualification/${key.toLowerCase()}`)}
          />
        ))}
      </div>
    </div>
  );
}
