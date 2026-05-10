import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, BookOpen, Award, Shield } from 'lucide-react';
import { CATEGORIES, QUAL_EXAMPLES, QUAL_RUBRIC } from '../../data/categories';
import RubricDisplay from '../../components/RubricDisplay';
import GuidelinesPanel from '../../components/GuidelinesPanel';

export default function QualificationBriefing() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('example');
  const cat = CATEGORIES[categoryId.toUpperCase()];
  const example = QUAL_EXAMPLES[categoryId.toUpperCase()];

  if (!cat) return <div className="p-8">Category not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <div className="mb-8">
        <div className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.15em] text-[var(--color-accent)] mb-2">
          {cat.title.toUpperCase()} — PRE-TEST BRIEFING
        </div>
        <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-ink)] font-medium tracking-tight">
          {cat.subtitle}
        </h1>
        <p className="text-sm text-[var(--color-ink-light)] mt-2 max-w-xl leading-relaxed">
          Read everything below before starting. The introduction, example, rubric, and rules will stay accessible during the test, but it is much faster if you internalize them now.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-cream-dark)] border border-[var(--color-border)]">
          <Award size={14} className="text-[var(--color-accent)]" />
          <span className="font-[var(--font-mono)] text-[0.75rem] text-[var(--color-ink)] font-medium tracking-wide">
            YOU NEED 80% (8/10) TO PASS
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border)] mb-6">
        {[
          { id: 'example', label: 'Introduction & Example', icon: BookOpen },
          { id: 'rubric', label: 'Grading Rubric', icon: Award },
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

      {/* Tab Content */}
      {activeTab === 'example' && (
        <div className="space-y-6">
          <div>
            <div className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-accent)] mb-2">ABOUT THIS CATEGORY</div>
            <p className="text-sm text-[var(--color-ink)] leading-relaxed">{cat.intro}</p>
          </div>

          <div>
            <div className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-accent)] mb-2">WHAT TO PUT IN EACH FIELD</div>
            <div className="bg-white border border-[var(--color-border)]">
              {[
                { key: 'prompt', desc: 'The question itself. For Q1 it is given. For Q2 & Q3, you write your own.' },
                { key: 'expert_answer', desc: 'Your factual answer. Be precise — state the number, value, or comparison the prompt asks for.' },
                { key: 'supporting_facts', desc: 'Relevant data from the filing(s) with page references. Self-contained so a reviewer can verify without opening the source PDF.' },
                { key: 'justification', desc: 'Show your reasoning or calculation. Especially important for Category B and C.' },
                { key: 'documents', desc: 'Metadata about each SEC filing used (company, ticker, CIK, doc type, dates) and SEC URL.' },
                { key: 'pii_scrub_confirmed', desc: 'Confirm there is no PII anywhere in your submission.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 px-4 py-3 border-b last:border-b-0 border-[var(--color-cream-dark)]">
                  <code className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] font-medium min-w-[9rem] shrink-0">{item.key}</code>
                  <span className="text-sm text-[var(--color-ink-light)] leading-relaxed">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-accent)] mb-2">EXAMPLE PROMPT</div>
            <div className="p-4 bg-white border border-[var(--color-border)]">
              <p className="text-sm text-[var(--color-ink)] italic leading-relaxed">"{example.prompt}"</p>
            </div>
          </div>

          <div>
            <div className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-accent)] mb-2">EXAMPLE FILLED ANSWER (JSON)</div>
            <div className="p-4 bg-[var(--color-ink)] overflow-x-auto max-h-80 overflow-y-auto">
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

      {activeTab === 'rubric' && <RubricDisplay rubric={QUAL_RUBRIC} />}
      {activeTab === 'rules' && <GuidelinesPanel />}

      {/* Navigation */}
      <div className="mt-10 pt-8 border-t border-[var(--color-border)] flex items-center justify-between">
        <Link to="/qualification" className="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]">
          <ArrowLeft size={15} /> Back to categories
        </Link>
        <button
          onClick={() => navigate(`/qualification/${categoryId}/test`)}
          className="flex items-center gap-3 px-7 py-3.5 bg-[var(--color-ink)] text-[var(--color-cream)] text-sm font-medium hover:gap-5 transition-all"
        >
          I have read everything — start the test
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}
