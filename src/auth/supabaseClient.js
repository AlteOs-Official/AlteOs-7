import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

export function useAuthGuard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      if (!ignore) {
        if (!data.user) {
          navigate('/login');
        } else {
          setUser(data.user);
        }
        setLoading(false);
      }
    }

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        navigate('/login');
      } else {
        setUser(session.user);
      }
    });

    return () => {
      ignore = true;
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  return { user, loading };
}
