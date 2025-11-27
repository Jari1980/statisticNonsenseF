import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <Navbar
        expand="sm"
        sticky="top"
        style={{  
            width: "100vw",
            display:"flex", 
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#e0e0e0",
            padding: "12px 20px",
            boxSizing: "border-box",
        }}
      >
        <Navbar.Brand as={Link} to="/.." style={{ marginLeft: "20px", display: "flex", alignItems: "center"  }}>
          <img
            src="../src/assets/Broccoli.png"
            alt=""
            height={"45px"}
            style={{mixBlendMode:"multiply"}}
          />
          <h3 style={{marginLeft:"20px", color:"#333"}}>Broccoli Statistics</h3>
        </Navbar.Brand>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ marginRight: "20px"}}>
            <Navbar.Brand as={Link} to="/csv" style={{ marginLeft: "20px", color:"#333" }}>
              Csv
            </Navbar.Brand>
            <Navbar.Brand as={Link} to="/product" style={{ marginLeft: "20px", color:"#333" }}>
              Product
            </Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
