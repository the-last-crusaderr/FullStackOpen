import React, { useState, useEffect} from "react";
import axios from 'axios'

const Displayer = ({ searchString, persons, searchResult }) => {
  if (searchString === "") {
    return (
      <>
        <ul>
          {persons.map((person) => (
            <li key={person.name}>
              {" "}
              {person.name} {person.number}
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
          axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])    
        
         
         
         
    
    

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
      if (
        persons.find((person) => person.name === nameObject.name) === undefined
      )
        setPersons(persons.concat(nameObject));
      else alert(`${nameObject.name} is already added to phonebook`);
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
      />
    </div>
  );
};

export default App;
