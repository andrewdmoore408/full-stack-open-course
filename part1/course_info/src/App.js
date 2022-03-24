const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
};

const Content = (props) => {
  return (
    props.parts.map(part => <Part part={part} />)
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.numExercises}
    </p>
  );
};

const Total = (props) => {
  const totalNumExercises = props.parts.reduce((total, part) => total += part.numExercises, 0);

  return (
    <p>
      Number of exercises: {totalNumExercises}
    </p>
  );
};

const App = () => {
  const courseInfo = {
    courseName: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        numExercises: 10,
      },
      {
        name: 'Using props to pass data',
        numExercises: 7,
      },
      {
        name: 'State of a component',
        numExercises: 14,
      }
    ],
  };

  return (
    <div>
      <Header course={courseInfo.courseName} />
      <Content parts={courseInfo.parts} />
      <Total parts={courseInfo.parts} />
    </div>
  );
}

export default App;