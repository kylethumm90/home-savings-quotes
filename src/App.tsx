import { LandingBold } from './variants/LandingBold';
import { AdminPage } from './components/admin/AdminPage';
import { PrivacyTerms } from './components/PrivacyTerms';
import { useRoute } from './lib/useRoute';

export function App() {
  const path = useRoute();
  if (path === '/admin' || path.startsWith('/admin/')) {
    return <AdminPage />;
  }
  if (path === '/privacy-policy-tos' || path === '/privacy-policy-tos/') {
    return <PrivacyTerms />;
  }
  return <LandingBold />;
}
