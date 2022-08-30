import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "../auth/SignInButton";
import { SignOutButton } from "../auth/SignOutButton";
import { useState } from 'react';
import { DropdownButton, Dropdown } from "react-bootstrap";

const list = [
  { key: "GCA", value: "GCA" },
  { key: "Blue", value: "blue" },
  { key: "Green", value: "green" }
];


export function Header() {
  const isAuthenticated = useIsAuthenticated();
  const [value,setValue]=useState('');
  const dbValue = localStorage.getItem("database");
  
  const [selected, setSelected] = useState({});
  
  const handleSelect = (key, event) => {
    setSelected({ key, value: event.target.value });
    localStorage.setItem("database", value)
    // setValue(assert)
  };

  
  // const handleSelect=(assert)=>{
  //   localStorage.setItem("database", value)
  //   setValue(assert)
  // }
  
  function handleChange (event) {
    console.log(event);
    this.setState({ inputValue: event.target.value });
    this.props.onChange(event);
  };
  
 


  return (
    
    <>
    <Navbar bg="primary" variant="dark">
        <Container>
        <Navbar.Brand href="/">Azure Database</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/components/pages/Hello">Hello API</Nav.Link>
            <NavDropdown title="Returns" id="basic-nav-dropdown">
              <NavDropdown.Item href="/components/pages/returns/new">Create New Return</NavDropdown.Item>
              <NavDropdown.Item href='/components/pages/returns/notag'>Create No Tag Return</NavDropdown.Item>
              <NavDropdown.Item href="/components/pages/returns/k12">Create K12 Return</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/components/pages/returns/search">Search</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Warehouse" id="basic-nav-dropdown">
              <NavDropdown.Item href="/components\pages\warehouse\opassignment">Operation Assignment</NavDropdown.Item>
              <NavDropdown.Item href="/components/pages/warehouse/etched">Mark Etched</NavDropdown.Item>
              <NavDropdown.Item href="/components/pages/warehouse/assetLabel">Asset Label</NavDropdown.Item>
              <NavDropdown.Item href="/components/pages/warehouse/assetlocation">Asset Location</NavDropdown.Item>
              <NavDropdown.Item href="/components/pages/warehouse/searchAssetLoc">Asset Location Search</NavDropdown.Item>
              <NavDropdown.Item href="/components/pages/warehouse/miscAssignment">MISC Assignment</NavDropdown.Item>
              <NavDropdown.Item href="/components/pages/warehouse/asapoutboundlabel">ASAP Outbound Labels</NavDropdown.Item>
              <NavDropdown.Item href="/components/pages/warehouse/consumePeripherals">Consume Peripherals</NavDropdown.Item>
            </NavDropdown>
            <DropdownButton
              id="dropdown-basic-button"
              variant="info"
              className="floatRight"
              onSelect={handleSelect}
              title={selected?.key || list[0].key}
            >
              {list.map((item, index) => {
                return (
                  <Dropdown.Item key={index} eventKey={item.key}>
                    {item.value}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
            

          </Nav>
        </Navbar.Collapse>
        { isAuthenticated ? <SignOutButton /> : <SignInButton /> }
        </Container>
    </Navbar>

</>
  );
}
