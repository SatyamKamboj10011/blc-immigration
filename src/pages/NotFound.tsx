import Layout from '../components/Layout';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <Layout title="Page Not Found | Blossom Learning Centre" description="The page you are looking for could not be found.">
      <div className="container-page flex flex-col items-center gap-6 py-32 text-center">
        <h1 className="text-4xl font-extrabold text-brand-950">Page Not Found</h1>
        <p className="max-w-md text-brand-800/70">The page you are looking for doesn't exist or may have moved.</p>
        <Button to="/">Back to Home</Button>
      </div>
    </Layout>
  );
}
