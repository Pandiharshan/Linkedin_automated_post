"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div
        className="w-9 h-9 rounded-full animate-pulse"
        style={{ background: "rgba(216,167,177,0.22)" }}
      />
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        {session.user.image ? (
          <img
            src={session.user.image}
            alt={session.user.name ?? "User"}
            className="w-9 h-9 rounded-full object-cover border-2"
            style={{ borderColor: "rgba(216,167,177,0.4)" }}
          />
        ) : (
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: "rgba(216,167,177,0.22)", color: "#7B535C" }}
          >
            {session.user.name?.charAt(0).toUpperCase() ?? "U"}
          </div>
        )}

        <span
          className="hidden sm:block text-sm font-medium truncate max-w-[160px]"
          style={{ color: "#504446" }}
        >
          {session.user.email}
        </span>

        <button
          onClick={() => signOut()}
          className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:opacity-80 active:scale-95"
          style={{
            background: "rgba(216,167,177,0.18)",
            color: "#7B535C",
            border: "1px solid rgba(216,167,177,0.35)",
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
      style={{
        background: "rgba(216,167,177,0.18)",
        color: "#7B535C",
        border: "1px solid rgba(216,167,177,0.35)",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
        <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05" />
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.96L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
      </svg>
      Login with Google
    </button>
  );
}
