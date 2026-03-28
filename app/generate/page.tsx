"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

const EXAMPLES = [
  "I just finished a 6-month side project that generated $0 in revenue but taught me more than 3 years of corporate work…",
  "I gave a cold presentation to 200 strangers today. The silence at the beginning was terrifying. Here's what happened next:",
  "My team shipped our biggest product update ever with just 3 engineers. Here's how we stayed fast without burning out:",
];

const TONES = [
  { id: "visionary", label: "The Visionary", icon: "lightbulb", desc: "Inspiring, thought-leader tone" },
  { id: "pragmatist", label: "The Pragmatist", icon: "bar_chart", desc: "Data-driven, listicle format" },
  { id: "storyteller", label: "The Storyteller", icon: "menu_book", desc: "Personal, narrative-driven" },
];

export default function GeneratePage() {
  const router = useRouter();
  const [thought, setThought] = useState("");
  const [tone, setTone] = useState("visionary");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePlaceholder, setActivePlaceholder] = useState(0);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!thought.trim()) return;
    setIsGenerating(true);
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thought, tone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Generation failed");
      }

      // Store posts in sessionStorage so /select can read them
      sessionStorage.setItem("generatedPosts", JSON.stringify(data.posts));
      sessionStorage.setItem("postTone", tone);
      router.push("/select");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-28 pb-20 px-6 max-w-4xl mx-auto relative z-10 w-full">

        {/* Page Header */}
        <header className="mb-14 fade-in-up">
          <div
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] px-4 py-2 rounded-full mb-6"
            style={{
              background: "rgba(216,167,177,0.15)",
              color: "#7B535C",
              border: "1px solid rgba(216,167,177,0.25)",
            }}
          >
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}
            >
              psychology
            </span>
            Step 1 of 3 — Capture Your Thought
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            style={{ color: "#2B2B2B" }}
          >
            What happened today?
          </h1>
          <p
            className="text-lg font-light leading-relaxed max-w-2xl"
            style={{ color: "#504446" }}
          >
            Dump your raw thought below — your experience, lesson, or observation. Our AI will craft three polished LinkedIn post variations for you.
          </p>
        </header>

        {/* Main Input Card */}
        <div
          className="rounded-2xl p-8 md:p-10 mb-8 fade-in-up fade-in-up-delay-1"
          style={{
            background: "rgba(255,255,255,0.68)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.45)",
            boxShadow: "0 24px 50px rgba(28,28,25,0.05)",
          }}
        >
          {/* Textarea */}
          <div className="mb-6">
            <label
              className="block text-[10px] font-bold tracking-[0.15em] uppercase mb-3"
              style={{ color: "#827476" }}
            >
              Your Raw Thought
            </label>
            <textarea
              className="luxury-textarea min-h-[180px]"
              rows={7}
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              placeholder={EXAMPLES[activePlaceholder]}
            />
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2">
                {EXAMPLES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setActivePlaceholder(i); setThought(EXAMPLES[i]); }}
                    className="text-[10px] font-bold uppercase px-3 py-1 rounded-full transition-all"
                    style={{
                      background: activePlaceholder === i
                        ? "rgba(216,167,177,0.2)"
                        : "rgba(239,233,225,0.6)",
                      color: activePlaceholder === i ? "#7B535C" : "#827476",
                      border: activePlaceholder === i
                        ? "1px solid rgba(216,167,177,0.35)"
                        : "1px solid transparent",
                    }}
                  >
                    Try example {i + 1}
                  </button>
                ))}
              </div>
              <span
                className="text-[11px] font-bold"
                style={{ color: thought.length > 1500 ? "#ba1a1a" : "#827476" }}
              >
                {thought.length} / 2000
              </span>
            </div>
          </div>

          {/* Tone Selector */}
          <div className="mb-8">
            <label
              className="block text-[10px] font-bold tracking-[0.15em] uppercase mb-4"
              style={{ color: "#827476" }}
            >
              Preferred Tone
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TONES.map(({ id, label, icon, desc }) => (
                <button
                  key={id}
                  onClick={() => setTone(id)}
                  className="flex flex-col items-start p-4 rounded-xl text-left transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: tone === id
                      ? "rgba(216,167,177,0.15)"
                      : "rgba(239,233,225,0.5)",
                    border: tone === id
                      ? "1.5px solid #D8A7B1"
                      : "1.5px solid transparent",
                    boxShadow: tone === id
                      ? "0 6px 18px rgba(216,167,177,0.12)"
                      : "none",
                  }}
                >
                  <span
                    className="material-symbols-outlined mb-2"
                    style={{
                      color: tone === id ? "#7B535C" : "#827476",
                      fontVariationSettings: tone === id
                        ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
                        : "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    {icon}
                  </span>
                  <span
                    className="text-sm font-bold mb-1"
                    style={{ color: tone === id ? "#2B2B2B" : "#504446" }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-[11px] font-light"
                    style={{ color: "#827476" }}
                  >
                    {desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div
              className="mb-4 px-4 py-3 rounded-xl text-sm font-medium"
              style={{
                background: "rgba(186,26,26,0.08)",
                color: "#ba1a1a",
                border: "1px solid rgba(186,26,26,0.2)",
              }}
            >
              {error}
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !thought.trim()}
            className="btn-primary w-full text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isGenerating ? (
              <>
                <span
                  className="material-symbols-outlined animate-spin"
                  style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}
                >
                  progress_activity
                </span>
                Generating 3 posts with AI…
              </>
            ) : (
              <>
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                >
                  auto_awesome
                </span>
                Generate Post Variations
              </>
            )}
          </button>
        </div>

        {/* Generation status cards */}
        {isGenerating && (
          <div
            className="rounded-2xl p-6 fade-in-up"
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(216,167,177,0.2)",
            }}
          >
            <p
              className="text-[11px] font-bold uppercase tracking-widest mb-4"
              style={{ color: "#7B535C" }}
            >
              AI is crafting your posts…
            </p>
            <div className="space-y-3">
              {["The Visionary", "The Pragmatist", "The Storyteller"].map((name) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="shimmer w-full h-4 rounded" />
                  <span
                    className="text-[11px] whitespace-nowrap font-medium"
                    style={{ color: "#827476" }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips row */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5 fade-in-up fade-in-up-delay-2">
          {[
            { icon: "tips_and_updates", tip: "Be specific", body: "Include numbers, names, or dates for more authentic results." },
            { icon: "schedule", tip: "Best time to post", body: "Tue & Thu, 8–10 AM EST drives 25% higher engagement." },
            { icon: "upload", tip: "Add images later", body: "You can attach up to 7 images before posting to LinkedIn." },
          ].map(({ icon, tip, body }) => (
            <div
              key={tip}
              className="rounded-xl p-5"
              style={{
                background: "rgba(239,233,225,0.55)",
                border: "1px solid rgba(212,194,197,0.25)",
              }}
            >
              <span
                className="material-symbols-outlined text-lg mb-2 block"
                style={{ color: "#7B535C", fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              >
                {icon}
              </span>
              <p className="text-sm font-bold mb-1" style={{ color: "#2B2B2B" }}>{tip}</p>
              <p className="text-xs font-light leading-relaxed" style={{ color: "#504446" }}>{body}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
