import Course from './components/Course';

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Hooks in React',
        exercises: 26,
        id: 4
      },
      {
        name: 'Debugging components',
        exercises: 8,
        id: 5
      }
    ]
  };

  return <Course course={course} />;
}

export default App;
