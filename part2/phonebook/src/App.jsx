import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '8181819' }
  ]);
  const [newName, setNewName] = useState('');

  const [newNumber, setNewNumber] = useState('');

  const [word, setWord] = useState('');

  const addPerson = (event)=>{
    event.preventDefault();
    const newContact={
      name: newName,
      number: newNumber
    };
    if(persons.find(item => item.name === newName) != undefined){
      alert(`${newName} is already added to the phonebook`);
    }
    else{
      const copy = [...persons];
      copy.push(newContact);
      setPersons(copy);
      setNewName('');
      setNewNumber('');
    }
  };

  const handleInputName = (event)=>{
    setNewName(event.target.value);
  };

  const handleInputNumber = (event)=>{
    setNewNumber(event.target.value);
  };

  const handleFilter = (event)=>{
    setWord(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter word={word} handler={handleFilter}/> 
      <h2>Add a new</h2>
      <PersonForm newName={newName} handleInputName={handleInputName} newNumber={newNumber} 
      handleInputNumber={handleInputNumber} addPerson={addPerson}
      /> 
      <h2>Numbers</h2>
        {(word === '') ? (
          persons.map(({name, number})=>
            <p key={name}>{name} {number}</p>
          )
        ):(
          persons.map(({name, number}) => 
           <p key={name}>{(name.toLowerCase().includes(word.toLowerCase())) && `${name} ${number}`}</p>
          )
          )}
    </div>
  );
};

const Filter = ({word, handler})=>{
  return (
    <>
      <form>
        <div>Filter shown with <input value={word} onChange={handler}/></div>
      </form>
    </>
  );
};

const PersonForm = ({newName, handleInputName, newNumber, handleInputNumber, addPerson})=>{
  return(
    <form>
      <div>
        Name: <input value={newName} onChange={handleInputName} />
      </div>
      <div>
        Number : <input value={newNumber} onChange={handleInputNumber}/>
      </div>
      <div>
        <button onClick={addPerson} type="submit">add</button>
      </div>
    </form>
  );
};

export default App

