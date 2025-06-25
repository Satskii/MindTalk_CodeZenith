
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DarkModeToggle from '@/components/DarkModeToggle';

const Navbar: React.FC = () => {
  return (
    <header className="w-full border-b bg-background/80 backdrop-blur-sm fixed top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-semibold bg-gradient-to-r from-mental-primary to-mental-secondary bg-clip-text text-transparent">
            MindTalk
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          <Link to="/chat">
            <Button variant="default" className="bg-mental-primary hover:bg-mental-primary/90">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
