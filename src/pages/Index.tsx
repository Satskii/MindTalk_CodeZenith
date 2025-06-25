
import React from 'react';
import Navbar from '@/components/Navbar';
import LandingHero from '@/components/LandingHero';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen landing-gradient">
      <Navbar />
      <main className="container px-4 pt-16 md:pt-24 pb-16">
        <LandingHero />
      </main>
    </div>
  );
};

export default Index;
