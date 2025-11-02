const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lionrun-app.vercel.app';
'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lionrun-app.vercel.app';

  async function sendMagicLink(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${baseUrl}/auth/callback`,
      },
    });
    if (error) return alert(error.message);
    setSent(true);
  }

  return (
    <main className="center">
      <div className="card" style={{ width: 420 }}>
        <h2>Sign in</h2>
        {!sent ? (
          <form onSubmit={sendMagicLink} style={{ display: 'grid', gap: 12 }}>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: 10, fontSize: 16 }}
            />
            <button className="btn" type="submit">Send magic link</button>
          </form>
        ) : (
          <>
            <p>Check your email for a sign-in link.</p>
            <p>(It will bring you back here.)</p>
          </>
        )}

        <hr style={{ margin: '16px 0' }} />
        <a className="btn" href="/t/demo/dashboard">Continue without login (dev)</a>
      </div>
    </main>
  );
}

