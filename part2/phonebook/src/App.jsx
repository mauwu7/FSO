import { useState, useEffect } from 'react'
import contactsService from './services/op'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [word, setWord] = useState('');

  useEffect(()=>{
    contactsService.getContacts().then(load => setPersons(load));
  },[]);

  const addPerson = (event)=>{
    event.preventDefault();
    if(persons.find(item => item.name === newName) != undefined){
      const entrada = confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);
      if(entrada){
        const contact = persons.find(({name})=>name.localeCompare(newName)==0);
        const updatedContact={...contact, number:newNumber};
        contactsService.act(contact.id,updatedContact).then(updated => setPersons(persons.map(person => person.id===updated.id ? updated:person)))
      }
    }
    else{
      const newContact={
        name: newName,
        number: newNumber
      };
      const copy = [...persons];
      contactsService.create(newContact).then(loaded => {
        copy.push(loaded);
        setPersons(copy);
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const deleteContact = (id) =>{
    const copy=persons.filter(person => person.id!=id);
    alert(`Se va a eliminar el contacto con id ${id}`);
    contactsService.eliminarContacto(id).then(()=>setPersons(copy));
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
          persons.map(({name, number, id})=>
            <Person key={id} name={name} number={number} eventHandler={()=>deleteContact(id)}/>
          )
        ):(
          persons.filter(({name})=>name.toLowerCase().includes(word.toLowerCase()))
          .map(({name,number,id}) =>(
            <Person key={id} name={name} number={number} eventHandler={()=>deleteContact(id)}/>
          ))
          )}
    </div>
  );
};

const Person = ({name,number, eventHandler}) =>{
  return(
    <p>
      {name} {number}
      <button onClick={eventHandler}>delete</button>
    </p>
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

export default App;