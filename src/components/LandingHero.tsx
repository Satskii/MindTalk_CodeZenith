
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProjectDocumentation from '@/components/ProjectDocumentation';

const LandingHero: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center animate-fade-in">
      <h1 className="hero-title mb-6 max-w-4xl">
        Student Mental Health Support. <br />
        <span className="bg-gradient-to-r from-mental-primary to-mental-secondary bg-clip-text text-transparent">
          Always Available.
        </span>
      </h1>
      
      <p className="hero-subtitle mb-10 max-w-2xl">
        A safe space to talk about your thoughts and feelings. 
        Get support when you need it most.
      </p>
      
      <div className="mb-6">
        <Link to="/chat">
          <Button className="cta-button animate-bounce-subtle">
            Start Talking Now
          </Button>
        </Link>
      </div>

      <div className="mb-10">
        <ProjectDocumentation />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mt-8">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Confidential</h3>
            <p className="text-muted-foreground">Your conversations stay private and secure.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
            <p className="text-muted-foreground">Get help anytime, day or night, whenever you need it.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Resource Connection</h3>
            <p className="text-muted-foreground">Get connected to professional resources when needed.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingHero;
