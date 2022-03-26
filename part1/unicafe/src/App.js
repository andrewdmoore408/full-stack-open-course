import { useState } from 'react';

const App = () => {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);

  const handleGoodClick = () => setGood(good + 1);

  const handleNeutralClick = () => setNeutral(neutral + 1);

  const handleBadClick = () => setBad(bad + 1);

  const total = () => good + bad + neutral;
  const average = () => ((good - bad) / total()) || 0;
  const percentPositive = () => ((good / total()) > 0) ? `${(good / total()) * 100} %`: '0 %';

  const buttonsInfo = [
    {
      clickFunction: handleGoodClick,
      text: 'Good',
    },
    {
      clickFunction: handleNeutralClick,
      text: 'Neutral',
    },
    {
      clickFunction: handleBadClick,
      text: 'Bad',
    },
  ];

  const statsInfo = [
    {
      text: 'good',
      state: good,
    },
    {
      text: 'neutral',
      state: neutral,
    },
    {
      text: 'bad',
      state: bad,
    },
    {
      text: 'all',
      state: total(),
    },
    {
      text: 'average',
      state: average(),
    },
    {
      text: 'positive',
      state: percentPositive(),
    },
  ];

  return (
    <div>
      <FeedbackSection headerText='give feedback' buttons={buttonsInfo} />
      <StatsSection headerText='statistics' stats={statsInfo} />
    </div>
  );
};

const FeedbackSection = ({ headerText, buttons }) => {
  return (
    <div>
      <SectionHeader text={headerText} />
      {(() => {
        return buttons.map(button => {
          return (
            <Button onclick={button.clickFunction} text={button.text} />
          );
        });
      })()}
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

const StatsSection = ({ headerText, stats }) => {
  const total = stats.find(stat => stat.text === 'all').state;

  if (total > 0) {
    return (
      <div>
        <SectionHeader text={headerText} />
        {(() => {
          return stats.map(stat => {
            return (
              <StatLine text={stat.text} data={stat.state} />
            );
          });
        })()}
      </div>
    );
  } else {
    return (
      <p>
        No feedback given
      </p>
    )
  }
};

export default App;