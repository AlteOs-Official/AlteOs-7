import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.jsx';
import { useAuthGuard } from '../../auth/authGuard';

export default function UserLayout() {
  const { user, loading } = useAuthGuard();

  if (loading) {
    return <div className="center">Chargement...</div>;
  }

  if (!user) {
    return null; // redirection déjà faite dans le hook
  }

  return (
    <div className="user-layout">
      <Sidebar />
      <main className="user-main">
        <Outlet />
      </main>
    </div>
  );
}
