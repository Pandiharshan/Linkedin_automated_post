"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";

const LINKEDIN_PROFILE = "https://www.linkedin.com/in/pandi-harshan-k-13962b2a5/";
const TONE_LABELS = ["The Visionary", "The Pragmatist", "The Storyteller"];
const OPTION_LABELS = ["Option 01", "Option 02", "Option 03"];

const FALLBACK = [
  { headline: "Loading post 1…", body: "", tags: "" },
  { headline: "Loading post 2…", body: "", tags: "" },
  { headline: "Loading post 3…", body: "", tags: "" },
];

function parsePost(raw: string) {
  const lines = raw.trim().split("\n").filter(Boolean);
  const lastLine = lines[lines.length - 1] ?? "";
  const hasTagLine = lastLine.startsWith("#");
  const headline = lines[0] ?? "";
  const tags = hasTagLine ? lastLine : "";
  const body = lines.slice(1, hasTagLine ? lines.length - 1 : undefined).join("\n");
  return { headline, body, tags };
}

export default function SelectPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState(FALLBACK);
  const [selected, setSelected] = useState(0);
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("generatedPosts");
    if (raw) {
      try {
        const arr: string[] = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length === 3) {
          setPosts(arr.map(parsePost));
          return;
        }
      } catch {
        // fall through
      }
    }
    router.replace("/generate");
  }, [router]);

  const activePost = posts[selected];
  const fullText = `${activePost.headline}\n\n${activePost.body}${activePost.tags ? "\n\n" + activePost.tags : ""}`;

  // Open LinkedIn native post composer with pre-filled text
  const handlePost = () => {
    const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(fullText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setPosted(true);
  };

  // Resolved user info from Google session
  const userName = session?.user?.name ?? "Your Name";
  const userImage = session?.user?.image ?? null;
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-28 pb-20 px-6 max-w-7xl mx-auto relative z-10 w-full">

        {/* Header */}
        <header className="mb-16 text-center fade-in-up">
          <div
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] px-4 py-2 rounded-full mb-6"
            style={{
              background: "rgba(216,167,177,0.15)",
              color: "#7B535C",
              border: "1px solid rgba(216,167,177,0.25)",
            }}
          >
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>
              checklist
            </span>
            Step 2 of 3 — Curate Your Post
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: "#2B2B2B" }}>
            Curated Alternatives
          </h1>
          <p className="text-lg font-light leading-relaxed max-w-2xl mx-auto opacity-80" style={{ color: "#504446" }}>
            Three distinct versions of your post. Select the tone that best resonates with your personal brand.
          </p>
        </header>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 fade-in-up fade-in-up-delay-1">
          {posts.map((post, i) => {
            const isSelected = selected === i;
            return (
              <div
                key={i}
                onClick={() => setSelected(i)}
                className={`glass-card p-8 rounded-2xl cursor-pointer ${isSelected ? "glass-card-selected" : ""}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex justify-between items-start mb-6">
                  <span
                    className="text-[10px] uppercase tracking-[0.15em] font-bold px-3 py-1 rounded-full"
                    style={{
                      background: isSelected ? "rgba(216,167,177,0.15)" : "rgba(239,233,225,0.7)",
                      color: isSelected ? "#7B535C" : "#504446",
                    }}
                  >
                    {OPTION_LABELS[i]} • {TONE_LABELS[i]}
                  </span>
                  {isSelected && (
                    <span className="material-symbols-outlined" style={{ color: "#7B535C", fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                      check_circle
                    </span>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  <p className="font-semibold leading-relaxed italic" style={{ color: "#2B2B2B" }}>{post.headline}</p>
                  <p className="text-sm font-light leading-relaxed whitespace-pre-line" style={{ color: "#504446" }}>{post.body}</p>
                  {post.tags && (
                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#7B535C" }}>{post.tags}</p>
                  )}
                </div>

                {isSelected ? (
                  <button
                    className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide text-white transition-all active:scale-95"
                    style={{ background: "#7B535C", boxShadow: "0 8px 20px rgba(123,83,92,0.22)" }}
                  >
                    Selected ✓
                  </button>
                ) : (
                  <button
                    className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all active:scale-95 hover:-translate-y-0.5"
                    style={{ background: "rgba(239,233,225,0.65)", color: "#504446", border: "1px solid rgba(212,194,197,0.35)" }}
                    onClick={(e) => { e.stopPropagation(); setSelected(i); }}
                  >
                    Select Version
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Preview & Action Drawer */}
        <section className="fade-in-up fade-in-up-delay-2">
          <div className="rounded-3xl p-1" style={{ background: "rgba(235,232,227,0.5)", backdropFilter: "blur(8px)" }}>
            <div
              className="rounded-[22px] p-8 md:p-12"
              style={{
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            >
              <div className="flex flex-col lg:flex-row gap-14 items-start">

                {/* Preview Left */}
                <div className="flex-1 w-full">
                  <h3
                    className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-3"
                    style={{ color: "#7B535C" }}
                  >
                    <span className="inline-block h-px w-10" style={{ background: "rgba(216,167,177,0.4)" }} />
                    Final Review
                  </h3>

                  {/* LinkedIn post preview card */}
                  <div
                    className="p-8 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(212,194,197,0.22)",
                      boxShadow: "0 8px 24px rgba(28,28,25,0.04)",
                    }}
                  >
                    {/* Profile row — click name to open LinkedIn */}
                    <div className="flex items-center gap-3 mb-6">
                      {userImage ? (
                        <img
                          src={userImage}
                          alt={userName}
                          className="w-11 h-11 rounded-full object-cover"
                          style={{ border: "2px solid rgba(216,167,177,0.4)" }}
                        />
                      ) : (
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-extrabold"
                          style={{ background: "rgba(216,167,177,0.22)", color: "#7B535C" }}
                        >
                          {userInitial}
                        </div>
                      )}
                      <div>
                        {/* Clicking name opens LinkedIn profile */}
                        <a
                          href={LINKEDIN_PROFILE}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-bold hover:underline transition-all"
                          style={{ color: "#0A66C2" }}
                        >
                          {userName}
                        </a>
                        <p className="text-[10px] uppercase tracking-wider font-medium opacity-60" style={{ color: "#504446" }}>
                          View LinkedIn Profile • 1st
                        </p>
                      </div>
                    </div>

                    {/* Post content */}
                    <div className="space-y-4">
                      <p className="font-semibold italic leading-relaxed" style={{ color: "#2B2B2B" }}>{activePost.headline}</p>
                      <p className="text-sm font-light leading-loose whitespace-pre-line" style={{ color: "#504446" }}>{activePost.body}</p>
                      {activePost.tags && (
                        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#7B535C" }}>{activePost.tags}</p>
                      )}
                    </div>

                    <div className="mt-8 pt-5 flex justify-between" style={{ borderTop: "1px solid rgba(28,28,25,0.05)" }}>
                      <span className="text-[10px] uppercase tracking-wider font-bold opacity-50" style={{ color: "#504446" }}>
                        Est. read: {Math.ceil(fullText.split(" ").length / 200 * 60)}s
                      </span>
                      <span className="text-[10px] uppercase tracking-wider font-bold opacity-50" style={{ color: "#504446" }}>
                        Words: {fullText.split(" ").filter(Boolean).length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions Right */}
                <div className="w-full lg:w-80 flex flex-col gap-5 sticky top-28">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-60" style={{ color: "#504446" }}>
                    Publishing Tools
                  </h3>

                  {/* Post to LinkedIn — opens native composer */}
                  {posted ? (
                    <div
                      className="flex flex-col items-center justify-center gap-2 py-5 rounded-2xl font-bold text-sm tracking-wide text-center"
                      style={{ background: "rgba(10,102,194,0.08)", color: "#0A66C2", border: "1px solid rgba(10,102,194,0.2)" }}
                    >
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>open_in_new</span>
                      Opening LinkedIn…
                      <span className="text-[10px] font-normal opacity-70">Complete your post in the new tab</span>
                    </div>
                  ) : (
                    <button
                      onClick={handlePost}
                      className="flex items-center justify-center gap-3 py-5 rounded-2xl font-bold text-white text-sm tracking-wide transition-all hover:-translate-y-1 active:scale-95"
                      style={{ background: "#0A66C2", boxShadow: "0 12px 28px rgba(10,102,194,0.28)" }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      Post to LinkedIn
                    </button>
                  )}

                  {/* Secondary buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: "arrow_back", label: "Retry", action: () => router.push("/generate") },
                      { icon: "refresh", label: "Regenerate", action: () => router.push("/generate") },
                    ].map(({ icon, label, action }) => (
                      <button key={label} onClick={action} className="btn-secondary text-sm">
                        <span className="material-symbols-outlined text-lg">{icon}</span>
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Copy button */}
                  <button
                    className="flex items-center justify-center gap-2 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all hover:-translate-y-0.5"
                    style={{ background: "rgba(239,233,225,0.6)", color: "#504446", border: "1px solid rgba(212,194,197,0.3)" }}
                    onClick={() => navigator.clipboard.writeText(fullText)}
                  >
                    <span className="material-symbols-outlined text-lg">content_copy</span>
                    Copy to Clipboard
                  </button>

                  {/* Manual Edit */}
                  <button
                    className="flex items-center justify-center gap-2 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all hover:opacity-80"
                    style={{ color: "#7B535C" }}
                  >
                    <span className="material-symbols-outlined text-lg">edit</span>
                    Manual Edit
                  </button>

                  {/* Pro Tip */}
                  <div className="mt-2 p-6 rounded-2xl" style={{ background: "rgba(239,233,225,0.5)", border: "1px solid rgba(212,194,197,0.2)" }}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: "#7B535C" }}>Pro Tip</p>
                    <p className="text-xs font-light leading-relaxed opacity-80" style={{ color: "#504446" }}>
                      Posting between <strong>8–10 AM EST on Tuesdays</strong> yields 25% higher engagement for your network profile.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-8" style={{ background: "rgba(239,233,225,0.55)" }}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
          <span className="text-base font-extrabold tracking-tight" style={{ color: "#2B2B2B" }}>
            AI Post Assistant
          </span>

          {/* Support / Contact links */}
          <div className="flex items-center gap-6">
            {/* GitHub */}
            <a
              href="https://github.com/pandiharshan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors hover:opacity-70"
              style={{ color: "#504446" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              pandiharshan
            </a>

            {/* Email */}
            <a
              href="mailto:pandiharshan@gmail.com"
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors hover:opacity-70"
              style={{ color: "#504446" }}
            >
              <span className="material-symbols-outlined text-sm">mail</span>
              pandiharshan official
            </a>

            {/* LinkedIn */}
            <a
              href={LINKEDIN_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors hover:opacity-70"
              style={{ color: "#0A66C2" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-widest opacity-50" style={{ color: "#504446" }}>
            © 2025 AI Post Assistant
          </p>
        </div>
      </footer>

      {/* Bottom gradient line */}
      <div
        className="fixed bottom-0 left-0 w-full h-px z-50"
        style={{ background: "linear-gradient(to right, transparent, rgba(216,167,177,0.4), transparent)" }}
      />
    </>
  );
}
