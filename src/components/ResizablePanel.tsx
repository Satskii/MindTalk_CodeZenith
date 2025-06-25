
import React, { useEffect, useState, useRef } from 'react';
import Split from 'split.js';

interface ResizablePanelProps {
  children: React.ReactNode[];
  direction?: 'horizontal' | 'vertical';
  defaultSizes?: number[];
  minSizes?: number[];
  className?: string;
}

const ResizablePanel: React.FC<ResizablePanelProps> = ({
  children,
  direction = 'horizontal',
  defaultSizes = [50, 50],
  minSizes = [25, 25],
  className = '',
}) => {
  const [split, setSplit] = useState<Split.Instance | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = `split-${Math.random().toString(36).substring(2, 9)}`;

  useEffect(() => {
    if (children.length !== 2) {
      console.error('ResizablePanel requires exactly 2 children');
      return;
    }

    // Clean up function to safely destroy split instance
    const cleanupSplit = () => {
      if (split) {
        try {
          split.destroy();
        } catch (error) {
          console.error('Error destroying split instance:', error);
        }
      }
    };

    // Clean up previous split instance
    cleanupSplit();

    // Ensure the container exists and is mounted before initializing Split
    if (!containerRef.current) {
      return;
    }

    // Get the elements within the current container ref
    const elements = Array.from(
      containerRef.current.querySelectorAll(':scope > div')
    ).map(el => el as HTMLElement);

    if (elements.length !== 2) {
      console.error('Expected exactly 2 div children, found:', elements.length);
      return;
    }
    
    try {
      // Create new split instance
      const newSplit = Split(elements, {
        sizes: defaultSizes,
        minSize: minSizes,
        direction,
        gutterSize: 4,
        elementStyle: (dimension, size, gutterSize) => ({
          'flex-basis': `calc(${size}% - ${gutterSize}px)`,
        }),
        gutterStyle: () => ({
          'width': direction === 'horizontal' ? '4px' : '100%',
          'height': direction === 'vertical' ? '4px' : '100%',
        }),
      });

      setSplit(newSplit);
    } catch (error) {
      console.error('Error initializing Split.js:', error);
    }

    // Return cleanup function
    return cleanupSplit;
  }, [children, direction, defaultSizes, minSizes]);

  return (
    <div 
      id={id}
      ref={containerRef}
      className={`flex ${direction === 'horizontal' ? 'flex-row' : 'flex-col'} h-full w-full ${className}`}
    >
      {React.Children.map(children, (child, index) => (
        <div key={index} className="overflow-auto h-full">
          {child}
        </div>
      ))}
    </div>
  );
};

export default ResizablePanel;
