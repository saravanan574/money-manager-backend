
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import Header from '@/components/layout/Header';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Briefcase, Telescope, Target, Users } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <Briefcase className="h-8 w-8 text-primary-blue" />,
      title: 'Auto-Categorization',
      description: 'Automatically classify emails into internships, full-time jobs, and more.',
    },
    {
      icon: <Telescope className="h-8 w-8 text-primary-blue" />,
      title: 'Info Extraction',
      description: 'Extract key details like company name, role, deadline, and eligibility criteria.',
    },
    {
      icon: <Target className="h-8 w-8 text-primary-blue" />,
      title: 'Eligibility Check',
      description: 'Instantly see if you meet the requirements for a job opportunity.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary-blue" />,
      title: 'Community Chat',
      description: 'Join company-specific chat groups to discuss with peers.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white text-center py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
              Never Miss A Placement Opportunity
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              SPEI is your smart assistant for managing placement emails, tracking deadlines, and finding the perfect job for you.
            </p>
            <Link href="/register">
              <Button size="lg">Get Started for Free</Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold">A Smarter Way to Manage Placements</h2>
              <p className="text-gray-600 mt-2">All the tools you need in one intelligent platform.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription className="pt-2">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-white py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold">Get Started in 3 Easy Steps</h2>
            </div>
            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 relative">
                <div className="text-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 mx-auto bg-primary-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">1</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Create Account</h3>
                  <p className="text-gray-600">Sign up and build your student profile with your academic details and skills.</p>
                </div>
                <div className="text-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 mx-auto bg-primary-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">2</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Connect Gmail</h3>
                  <p className="text-gray-600">Securely connect your Gmail account with one click using Google OAuth.</p>
                </div>
                <div className="text-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 mx-auto bg-primary-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">3</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
                  <p className="text-gray-600">SPEI automatically fetches and analyzes your emails on your dashboard.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} SPEI by Saravanan A. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
