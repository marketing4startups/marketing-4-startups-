import React, { useState } from 'react';
import { COMPARISON_METRICS } from '../data/mockData';
import { AlertCircle, CheckCircle, ArrowRight, Zap } from 'lucide-react';

interface OutperformanceMatrixProps {
  onOpenBooking: () => void;
}

export const OutperformanceMatrix: React.FC<OutperformanceMatrixProps> = ({ onOpenBooking }) => {
  const [activeMetricId, setActiveMetricId] = useState(COMPARISON_METRICS[0].id);
  const [simulatedMonthlyBudget, setSimulatedMonthlyBudget] = useState(4000);

  const activeMetric = COMPARISON_METRICS.find((m) => m.id === activeMetricId) || COMPARISON_METRICS[0];

  return (
    <section id="outperformance" className="py-16 sm:py-20 md:py-28 bg-[#0B0F17] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-[#C28B52] font-semibold mb-2">
            The Reality Check
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display leading-tight [text-wrap:balance]">
            Why corporate agency playbooks fail startups & how practical methods win
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
            Big corporations have millions to spend on broad awareness campaigns with months of committee approvals. 
            Startups and small businesses need paying customers right away. Here is how a tailored startup strategy 
            outperforms a generic agency approach:
          </p>
        </div>

        {/* Interactive Dimension Selector - Smooth horizontal scroll on mobile with touch swipe */}
        <div className="mt-8 sm:mt-10 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex sm:flex-wrap gap-2 p-1.5 bg-[#101726] rounded-xl border border-white/[0.08] min-w-max sm:min-w-0 max-w-4xl">
            {COMPARISON_METRICS.map((metric) => {
              const isActive = metric.id === activeMetricId;
              return (
                <button
                  key={metric.id}
                  onClick={() => setActiveMetricId(metric.id)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 min-h-[40px] text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C28B52] ${
                    isActive
                      ? 'bg-[#C28B52] text-[#0B0F17] font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {metric.category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Head-to-Head Comparative Cards */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1: Enterprise Playbook Flaw */}
          <div className="p-5 sm:p-7 md:p-8 rounded-xl bg-[#101726]/60 border border-rose-500/20 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5 text-rose-400 shrink-0" aria-hidden="true" />
                <span className="text-[11px] sm:text-xs uppercase tracking-wider text-rose-300 font-semibold">
                  Generic Enterprise Method
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-rose-400/80 font-mono">High Startup Risk</span>
            </div>

            <div className="mt-5 sm:mt-6">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-display">
                {activeMetric.enterpriseFlaw.title}
              </h3>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
                {activeMetric.enterpriseFlaw.description}
              </p>

              <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/[0.06] grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 text-xs">
                <div>
                  <span className="block text-slate-500 uppercase tracking-wider mb-1">Validation Timeline</span>
                  <span className="text-slate-300 font-medium">{activeMetric.enterpriseFlaw.timeline}</span>
                </div>
                <div>
                  <span className="block text-slate-500 uppercase tracking-wider mb-1">Financial Waste</span>
                  <span className="text-rose-300 font-medium">{activeMetric.enterpriseFlaw.costImpact}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Marketing4Startups Tailored Edge */}
          <div className="p-5 sm:p-7 md:p-8 rounded-xl bg-[#101726] border border-[#C28B52]/40 relative overflow-hidden shadow-xl shadow-[#C28B52]/5">
            <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-[#C28B52] shrink-0" aria-hidden="true" />
                <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#C28B52] font-semibold">
                  Marketing4Startups Strategy
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-[#E0A96D] font-mono tabular-nums font-semibold">
                {activeMetric.outperformanceMetric} Outperformance
              </span>
            </div>

            <div className="mt-5 sm:mt-6">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-display">
                {activeMetric.startupEdge.title}
              </h3>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed">
                {activeMetric.startupEdge.description}
              </p>

              <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/[0.06] grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 text-xs">
                <div>
                  <span className="block text-slate-500 uppercase tracking-wider mb-1">Validation Timeline</span>
                  <span className="text-[#E0A96D] font-medium">{activeMetric.startupEdge.timeline}</span>
                </div>
                <div>
                  <span className="block text-slate-500 uppercase tracking-wider mb-1">Budget Allocation</span>
                  <span className="text-emerald-300 font-medium">{activeMetric.startupEdge.costImpact}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Founder Takeaway Banner */}
        <div className="mt-6 p-4 sm:p-5 rounded-lg bg-[#182338]/60 border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-start md:items-center gap-2.5 sm:gap-3">
            <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-[#C28B52] shrink-0 mt-0.5 md:mt-0" />
            <p className="text-xs sm:text-sm text-slate-200">
              <span className="text-white font-semibold">Founder Principle: </span>
              {activeMetric.founderTakeaway}
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C28B52] hover:text-[#E0A96D] whitespace-nowrap self-start md:self-auto py-1"
          >
            <span>Audit My Strategy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Interactive Capital & Velocity Simulator - Mobile & Tablet Optimized */}
        <div className="mt-10 sm:mt-14 p-5 sm:p-8 md:p-10 rounded-2xl bg-[#101726] border border-white/[0.1] relative">
          <div className="max-w-2xl">
            <div className="text-[11px] sm:text-xs uppercase tracking-widest text-[#C28B52] font-semibold mb-1">
              Interactive Marketing Budget & Runway Calculator
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-display">
              See what corporate agency retainers actually cost your business
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Compare how your monthly marketing budget is spent: with a traditional agency versus a focused startup sprint.
            </p>
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-center">
            {/* Slider Control */}
            <div className="lg:col-span-1 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="budget-slider" className="text-xs sm:text-sm text-slate-300 font-medium">
                  Monthly Marketing Budget:
                </label>
                <span className="text-base sm:text-lg font-bold text-[#C28B52] font-mono tabular-nums">
                  €{simulatedMonthlyBudget.toLocaleString()}
                </span>
              </div>
              <input
                id="budget-slider"
                type="range"
                min="2000"
                max="15000"
                step="500"
                value={simulatedMonthlyBudget}
                onChange={(e) => setSimulatedMonthlyBudget(Number(e.target.value))}
                className="w-full h-2.5 sm:h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#C28B52]"
              />
              <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-500 font-mono">
                <span>€2k/mo (Early Stage)</span>
                <span>€8k/mo</span>
                <span>€15k/mo (Scaling Up)</span>
              </div>
            </div>

            {/* Results Grid - Responsive 1 col on mobile, 2 col on tablet & desktop */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {/* Enterprise Result */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#0B0F17]/80 border border-rose-500/20">
                <span className="text-[11px] sm:text-xs uppercase tracking-wider text-rose-300 font-semibold block mb-1 sm:mb-2">
                  Traditional Agency Retainer
                </span>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">
                  ~120 Days
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1">Time before speaking to a real buyer</div>

                <div className="mt-3.5 sm:mt-4 pt-3 border-t border-white/[0.08] text-xs text-slate-300 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Agency overhead & meetings:</span>
                    <span className="text-rose-400 font-mono">~€3,800/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Direct customer outreach:</span>
                    <span className="text-slate-300 font-mono">Slow & Diluted</span>
                  </div>
                </div>
              </div>

              {/* Startup Model Result */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#0B0F17]/80 border border-[#C28B52]/40">
                <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#C28B52] font-semibold block mb-1 sm:mb-2">
                  Tailored Startup Sprint
                </span>
                <div className="text-xl sm:text-2xl font-bold text-[#E0A96D] font-mono tabular-nums">
                  14 Days
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1">Time to live buyer feedback & customer calls</div>

                <div className="mt-3.5 sm:mt-4 pt-3 border-t border-white/[0.08] text-xs text-slate-300 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Spent directly on finding buyers:</span>
                    <span className="text-emerald-400 font-mono font-medium">85% of budget</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Speed of improvements:</span>
                    <span className="text-[#E0A96D] font-mono font-medium">6x faster iterations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
