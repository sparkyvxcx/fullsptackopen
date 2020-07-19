import React from "react";

const Person = ({ name, number, id, onClickHandle }) => {
  return (
    <div className="person">
      <p className="personfield">
        {name} {number}
      </p>
      <button className="delete" onClick={onClickHandle(id)}>
        delete
      </button>
    </div>
  );
};

const Persons = ({ personsToShow, onClickHandle }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          id={person.id}
          onClickHandle={onClickHandle}
        />
      ))}
    </div>
  );
};

export default Persons;
