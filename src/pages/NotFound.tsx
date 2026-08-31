import Layout from '../components/Layout';
import Button from '../components/Button';
import Icon from '../components/Icon';

const quickLinks = [
  { label: 'Home', to: '/', icon: 'compass' },
  { label: 'Services', to: '/services', icon: 'clipboard' },
  { label: 'Study Abroad', to: '/study-abroad', icon: 'map' },
  { label: 'Contact Us', to: '/contact', icon: 'phone' },
];

export default function NotFound() {
  return (
    <Layout title="Page Not Found | Blossom Learning Centre" description="The page you are looking for could not be found.">
      <div className="container-page flex flex-col items-center gap-8 py-24 text-center sm:py-32">
        <div className="flex flex-col items-center gap-4">
          <span className="font-display text-6xl font-black text-gold-500">404</span>
          <h1 className="font-display text-3xl font-black uppercase tracking-tight text-brand-950">Page Not Found</h1>
          <p className="max-w-md text-brand-500">
            The page you're looking for doesn't exist or may have moved. Try one of these instead:
          </p>
        </div>

        <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
          {quickLinks.map((link) => (
            <Button
              key={link.to}
              to={link.to}
              variant="secondary"
              className="w-full justify-start gap-3 !normal-case"
            >
              <Icon name={link.icon} className="h-4 w-4" />
              {link.label}
            </Button>
          ))}
        </div>

        <Button to="/" variant="accent" size="lg">Back to Home</Button>
      </div>
    </Layout>
  );
}
