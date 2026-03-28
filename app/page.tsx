"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate auth then redirect
    setTimeout(() => {
      window.location.href = "/generate";
    }, 1200);
  };

  return (
    <main className="flex-grow flex items-center justify-center p-6 sm:p-12 relative z-10">
      <div className="w-full max-w-[480px] space-y-10">
        {/* Header */}
        <header className="text-center space-y-4 fade-in-up">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-2"
            style={{
              background: "rgba(216, 167, 177, 0.18)",
              boxShadow: "0 0 0 8px rgba(216,167,177,0.07)",
            }}
          >
            <span
              className="material-symbols-outlined text-3xl"
              style={{
                color: "#7B535C",
                fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48",
              }}
            >
              auto_awesome
            </span>
          </div>
          <h1
            className="text-3xl font-extrabold tracking-tight"
            style={{ color: "#2B2B2B" }}
          >
            AI Post Assistant
          </h1>
          <p
            className="text-base leading-relaxed max-w-[300px] mx-auto font-light"
            style={{ color: "#504446" }}
          >
            Welcome back. Let&apos;s turn your thoughts into presence.
          </p>
        </header>

        {/* Card */}
        <div
          className="rounded-2xl p-8 sm:p-10 fade-in-up fade-in-up-delay-1"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.45)",
            boxShadow: "0 32px 64px rgba(28,28,25,0.07)",
          }}
        >
          <div className="space-y-4">
            {/* LinkedIn */}
            <a
              href="/generate"
              className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              style={{
                background: "#0A66C2",
                color: "#ffffff",
                boxShadow: "0 6px 18px rgba(10,102,194,0.22)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Continue with LinkedIn
            </a>

            {/* Google */}
            <button
              className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              style={{
                background: "rgba(255,255,255,0.8)",
                color: "#2B2B2B",
                border: "1px solid rgba(212,194,197,0.5)",
                boxShadow: "0 4px 12px rgba(28,28,25,0.04)",
              }}
              onClick={() => (window.location.href = "/generate")}
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="relative py-2 flex items-center">
              <div
                className="flex-grow border-t"
                style={{ borderColor: "rgba(212,194,197,0.3)" }}
              />
              <span
                className="flex-shrink mx-4 text-[10px] font-bold tracking-[0.15em] uppercase"
                style={{ color: "#827476" }}
              >
                OR
              </span>
              <div
                className="flex-grow border-t"
                style={{ borderColor: "rgba(212,194,197,0.3)" }}
              />
            </div>

            {/* Email */}
            <form onSubmit={handleEmail} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  className="block text-[10px] font-bold tracking-[0.12em] uppercase ml-1"
                  style={{ color: "#827476" }}
                >
                  Email Address
                </label>
                <input
                  className="luxury-input"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full tracking-wide disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span
                      className="material-symbols-outlined animate-spin text-base"
                      style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20" }}
                    >
                      progress_activity
                    </span>
                    Signing in…
                  </>
                ) : (
                  "Continue with Email →"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer links */}
        <footer className="text-center space-y-5 fade-in-up fade-in-up-delay-2">
          <p className="text-sm font-medium" style={{ color: "#504446" }}>
            New here?{" "}
            <Link
              href="/generate"
              className="font-bold underline underline-offset-4 hover:opacity-80 transition-opacity"
              style={{ color: "#7B535C" }}
            >
              Create an account
            </Link>
          </p>
          <div className="flex justify-center gap-8">
            {["Privacy Policy", "Terms of Service"].map((t) => (
              <a
                key={t}
                href="#"
                className="text-[11px] font-bold tracking-widest uppercase transition-colors hover:opacity-80"
                style={{ color: "#827476" }}
              >
                {t}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
