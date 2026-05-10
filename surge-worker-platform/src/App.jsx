import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import QualificationHub from './pages/qualification/QualificationHub';
import QualificationBriefing from './pages/qualification/QualificationBriefing';
import QualificationTest from './pages/qualification/QualificationTest';
import DataSubmissionHub from './pages/datasubmission/DataSubmissionHub';
import DataSubmissionCategory from './pages/datasubmission/DataSubmissionCategory';
import ReviewHub from './pages/review/ReviewHub';
import EvalReview from './pages/review/EvalReview';
import DataReview from './pages/review/DataReview';

export default function App() {
  const [categoryStatus, setCategoryStatus] = useState({
    A: 'passed',
    B: 'unlocked',
    C: 'locked'
  });

  const handleQualComplete = (catId) => {
    setCategoryStatus(prev => {
      const updated = { ...prev, [catId]: 'passed' };
      if (catId === 'A') updated.B = 'unlocked';
      if (catId === 'B') updated.C = 'unlocked';
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qualification" element={<QualificationHub categoryStatus={categoryStatus} />} />
        <Route path="/qualification/:categoryId" element={<QualificationBriefing />} />
        <Route path="/qualification/:categoryId/test" element={<QualificationTest onComplete={handleQualComplete} />} />
        <Route path="/data-submission" element={<DataSubmissionHub categoryStatus={categoryStatus} />} />
        <Route path="/data-submission/:categoryId" element={<DataSubmissionCategory />} />
        <Route path="/review" element={<ReviewHub categoryStatus={categoryStatus} />} />
        <Route path="/review/eval" element={<EvalReview categoryStatus={categoryStatus} />} />
        <Route path="/review/data" element={<DataReview categoryStatus={categoryStatus} />} />
      </Routes>
    </div>
  );
}
