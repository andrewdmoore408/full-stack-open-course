import React from 'react';
import Header from './header';
import Content from './content';

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      {/* <Total parts={courseInfo.parts} /> */}
    </div>
  );
};

export default Course;
