import { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <SectionHeader text='give feedback' />
      <Button onclick={handleGoodClick} text='Good' />
      <Button onclick={handleNeutralClick} text='Neutral' />
      <Button onclick={handleBadClick} text='Bad' />
      <SectionHeader text='statistics' />
      <StatLine text='good' data={good} />
      <StatLine text='neutral' data={neutral} />
      <StatLine text='bad' data={bad} />
    </div>
  );
};

const Button = ({ onclick, text }) => {
  return (
    <button onClick={onclick}>
      {text}
    </button>
  );
};

const SectionHeader = ({ text }) => {
  return (
    <h1>
      {text}
    </h1>
  );
};

const StatLine = ({ text, data }) => {
  return (
    <p>
      {text}  {data}
    </p>
  );
};

export default App;