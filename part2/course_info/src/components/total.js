import React from 'react';

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((total, part) => total += part.exercises, 0);

  return (
    <p>
      Number of exercises: {totalExercises}
    </p>
  );
};

export default Total;
