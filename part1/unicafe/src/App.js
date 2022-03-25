import { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <SectionHeader text='give feedback' />
      <SectionHeader text='statistics' />
    </div>
  );
};

const SectionHeader = ({ text }) => {
  return (
    <h1>
      {text}
    </h1>
  );
};

export default App;