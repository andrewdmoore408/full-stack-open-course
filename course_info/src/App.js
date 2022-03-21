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
  return (
    <p>
      Number of exercises: {props.totalExercises}
    </p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
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
  ];
  const totalExercises = parts.reduce((total, part) => total += part.numExercises, 0);

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
}

export default App;