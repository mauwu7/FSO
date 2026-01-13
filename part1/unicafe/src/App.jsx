import { useState } from 'react'

const App =() =>{
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => setGood(good+1);
  const handleClickNeutral = () => setNeutral(neutral+1);
  const handleClickbad = () => setBad(bad+1);

  return (
    <div>
      <Header title={'Give feedback'}/>
      <Button text={'good'} onClick={handleClickGood}/>
      <Button text={'neutral'} onClick={handleClickNeutral}/>
      <Button text={'bad'} onClick={handleClickbad}/>
      
      <Header title={'Statistics'}/>

      <div>
        {((good+neutral+bad)!=0)?(
          <Statistics good={good} bad={bad} neutral={neutral}/>
        ):(
          <p>No feedback given</p>
        )}
      </div>
      
    </div>
  );
};

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.content}</td>
      <td>{props.number}{props.sim}</td>
    </tr>
  );
};

const Header = (props) =>{
  return (
    <>
      <h1>{props.title}</h1>
    </>
  );
};

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  );
};

const Statistics = (props) => {
  return(
    <table>
      <tbody>
        <StatisticLine content={'good'} number={props.good}/>
        <StatisticLine content={'neutral'} number={props.neutral}/>
        <StatisticLine content={'bad'} number={props.bad}/>
        <StatisticLine content={'all'} number={props.bad+props.neutral+props.good}/>
        <StatisticLine content={'average'} number={(props.bad+props.neutral+props.good)/3}/>
        <StatisticLine content={'positive'} number={(props.good/(props.good+props.bad+props.neutral))*100} sim={'%'}/> 
      </tbody>
    </table>
  );
};


export default App
