import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
 
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));


  const handleVotes = () => {
    const copy=[...votes];
    copy[selected]++;
    setVotes(copy);
  };

  const handleAnecdote = () => {
    let index;
    let mayor =0;
    for(let i = 0; i<anecdotes.length;i++){
      if(votes[i] > mayor){
        mayor = votes[i];
        index=i;
      }
    }
    return index;
  };

  const getRandomInt = () => setSelected(Math.floor(Math.random()*anecdotes.length));

  return (
    <>
      <Header title={'Anecdote of the day'}/>
      <div>
        {anecdotes[selected]}
      </div>
      <p>has {votes[selected]} votes</p>
      <div>
        <button onClick={handleVotes}>vote</button>
        <button onClick={getRandomInt}>Next anecdote</button>
      </div> 
      <Header title={'Anecdote with most votes'}/>
      <p>{anecdotes[handleAnecdote()]}</p>
      <p>has {votes[handleAnecdote()]} votes</p>
    </>
  );

};

const Header = (props) =>{
  return(
    <>
    <h1>{props.title}</h1>
    </>
  );
}; 

export default App;
