'use client';

import { useEffect, useState } from 'react';

import { Progress } from '@/components/ui/progress';

function CounterProgressbar({
  timerCount,
  onCountChange,
  className,
  reset,
}: {
  timerCount: number;
  onCountChange: (counter: number, progress: number) => void;
  className?: string;
  reset?: boolean;
}) {
  const [counter, setCounter] = useState(timerCount);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reset) {
      setCounter(timerCount);
      setProgress(100);
    }

    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    setProgress((counter / timerCount) * 100);
    onCountChange(counter, progress);

    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div className="CounterProgressbar">
      <Progress value={progress} className={className} />
    </div>
  );
}

export default CounterProgressbar;
