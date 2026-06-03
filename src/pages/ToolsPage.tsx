import { useState } from 'react';
import { Calculator, Copy, Check } from 'lucide-react';
import { toolTypes } from '../data';

interface Calculator {
  type: string;
  inputs: { label: string; unit: string }[];
  calculate: (inputs: number[]) => number | string;
}

const calculators: Record<string, Calculator> = {
  position_size: {
    type: 'position_size',
    inputs: [
      { label: 'Account Balance', unit: '$' },
      { label: 'Risk %', unit: '%' },
      { label: 'Entry Price', unit: '$' },
      { label: 'Stop Loss Price', unit: '$' },
    ],
    calculate: (inputs) => {
      const [balance, riskPercent, entry, stopLoss] = inputs;
      const riskAmount = balance * (riskPercent / 100);
      const pipsDifference = Math.abs(entry - stopLoss);
      return (riskAmount / pipsDifference).toFixed(2);
    },
  },
  drawdown: {
    type: 'drawdown',
    inputs: [
      { label: 'Account Balance', unit: '$' },
      { label: 'Max Drawdown %', unit: '%' },
    ],
    calculate: (inputs) => {
      const [balance, drawdown] = inputs;
      return (balance * (drawdown / 100)).toFixed(2);
    },
  },
  payout: {
    type: 'payout',
    inputs: [
      { label: 'Net Profit', unit: '$' },
      { label: 'Payout Split %', unit: '%' },
    ],
    calculate: (inputs) => {
      const [profit, split] = inputs;
      return (profit * (split / 100)).toFixed(2);
    },
  },
  risk_reward: {
    type: 'risk_reward',
    inputs: [
      { label: 'Entry Price', unit: '$' },
      { label: 'Stop Loss Price', unit: '$' },
      { label: 'Take Profit Price', unit: '$' },
    ],
    calculate: (inputs) => {
      const [entry, stopLoss, takeProfit] = inputs;
      const risk = Math.abs(entry - stopLoss);
      const reward = Math.abs(takeProfit - entry);
      return (reward / risk).toFixed(2);
    },
  },
  tick_value: {
    type: 'tick_value',
    inputs: [
      { label: 'Tick Size', unit: '' },
      { label: 'Contract Multiplier', unit: '' },
      { label: 'Current Price', unit: '$' },
    ],
    calculate: (inputs) => {
      const [tickSize, multiplier, price] = inputs;
      return (tickSize * multiplier * price).toFixed(2);
    },
  },
};

export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState('position_size');
  const [inputs, setInputs] = useState<number[]>([0, 0, 0, 0]);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const calculator = calculators[selectedTool];

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = parseFloat(value) || 0;
    setInputs(newInputs);
  };

  const handleCalculate = () => {
    const relevantInputs = inputs.slice(0, calculator.inputs.length);
    const calculatedResult = calculator.calculate(relevantInputs);
    setResult(String(calculatedResult));
  };

  const handleCopyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toolInfo = toolTypes.find(t => t.id === selectedTool);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Trading Tools
          </h1>
          <p className="text-xl text-[#D1D5DB] max-w-2xl">
            Professional trading calculators to help you make better decisions. Calculate position sizes, drawdowns, payouts, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tool Selector */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Tools
            </h2>
            <div className="space-y-2">
              {toolTypes.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    setSelectedTool(tool.id);
                    setInputs([0, 0, 0, 0]);
                    setResult(null);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    selectedTool === tool.id
                      ? 'bg-[#22C55E] text-black font-semibold'
                      : 'bg-[#0a0a0a] text-[#D1D5DB] border border-[#22C55E]/20 hover:border-[#22C55E]'
                  }`}
                >
                  {tool.name}
                </button>
              ))}
            </div>
          </div>

          {/* Calculator */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'linear-gradient(135deg, rgba(15,81,50,0.1) 0%, rgba(10,10,10,0.95) 100%)',
                border: '1px solid rgba(34,197,94,0.15)',
              }}
            >
              {/* Tool Info */}
              <div className="mb-8">
                <div className="flex items-start gap-3 mb-4">
                  <Calculator className="text-[#22C55E] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h2 className="text-2xl font-bold text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                      {toolInfo?.name}
                    </h2>
                    <p className="text-[#D1D5DB] mt-1">{toolInfo?.description}</p>
                  </div>
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-4 mb-8">
                {calculator.inputs.map((input, index) => (
                  <div key={index}>
                    <label className="block text-sm text-[#D1D5DB] mb-2">
                      {input.label} {input.unit && `(${input.unit})`}
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={inputs[index] || ''}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#22C55E]/20 text-white placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                    />
                  </div>
                ))}
              </div>

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                className="w-full px-6 py-3 bg-[#22C55E] hover:bg-[#1ea34e] text-black font-semibold rounded-lg transition-all duration-200 mb-6"
              >
                Calculate
              </button>

              {/* Result */}
              {result && (
                <div
                  className="rounded-lg p-6 border border-[#22C55E]/30"
                  style={{ background: 'rgba(34,197,94,0.08)' }}
                >
                  <p className="text-sm text-[#D1D5DB] mb-2">Result</p>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-4xl font-bold text-[#22C55E]">{result}</p>
                    <button
                      onClick={handleCopyResult}
                      className="flex items-center gap-2 px-4 py-2 bg-[#22C55E]/20 border border-[#22C55E]/30 rounded-lg text-[#22C55E] hover:bg-[#22C55E]/30 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check size={18} />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy size={18} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="rounded-2xl p-8"
            style={{
              background: 'rgba(15,81,50,0.08)',
              border: '1px solid rgba(34,197,94,0.1)',
            }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Pro Tips</h3>
            <ul className="space-y-3 text-[#D1D5DB]">
              <li className="flex gap-3">
                <span className="text-[#22C55E] font-bold">•</span>
                <span>Always calculate your position size before entering a trade</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#22C55E] font-bold">•</span>
                <span>Risk a consistent percentage per trade (1-2% is ideal)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#22C55E] font-bold">•</span>
                <span>Use the drawdown calculator to understand your limits</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#22C55E] font-bold">•</span>
                <span>Target at least 1:2 risk-reward ratios</span>
              </li>
            </ul>
          </div>

          <div
            className="rounded-2xl p-8"
            style={{
              background: 'rgba(15,81,50,0.08)',
              border: '1px solid rgba(34,197,94,0.1)',
            }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Key Metrics</h3>
            <ul className="space-y-3 text-[#D1D5DB]">
              <li className="flex gap-3">
                <span className="text-[#22C55E] font-bold">•</span>
                <span>Win Rate: Track your winning trades percentage</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#22C55E] font-bold">•</span>
                <span>Profit Factor: Total wins divided by total losses</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#22C55E] font-bold">•</span>
                <span>Expectancy: Average outcome per trade</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#22C55E] font-bold">•</span>
                <span>Drawdown: Maximum account decline from peak</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
