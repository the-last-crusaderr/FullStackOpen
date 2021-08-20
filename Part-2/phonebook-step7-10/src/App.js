import React, { useState, useEffect} from "react";
import axios from 'axios'
import {retrieve,remove,create,update} from './services/persons'


const Displayer = ({ searchString, persons, searchResult,setPersons }) => {

  function handleDelete(person){
      let result = window.confirm(`Do you want to delete ${person.name}`)
      if (result === true) {
        remove(person.id)
        retrieve().then( (initialData) => setPersons(initialData)  )
      }
  }



  if (searchString === "") {
    return (
      <>
        <ul>
          {persons.map((person) => (
            <li key={person.name}>
              {" "}
              {person.name} {person.number}
              <button onClick={() => handleDelete(person)}> Delete </button>
            </li>
          ))}
        </ul>
      </>
    );
  } else {
    return (
      <>
        <ul>
          {searchResult.map((search) => (
            <li key={search.name}>
              {" "}
              {search.name} {search.number}
              <button onClick={() => handleDelete(search)}> Delete </button>
            </li>
          ))}
        </ul>
      </>
    );
  }
};



const App = () => {
    
    
    
    
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [searchString, setSearchString] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  
  
  
  
  // using the useEffect for fetching the data from server and setting it to the component after first rendering..
    
    useEffect( () => {
        retrieve().then( (initialData) => setPersons(initialData)  )
      }
  , [])
        
         
         
         
    
    

  function addName(event) {
    //if trying to add the people in the phonebook
    if (searchString === "") {
      event.preventDefault();
      const nameObject = {
        name: newName,
        number: newNum,
        date: new Date(),
        id: persons.length + 1
      };

      console.log("button clicked", event.target);
      if (persons.find((person) => person.name === nameObject.name) === undefined) {
        create(nameObject)
        retrieve().then( (initialData) => setPersons(initialData) )

        //setPersons(persons.concat(nameObject));
      }
      else {
          let result = window.confirm(`${nameObject.name}is already added to phonebook,replace the old number with new one`)
          if(result === true) {
            let oldPerson = persons.find((person) => person.name === nameObject.name)
            let oldId = oldPerson.id
            nameObject.id = oldId
            update(nameObject,oldId)
            retrieve().then((initialData) => setPersons(initialData))
          }
      }
    }

    //if searching on the phonebook
    else {
      event.preventDefault();
      const searchArray = persons.filter(
        (person) => person.name.toLowerCase().search(searchString.toLowerCase()) !== -1
      );

      setSearchResult(searchArray);
    }
  }

  function handleNewName(event) {
    setNewName(event.target.value);
  }

  function handleNewNum(event) {
    setNewNum(event.target.value);
  }

  function handlesetSearchString(event) {
    setSearchString(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        filter shown with
        <input value={searchString} onChange={handlesetSearchString} />
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        number: <input value={newNum} onChange={handleNewNum} />
        <br />
        <button type="submit">add</button>
      </form>

      <Displayer
        searchString={searchString}
        persons={persons}
        searchResult={searchResult}
        setPersons = {setPersons}
      />
    </div>
  );
};

export default App;
