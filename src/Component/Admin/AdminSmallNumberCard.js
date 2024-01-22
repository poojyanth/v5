import React, { useState, useEffect } from 'react';

const AdminSmallNumberCard = ({ CardName, CardValue }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const startValue = 0;
    const endValue = parseInt(CardValue, 10); // Assuming CardValue is a number

    // Duration and interval for the animation
    const duration = 1000; // 1000 milliseconds (1 second)
    const interval = 20; // Update value every 20 milliseconds

    const steps = duration / interval;
    const stepValue = (endValue - startValue) / steps;

    let step = 0;

    const intervalId = setInterval(() => {
      setAnimatedValue((prevValue) => {
        if (step >= steps) {
          clearInterval(intervalId);
          return endValue;
        }
        step++;
        return prevValue + stepValue;
      });
    }, interval);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [CardValue]);

  return (
    <div className='AdminSmallCard'>
      <p style={{ fontSize: 'small', display: 'flex', alignItems: 'flex-end', height: '30%', color: 'var(--secondary-text-color)' }}>{CardName}</p>
      <p style={{ fontSize: 'xx-large', height: '70%', margin: '0', display: 'flex', alignItems: 'flex-start' }}>{Math.round(animatedValue)}</p>
    </div>
  );
};

export default AdminSmallNumberCard;
