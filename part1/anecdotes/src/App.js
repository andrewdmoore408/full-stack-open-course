import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];

  const [ selectedIndex, setSelectedIndex ] = useState(0);
  const [ highestVoteIndex, setHighestVoteIndex ] = useState(0);
  const [ votes, setVotes ] = useState(new Array(anecdotes.length).fill(0));

  const getCurrentVotes = () => {
    return votes[selectedIndex];
  }

  const getHighestVotes = () => {
    return votes[highestVoteIndex];
  }

  const handleVoteClick = () => {
    const newVotes = [...votes];

    newVotes[selectedIndex] += 1;
    setVotes(newVotes);

    updateHighestVoteIndex(newVotes);
  };

  const handleNextAnecdoteClick = () => {
    let newIndex = selectedIndex;

    while (newIndex === selectedIndex) {
      newIndex = Math.floor(Math.random() * anecdotes.length);
    }

    setSelectedIndex(newIndex);
  }

  const updateHighestVoteIndex = (votes) => {
    const highestVote = [...votes].sort((a, b) => b - a)[0];
    setHighestVoteIndex(votes.findIndex(vote => vote === highestVote));
  };

  return (
    <div>
      <SectionHeader text="Anecdote of the day" />
      <AnecdoteAndVoteCount
        anecdote={anecdotes[selectedIndex]}
        voteText={`has ${getCurrentVotes()} votes`}
      />
      <Button onClick={handleVoteClick} text='Vote' />
      <Button onClick={handleNextAnecdoteClick} text='Next anecdote' />

      <SectionHeader text="Highest-voted anecdote" />
      <AnecdoteAndVoteCount
        anecdote={anecdotes[highestVoteIndex]}
        voteText={`has ${getHighestVotes()} votes`}
      />
    </div>
  );
};

const AnecdoteAndVoteCount = ({ anecdote, voteText }) => {
  return (
    <>
      <TextLine text={anecdote} />
      <TextLine text={voteText} />
    </>
  );
};

const SectionHeader = ({ text }) => {
  return (
    <h2>
      {text}
    </h2>
  );
};

const TextLine = ({ text }) => {
  return (
    <p>
      {text}
    </p>
  );
};

const Button = ({ onClick, text }) => {
  return (
      <button onClick={onClick}>
        {text}
      </button>
  );
};

export default App;
