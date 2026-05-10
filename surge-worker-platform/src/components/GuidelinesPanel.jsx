import { AlertTriangle, X, ExternalLink } from 'lucide-react';
import { GUIDELINES, SEC_ACCESS_STEPS, AUTO_REJECT_CRITERIA } from '../data/categories';

export default function GuidelinesPanel() {
  return (
    <div className="space-y-6">
      <div>
        <div className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-accent)] mb-3">
          GUIDELINES
        </div>
        <ul className="space-y-2.5">
          {GUIDELINES.map((rule, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] min-w-[1.5rem]">0{i + 1}</span>
              <span className="text-sm text-[var(--color-ink-light)] leading-relaxed">{rule}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-accent)] mb-3">
          HOW TO ACCESS SEC FILINGS
        </div>
        <div className="bg-white border border-[var(--color-border)] p-4 space-y-2">
          {SEC_ACCESS_STEPS.map((step, i) => (
            <div key={i} className="flex gap-3">
              <span className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] min-w-[1.5rem] font-medium">{i + 1}.</span>
              <span className="text-sm text-[var(--color-ink-light)] leading-relaxed">{step}</span>
            </div>
          ))}
          <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
            <a href="https://www.sec.gov/edgar/searchedgar/companysearch" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] font-medium hover:underline">
              <ExternalLink size={13} /> Open SEC EDGAR Search
            </a>
          </div>
        </div>
      </div>

      <div className="p-4 bg-[#FBF0EB] border border-[#E8C9B8]">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={16} className="text-[var(--color-danger)]" />
          <span className="text-sm text-[var(--color-danger)] font-semibold tracking-wide">
            AUTOMATIC REJECTION
          </span>
        </div>
        <p className="text-sm text-[var(--color-ink-light)] mb-3 leading-relaxed">
          Your submission will be automatically rejected if any of the following are identified:
        </p>
        <ul className="space-y-1.5">
          {AUTO_REJECT_CRITERIA.map((rule, i) => (
            <li key={i} className="flex gap-2.5">
              <X size={13} className="text-[var(--color-danger)] mt-0.5 shrink-0" />
              <span className="text-sm text-[var(--color-ink-light)] leading-relaxed">{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
