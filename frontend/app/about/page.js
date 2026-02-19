
import Header from '@/components/layout/Header';

export default function AboutPage() {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">About SPEI</h1>
        <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-700">
            <p>
                This page is a placeholder for the About content. You can describe the project in detail here.
            </p>
        </div>
      </div>
    </div>
  );
}
