import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

export default function Navigation() {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand
        style={{ marginLeft: "10px", fontFamily: "Yuji Syuku, serif" }}
        as={NavLink}
        to="/"
      >
        ARTLIFE
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%", marginRight: "10px" }} fill>
          <NavbarItem path="/" linkText="Home" />

          {user.isAnArtist && (
            <NavbarItem path="auction" linkText=" Start an auction" />
          )}

          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
