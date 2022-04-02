import React from 'react';
import Part from './part';

const Content = ({ parts }) => {
  return (
    parts.map(part => <Part part={part} key={part.id}/>)
  );
};

export default Content;
