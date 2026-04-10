import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import AnimatedPage from './components/AnimatedPage.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import UserLayout from './pages/User/UserLayout.jsx';
import Bio from './pages/User/Bio.jsx';
import Creation from './pages/User/Creation.jsx';
import Projects from './pages/User/Projects.jsx';
import CommunityHighlights from './pages/User/CommunityHighlights.jsx';
import DailyTools from './pages/User/DailyTools.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <Home />
            </AnimatedPage>
          }
        />

        <Route
          path="/login"
          element={
            <AnimatedPage>
              <Login />
            </AnimatedPage>
          }
        />

        {/* Layout utilisateur protégé */}
        <Route path="/alteos7/:username" element={<UserLayout />}>
          <Route
            path="Bio"
            element={
              <AnimatedPage>
                <Bio />
              </AnimatedPage>
            }
          />
          <Route
            path="Creation"
            element={
              <AnimatedPage>
                <Creation />
              </AnimatedPage>
            }
          />
          <Route
            path="Projects"
            element={
              <AnimatedPage>
                <Projects />
              </AnimatedPage>
            }
          />
          <Route
            path="CommunityHighlights"
            element={
              <AnimatedPage>
                <CommunityHighlights />
              </AnimatedPage>
            }
          />
          <Route
            path="DailyTools"
            element={
              <AnimatedPage>
                <DailyTools />
              </AnimatedPage>
            }
          />
          <Route index element={<Navigate to="Bio" replace />} />
        </Route>

        <Route
          path="*"
          element={
            <AnimatedPage>
              <NotFound />
            </AnimatedPage>
          }
        />
      </Routes>
    </div>
  );
}
