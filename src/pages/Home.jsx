import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="home">
      <h1>Welcome to AlteOs 7</h1>
      <p>Un système web moderne, modulaire, centré sur l’utilisateur.</p>
      <Link to="/login" className="btn-primary">
        Se connecter / Créer un compte
      </Link>
    </main>
  );
}
