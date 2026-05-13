import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);

  const breadcrumbs = [{ label: 'Home', path: '/' }];
  if (pathParts[0] === 'qualification') {
    breadcrumbs.push({ label: 'Qualification Tests', path: '/qualification' });
    if (pathParts[1]) breadcrumbs.push({ label: `Category ${pathParts[1].toUpperCase()}`, path: null });
  } else if (pathParts[0] === 'data-submission') {
    breadcrumbs.push({ label: 'Data Submission', path: '/data-submission' });
    if (pathParts[1]) breadcrumbs.push({ label: `Category ${pathParts[1].toUpperCase()}`, path: null });
  } else if (pathParts[0] === 'review') {
    breadcrumbs.push({ label: 'Review Submissions', path: '/review' });
    if (pathParts[1]) breadcrumbs.push({ label: pathParts[1] === 'eval' ? 'Eval Review' : 'Data Review', path: null });
  }

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-cream)] sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center bg-[var(--color-ink)]">
            <span className="font-[var(--font-display)] text-[var(--color-cream)] text-lg font-semibold">P</span>
          </div>
          <div className="flex flex-col">
            <span className="font-[var(--font-body)] text-sm tracking-wide text-[var(--color-ink)] font-medium leading-tight">
              Post Training Data Collection
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-2 font-[var(--font-mono)] text-xs text-[var(--color-muted)]">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <ChevronRight size={11} />}
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-[var(--color-ink)] transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[var(--color-ink)]">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}
