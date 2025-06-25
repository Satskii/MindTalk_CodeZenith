
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import DarkModeToggle from '@/components/DarkModeToggle';

interface SettingsDialogProps {
  trigger?: React.ReactNode;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ trigger }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Theme</h4>
              <p className="text-sm text-muted-foreground">
                Toggle between light and dark mode
              </p>
            </div>
            <DarkModeToggle />
          </div>
          
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">About</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                MindTalk is a student mental health support platform that provides 
                a safe space to talk about your thoughts and feelings.
              </p>
              <p>
                Get support when you need it most with our 24/7 confidential chat service.
              </p>
              <p className="text-xs mt-4">
                Version 1.0.0
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
