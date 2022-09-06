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
  { key: "Please Select Database", value: "Please Select Database" },
  { key: "GCA", value: "GCA" },
  { key: "Not GCA", value: "Not GCA" },
  { key: "", value: "" }
];


export function Header() {
  const [expanded, setExpanded] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const [value,setValue]=useState('');
  const dbValue = localStorage.getItem("database");
  const [selected, setSelected] = useState({});
  
  const handleSelect = (key, event) => {
    setSelected({ key, value: event.target.value });
    localStorage.setItem("database", key)
    
  };
  return (
    <>
    <Container fluid>
      <Navbar expand="lg" bg="primary" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
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
              <NavDropdown.Item href="/components/pages/warehouse/opassignment">Operation Assignment</NavDropdown.Item>
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
              title={dbValue || selected?.key || list[0].key}
            >
              {list.map((item, index) => {
                return (
                  <Dropdown.Item 
                  key={index} eventKey={item.key}
                  >
                    {item.value}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </Nav>
          <div className='signButton'>{ isAuthenticated ? <SignOutButton /> : <SignInButton /> }</div>
        </Navbar.Collapse>
       
      </Navbar>
    </Container>
</>
  );
}
