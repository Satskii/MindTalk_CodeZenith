
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { X, Phone, ExternalLink } from 'lucide-react';

interface SuicidePreventionAlertProps {
  onClose: () => void;
}

const SuicidePreventionAlert: React.FC<SuicidePreventionAlertProps> = ({ onClose }) => {
  return (
    <Alert className="mb-4 bg-mental-alert/10 border-mental-alert">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <AlertTitle className="text-mental-alert flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Immediate Help Available
          </AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2">
              If you're experiencing a crisis or having thoughts of suicide, 
              please reach out for professional support immediately:
            </p>
            <div className="space-y-1 mb-3">
              <div className="font-medium">Indian Crisis Helplines:</div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">iCall:</span> 
                <a 
                  href="tel:9152987821" 
                  className="text-mental-primary hover:underline flex items-center"
                >
                  9152987821
                  <Phone className="ml-1 h-3 w-3" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Vandrevala Foundation:</span> 
                <a 
                  href="tel:18602662345" 
                  className="text-mental-primary hover:underline flex items-center"
                >
                  1860 266 2345
                  <Phone className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-mental-alert text-mental-alert hover:bg-mental-alert/10"
                onClick={() => window.open('https://www.thelivelovelaughfoundation.org/find-help', '_blank')}
              >
                <ExternalLink className="mr-2 h-3 w-3" />
                More Resources
              </Button>
            </div>
          </AlertDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  );
};

export default SuicidePreventionAlert;
