import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <img src="/images/logo.png" alt="AlteOs 7" className="navbar-logo" />
        <span className="navbar-title">AlteOs 7</span>
      </div>
      <nav className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
}
