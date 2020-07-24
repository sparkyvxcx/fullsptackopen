import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [message, setMessage] = useState([null]);

  useEffect(() => {
    // Pull phonebook entries from backend
    personService.getAll().then((allPersons) => {
      setPersons(allPersons);
    });
  }, []);
  console.log("render", persons.length, "persons");

  // Factory function for different setter function
  const onChangeHandle = (setter) => (event) => {
    setter(event.target.value);
  };

  // This event handler handles submission of newly create phonebook entry
  const onSubmitHandle = (event) => {
    event.preventDefault();
    if (newName.length === 0) {
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    // check if there is conflict name in the phonebook
    const findPerson = persons.find((person) => person.name === newName);
    if (findPerson !== undefined) {
      // alert(`${newName} is already added to phonebook`);
      const id = findPerson.id;
      if (
        // pop confirmation prompt before update the entry's number
        window.confirm(
          `${newPerson.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        console.log(`Updating ${newPerson.name}'s number`);
        personService
          .updateEntry(id, newPerson)
          .then((updatedPerson) => {
            console.log(updatedPerson);
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : updatedPerson
              )
            );
            let message = [
              `Information of ${updatedPerson.name} updated`,
              "success",
            ];
            setMessage(message);
            setTimeout(() => {
              setMessage([null]);
            }, 5000);
          })
          .catch((error) => {
            // 3.20*: Phonebook database, step8-catch-update-error
            const err = error.response.data.error;
            let message = [
              `fail to update new entry into phone book. Error: ${err}`,
              "error",
            ];
            setMessage(message);
            setTimeout(() => {
              setMessage([null]);
            }, 5000);
            if (error.response.status !== 400) {
              setPersons(
                persons.filter((person) => person.name !== newPerson.name)
              );
            }
          });
      }
    } else {
      personService
        .createEntry(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          let message = [
            `Information of ${returnedPerson.name} added into phonebook`,
            "success",
          ];
          setMessage(message);
          setTimeout(() => {
            setMessage([null]);
          }, 5000);
        })
        .catch((error) => {
          // 3.20*: Phonebook database, step8-catch-create-error
          const err = error.response.data.error;
          let message = [
            `fail to add new entry into phone book. Error: ${err}`,
            "warning",
          ];
          setMessage(message);
          setTimeout(() => {
            setMessage([null]);
          }, 5000);
        });

      // setPersons(persons.concat(newPerson));
    }
    setNewName("");
    setNewNumber("");
  };

  // This event handler handles user input from　search filter
  const onSearchHandle = (event) => {
    const search = event.target.value;
    setNewSearch(search.toLowerCase());
  };

  // This event handler handles delete request
  const onClickHandle = (id) => () => {
    const person = persons.find((person) => person.id === id);
    console.log("This person's entry is about to delete!", id);
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      console.log(`Entry ${person.name} is deleted!`, id);
      personService
        .deleteEntry(id)
        .then((status_code) => {
          if (status_code === 204) {
            setPersons(persons.filter((person) => person.id !== id));
            let message = [
              `Information of ${person.name} is deleted from server`,
              "success",
            ];
            setMessage(message);
            setTimeout(() => {
              setMessage([null]);
            }, 5000);
          }
        })
        .catch((error) => {
          console.log("Delete", error);
          let message = [
            `Information of ${person.name} has already been removed from server`,
            "error",
          ];
          setMessage(message);
          setTimeout(() => {
            setMessage([null]);
          }, 5000);
        });
    }
  };

  // Filter persons array based on search term
  const personsToShow = persons.filter((person) => {
    let term = person.name.toLowerCase();
    return term.search(newSearch) >= 0;
  });

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter onChangeHanlder={onSearchHandle} />
      <h3>Add a new person</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        setName={setNewName}
        setNumber={setNewNumber}
        onSubmitHandle={onSubmitHandle}
        onChangeHandle={onChangeHandle}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} onClickHandle={onClickHandle} />
    </div>
  );
};

export default App;
