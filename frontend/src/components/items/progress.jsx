import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Progress = () => {
  const [completed, setCompleted] = useState(100);

  useEffect(() => {
    setInterval(() => setCompleted(completed - 5), 250);
    console.log(completed)
  }, [completed]);

  return (
    <div>
    <ProgressBar variant="warning" now={completed} />
    </div>
  );
};

export default Progress;
