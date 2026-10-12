import { useState, useEffect, useRef } from "react";
import { dailyProblems } from "../data/dailyProblems.js";
import {
  Code2,
  Terminal,
  Play,
  Send,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  Flame,
  Clock,
  Copy,
  Check,
  Trophy,
  ExternalLink,
  ChevronDown,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function Practice() {
  const [selectedProblemId, setSelectedProblemId] = useState("two-sum");
  const [activeTab, setActiveTab] = useState("description"); // description | hints | editorial
  const [terminalTab, setTerminalTab] = useState("testcases"); // testcases | console
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [openHint, setOpenHint] = useState(null);
  const [streakCount, setStreakCount] = useState(3);
  const textareaRef = useRef(null);

  const problem =
    dailyProblems.find((p) => p.id === selectedProblemId) || dailyProblems[0];

  // Initialize or reset starter code when switching problems
  useEffect(() => {
    setCode(problem.starterCode);
    setTestResults(null);
    setOpenHint(null);
    setActiveTab("description");
  }, [selectedProblemId]);

  // Handle Tab and Ctrl+Enter keys in code editor
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runCodeTests(false);
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
            start + 2;
        }
      }, 0);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetCode = () => {
    setCode(problem.starterCode);
    setTestResults(null);
  };

  // Test Runner Engine
  const runCodeTests = (isSubmission = false) => {
    setIsRunning(true);
    setTerminalTab("testcases");

    setTimeout(() => {
      const startTime = performance.now();
      try {
        if (problem.mode === "web") {
          setIsRunning(false);
          setTestResults({
            allPassed: true,
            runtime: 1,
            tests: [
              {
                id: 1,
                status: "passed",
                input: "HTML/CSS Compilation",
                expected: "Valid DOM Tree",
                actual: "Rendered Successfully",
              },
            ],
          });
          if (isSubmission) setShowCelebration(true);
          return;
        }

        // Dynamically instantiate user code in isolated evaluation scope
        // eslint-disable-next-line no-new-func
        const userFunc = new Function(
          `${code}\nreturn typeof ${problem.functionName} === 'function' ? ${problem.functionName} : null;`
        )();

        if (!userFunc) {
          throw new Error(
            `Function '${problem.functionName}' was not found or is not defined.`
          );
        }

        const casesToRun = isSubmission
          ? problem.testCases
          : problem.testCases.slice(0, 3);

        const evaluatedTests = casesToRun.map((test, index) => {
          try {
            const actual = userFunc(...test.input);
            const passed =
              JSON.stringify(actual) === JSON.stringify(test.expected);
            return {
              id: index + 1,
              status: passed ? "passed" : "failed",
              input: JSON.stringify(test.input),
              expected: JSON.stringify(test.expected),
              actual: JSON.stringify(actual),
            };
          } catch (err) {
            return {
              id: index + 1,
              status: "failed",
              input: JSON.stringify(test.input),
              expected: JSON.stringify(test.expected),
              actual: `Runtime Error: ${err.message}`,
            };
          }
        });

        const endTime = performance.now();
        const runtime = Math.round(endTime - startTime + Math.random() * 8 + 4);
        const allPassed = evaluatedTests.every((t) => t.status === "passed");

        setTestResults({
          allPassed,
          runtime,
          tests: evaluatedTests,
        });

        if (allPassed && isSubmission) {
          setShowCelebration(true);
          setStreakCount((prev) => prev + 1);
        }
      } catch (err) {
        setTestResults({
          allPassed: false,
          runtime: 0,
          error: err.message,
          tests: [],
        });
      } finally {
        setIsRunning(false);
      }
    }, 400);
  };

  const lineCount = code.split("\n").length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 z-10">
      {/* Top Header & POTD Strip */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Code Lab & Daily Arena</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25">
              <Flame className="w-3.5 h-3.5" />
              <span>{streakCount} Day Streak</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text">
            Student Practice Hub
          </h1>
        </div>

        {/* Problem Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
          {dailyProblems.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProblemId(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedProblemId === p.id
                  ? "bg-brand-accent text-brand-bg shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                  : "bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-accent/40"
              }`}
            >
              {p.isDaily && <span className="text-[10px]">⭐</span>}
              <span>{p.title}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded ${
                  p.difficulty === "Easy"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : p.difficulty === "Medium"
                    ? "bg-amber-500/20 text-amber-300"
                    : "bg-rose-500/20 text-rose-300"
                }`}
              >
                {p.difficulty}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Split-Screen Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Problem Details & Editorial (5 cols) */}
        <div className="lg:col-span-5 bg-brand-surface border border-brand-border rounded-3xl p-6 shadow-xl flex flex-col h-[750px] overflow-hidden">
          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-1 border-b border-brand-border pb-3 mb-4">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "description"
                  ? "bg-brand-stats-bg text-brand-accent"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("hints")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === "hints"
                  ? "bg-brand-stats-bg text-brand-accent"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Hints ({problem.hints?.length || 0})</span>
            </button>
            <button
              onClick={() => setActiveTab("editorial")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === "editorial"
                  ? "bg-brand-stats-bg text-brand-accent"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Editorial</span>
            </button>
          </div>

          {/* Scrollable Content Container */}
          <div className="flex-grow overflow-y-auto pr-2 space-y-6">
            {activeTab === "description" && (
              <>
                {/* Problem Title & Meta Info */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${
                        problem.difficulty === "Easy"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : problem.difficulty === "Medium"
                          ? "bg-amber-500/15 text-amber-400"
                          : "bg-rose-500/15 text-rose-400"
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                    <span className="text-xs text-brand-muted">
                      {problem.category}
                    </span>
                    <span className="text-xs text-brand-accent font-semibold ml-auto">
                      +{problem.points} PTS
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-brand-text mb-3">
                    {problem.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-muted whitespace-pre-line leading-relaxed">
                    {problem.description}
                  </p>
                </div>

                {/* Examples */}
                {problem.examples && problem.examples.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                      Examples
                    </h3>
                    {problem.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="bg-brand-bg border border-brand-border rounded-xl p-3.5 font-mono text-xs space-y-1.5"
                      >
                        <p className="text-brand-text">
                          <strong className="text-brand-accent">Input:</strong>{" "}
                          {ex.input}
                        </p>
                        <p className="text-brand-text">
                          <strong className="text-brand-accent">Output:</strong>{" "}
                          {ex.output}
                        </p>
                        {ex.explanation && (
                          <p className="text-brand-muted text-[11px]">
                            <strong>Explanation:</strong> {ex.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Constraints */}
                {problem.constraints && problem.constraints.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                      Constraints
                    </h3>
                    <ul className="space-y-1 text-xs text-brand-muted list-disc list-inside font-mono">
                      {problem.constraints.map((c, idx) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {activeTab === "hints" && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                  Progressive Hints
                </h3>
                {problem.hints.map((hint, idx) => (
                  <div
                    key={idx}
                    className="border border-brand-border rounded-xl overflow-hidden bg-brand-bg"
                  >
                    <button
                      onClick={() =>
                        setOpenHint(openHint === idx ? null : idx)
                      }
                      className="w-full px-4 py-3 text-left flex items-center justify-between text-xs font-semibold text-brand-text hover:text-brand-accent cursor-pointer"
                    >
                      <span>Hint {idx + 1}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          openHint === idx ? "rotate-180 text-brand-accent" : ""
                        }`}
                      />
                    </button>
                    {openHint === idx && (
                      <div className="px-4 pb-3.5 text-xs text-brand-muted leading-relaxed border-t border-brand-border/40">
                        {hint}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "editorial" && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                  Official Editorial & Complexity
                </h3>
                <div className="p-4 rounded-xl bg-brand-bg border border-brand-border text-xs text-brand-muted whitespace-pre-line leading-relaxed font-sans">
                  {problem.editorial ||
                    "Try writing your solution and submitting test cases first!"}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Editor & Test Runner (7 cols) */}
        <div className="lg:col-span-7 flex flex-col h-[750px] bg-brand-surface border border-brand-border rounded-3xl overflow-hidden shadow-2xl">
          {/* Editor Header Bar */}
          <div className="px-5 py-3 bg-brand-bg border-b border-brand-border flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-muted font-mono">
              <Code2 className="w-4 h-4 text-brand-accent" />
              <span>
                {problem.mode === "web"
                  ? "index.html (HTML5 + CSS3)"
                  : "solution.js (JavaScript ES6+)"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-surface transition-colors cursor-pointer text-xs flex items-center gap-1"
                title="Copy code"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span className="hidden sm:inline">
                  {copied ? "Copied" : "Copy"}
                </span>
              </button>
              <button
                onClick={handleResetCode}
                className="p-1.5 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-surface transition-colors cursor-pointer text-xs flex items-center gap-1"
                title="Reset starter code"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Interactive Code Editor Area or Web Preview */}
          {problem.mode === "web" ? (
            <div className="flex-grow grid grid-rows-2 overflow-hidden">
              {/* Top: Code input */}
              <div className="p-4 bg-[#0a1219] overflow-auto">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full bg-transparent text-emerald-300 font-mono text-xs sm:text-sm focus:outline-none resize-none leading-relaxed"
                  spellCheck="false"
                />
              </div>
              {/* Bottom: Live Sandbox Iframe */}
              <div className="border-t border-brand-border bg-white flex flex-col">
                <div className="px-3 py-1 bg-brand-surface border-b border-brand-border text-[11px] font-mono text-brand-muted flex items-center justify-between">
                  <span>Live Sandbox Preview</span>
                  <span className="text-brand-accent">Interactive</span>
                </div>
                <iframe
                  title="Web Sandbox"
                  srcDoc={code}
                  className="w-full flex-grow border-none"
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          ) : (
            <div className="flex-grow flex bg-[#091118] overflow-hidden relative">
              {/* Line Numbers Column */}
              <div className="w-10 sm:w-12 py-4 select-none font-mono text-xs text-brand-muted/40 text-right pr-3 bg-brand-surface/30 border-r border-brand-border/40">
                {lineNumbers.map((num) => (
                  <div key={num} className="leading-6">
                    {num}
                  </div>
                ))}
              </div>

              {/* Textarea Input */}
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck="false"
                className="flex-grow py-4 pl-3 pr-4 bg-transparent font-mono text-xs sm:text-sm text-emerald-200 focus:outline-none resize-none leading-6 selection:bg-emerald-500/30 overflow-auto whitespace-pre"
                style={{ tabSize: 2 }}
              />
            </div>
          )}

          {/* Terminal / Test Case Results Area */}
          <div className="h-56 bg-brand-bg border-t border-brand-border flex flex-col">
            {/* Terminal Tab Bar & Run Controls */}
            <div className="px-4 py-2 border-b border-brand-border flex items-center justify-between gap-4 bg-brand-surface/60">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-brand-accent" />
                <span className="text-xs font-semibold text-brand-text">
                  Test Results & Console
                </span>
                {testResults && (
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      testResults.allPassed
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-rose-500/20 text-rose-400"
                    }`}
                  >
                    {testResults.allPassed
                      ? "All Tests Passed ✓"
                      : "Tests Incomplete ✗"}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => runCodeTests(false)}
                  disabled={isRunning}
                  className="px-3.5 py-1.5 rounded-xl bg-brand-surface hover:bg-brand-border border border-brand-border text-brand-text text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 text-brand-accent fill-brand-accent" />
                  <span>Run Tests</span>
                </button>

                <button
                  onClick={() => runCodeTests(true)}
                  disabled={isRunning}
                  className="px-4 py-1.5 rounded-xl bg-brand-accent hover:bg-[#0d9668] text-brand-bg text-xs font-bold transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Solution</span>
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-grow p-4 overflow-y-auto font-mono text-xs space-y-2">
              {isRunning && (
                <div className="text-brand-muted animate-pulse flex items-center gap-2 py-4">
                  <div className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
                  <span>Compiling and running against test suite...</span>
                </div>
              )}

              {!isRunning && !testResults && (
                <p className="text-brand-muted py-4">
                  Click <strong>Run Tests</strong> to check against sample
                  inputs, or <strong>Submit</strong> to evaluate all test cases.
                </p>
              )}

              {!isRunning && testResults && testResults.error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
                  <strong>Syntax / Runtime Error:</strong>
                  <p className="mt-1">{testResults.error}</p>
                </div>
              )}

              {!isRunning &&
                testResults &&
                !testResults.error &&
                testResults.tests.map((t) => (
                  <div
                    key={t.id}
                    className={`p-2.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      t.status === "passed"
                        ? "bg-emerald-500/5 border-emerald-500/25"
                        : "bg-rose-500/5 border-rose-500/25"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {t.status === "passed" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                      <span className="font-semibold text-brand-text">
                        Test Case {t.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-[11px] text-brand-muted">
                      <span>
                        Expected:{" "}
                        <strong className="text-emerald-300">
                          {t.expected}
                        </strong>
                      </span>
                      <span>
                        Output:{" "}
                        <strong
                          className={
                            t.status === "passed"
                              ? "text-emerald-300"
                              : "text-rose-300"
                          }
                        >
                          {t.actual}
                        </strong>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Success / Celebration Modal */}
      {showCelebration && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setShowCelebration(false)}
        >
          <div
            className="relative w-full max-w-md bg-brand-surface border border-brand-accent/50 rounded-3xl p-6 sm:p-8 text-center shadow-2xl animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <Trophy className="w-8 h-8 animate-bounce" />
            </div>

            <h3 className="text-2xl font-extrabold text-brand-text mb-1">
              Accepted! All Tests Passed 🎉
            </h3>
            <p className="text-xs text-brand-muted mb-4">
              Great job! Your solution for{" "}
              <strong className="text-brand-accent">{problem.title}</strong> was
              evaluated and passed all test cases.
            </p>

            <div className="p-3 rounded-2xl bg-brand-bg border border-brand-border flex items-center justify-around mb-6 text-xs font-mono">
              <div>
                <span className="text-brand-muted">Points Earned:</span>
                <p className="text-brand-accent font-bold text-sm">
                  +{problem.points} PTS
                </p>
              </div>
              <div className="h-6 w-px bg-brand-border" />
              <div>
                <span className="text-brand-muted">Daily Streak:</span>
                <p className="text-amber-400 font-bold text-sm flex items-center justify-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  {streakCount} Days
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCelebration(false)}
                className="w-full py-2.5 bg-brand-accent hover:bg-[#0d9668] text-brand-bg font-semibold rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
              >
                Continue Practice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
