import React from "react";
import ReactDOM from "react-dom";

const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  );
};

const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/mluukkai">mluukkai</a>
    </div>
  );
};

const App = () => {
  const now = new Date();
  const a = 10;
  const b = 20;
  const name = "Eric";
  const age = 70;
  console.log("Hello from component");
  return (
    <>
      <p>Hello it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
      <h1>Greetings</h1>
      <Hello name="Maya" age={16 + 20} />
      <Hello name={name} age={age} />
      <Footer />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
