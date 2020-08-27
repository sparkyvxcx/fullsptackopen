import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../reducers/loginReducer";

import { Navbar, Nav } from "react-bootstrap";

const Menu = ({ username }) => {
  const dispatch = useDispatch();
  const padding = {
    paddingRight: 5,
  };
  // const menu = {
  //   display: "flex",
  //   backgroundColor: "lightgray",
  //   padding: "5px",
  // };

  const handleLogout = () => {
    console.log(`${username} log out`);
    window.localStorage.removeItem("loggedBloglistUser");
    dispatch(userLogout());
  };

  // return (
  //   <div style={menu}>
  //     <div style={{ marginRight: "10px" }}>Test Menu</div>
  //     <Link style={padding} to="/">
  //       blogs
  //     </Link>
  //     <Link style={padding} to="/users">
  //       users
  //     </Link>
  //     <div style={padding}>
  //       {username} logged in <button onClick={handleLogout}>log out</button>
  //     </div>
  //   </div>
  // );

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {username} logged in{" "}
            <Link to="/" onClick={handleLogout}>
              log out
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
