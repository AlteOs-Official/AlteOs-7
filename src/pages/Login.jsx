import { supabase } from '../auth/supabaseClient';

export default function Login() {
  async function handleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'github'
    });
  }

  return (
    <main className="login">
      <h1>Connexion AlteOs 7</h1>
      <button onClick={handleLogin} className="btn-primary">
        Se connecter avec GitHub
      </button>
    </main>
  );
}
