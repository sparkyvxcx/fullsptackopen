import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

// const Content = (props) => {
//   const parts = props.parts;
//   const exercises = props.exercises;
//   const result = [];
//   for (let i = 0; i < parts.length; i++) {
//     result.push(
//       <p key={i}>
//         {parts[i]} {exercises[i]}
//       </p>
//     );
//   }
//   console.log(parts);
//   return result;
// };

const Content = (props) => {
  const parts = props.parts;
  return (
    <div>
      <Part part={parts[0].name} exercise={parts[0].exercises} />
      <Part part={parts[1].name} exercise={parts[1].exercises} />
      <Part part={parts[2].name} exercise={parts[2].exercises} />
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Total = (props) => {
  let sum = 0;
  const parts = props.parts;
  parts.forEach((element) => (sum += element.exercises));
  return <p>Number of exercises {sum}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
