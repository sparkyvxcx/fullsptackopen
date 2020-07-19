import React from "react";

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Total = ({ parts }) => {
  // const reducer = (accumulator, currentValue) => accumulator + currentValue;
  // const sum = parts.map((part) => part.exercises).reduce(reducer);

  let i = 0;
  const sum = parts.reduce((s, p) => s + p.exercises, i);

  return <h4>Total of {sum} exercises</h4>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
