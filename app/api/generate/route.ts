import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { thought, tone } = await req.json();

    if (!thought?.trim()) {
      return NextResponse.json({ error: "thought is required" }, { status: 400 });
    }

    const toneGuide: Record<string, string> = {
      visionary: "inspiring, thought-leadership tone — paint a bold future, spark curiosity",
      pragmatist: "data-driven, tactical tone — use numbers, bullet points, and clear takeaways",
      storyteller: "personal, narrative tone — start with a vulnerable moment, build to insight",
    };

    const toneInstruction = toneGuide[tone] ?? `${tone} tone`;

    const prompt = `You are a LinkedIn ghostwriter who writes viral, human-sounding posts.
Generate exactly 3 DIFFERENT LinkedIn posts based on the user's raw thought below.

RAW THOUGHT: "${thought}"
TONE FOR ALL 3: ${toneInstruction}

RULES:
- Each post MUST follow: Hook → Body → Insight → CTA
- Hook: first line must be scroll-stopping (bold claim, question, or surprising statement)
- Body: 2-4 short paragraphs or bullet points — clear, specific, no fluff
- Insight: one punchy takeaway line
- CTA: end with a question or soft call-to-action that invites engagement
- Use line breaks between sections for readability
- Sound HUMAN — avoid corporate buzzwords, avoid "In today's world", avoid "I'm excited to share"
- Each post should feel distinctly different in angle/framing from the others
- Max 280 words per post

Return ONLY a raw JSON object — no markdown, no code fences, no explanation:
{"posts":["<post1>","<post2>","<post3>"]}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.85,
      max_tokens: 1200,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed.posts) || parsed.posts.length < 3) {
      return NextResponse.json(
        { error: "AI returned an unexpected format" },
        { status: 500 }
      );
    }

    return NextResponse.json({ posts: parsed.posts.slice(0, 3) });
  } catch (err: unknown) {
    console.error("[/api/generate]", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
