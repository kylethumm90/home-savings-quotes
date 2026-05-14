import { LandingBold } from './variants/LandingBold';
import { AdminPage } from './components/admin/AdminPage';
import { useRoute } from './lib/useRoute';

export function App() {
  const path = useRoute();
  if (path === '/admin' || path.startsWith('/admin/')) {
    return <AdminPage />;
  }
  return <LandingBold />;
}
