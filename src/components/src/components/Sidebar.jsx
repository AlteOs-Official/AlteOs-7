import { NavLink, useParams } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const { username } = useParams();

  return (
    <aside className="sidebar">
      <h2 className="sidebar-username">@{username}</h2>
      <nav className="sidebar-nav">
        <NavLink to={`/alteos7/${username}/Bio`}>Bio</NavLink>
        <NavLink to={`/alteos7/${username}/Creation`}>Creation</NavLink>
        <NavLink to={`/alteos7/${username}/Projects`}>Projects</NavLink>
        <NavLink to={`/alteos7/${username}/CommunityHighlights`}>Community Highlights</NavLink>
        <NavLink to={`/alteos7/${username}/DailyTools`}>Daily Tools</NavLink>
      </nav>
    </aside>
  );
}
