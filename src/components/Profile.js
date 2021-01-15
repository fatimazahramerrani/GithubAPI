import React, { useState, useEffect } from "react";
import DisplayTable from "./DisplayTable";
import axios from 'axios';
import { Button, Navbar, Nav, Form, FormControl} from 'react-bootstrap';


const Profile = () => {
  const [data, setData] = useState({});
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState([]);

  const onChangeHandler = e => {
    setUsername(e.target.value);
  };


  const submitHandler = async e => {
    e.preventDefault();

    const Profile = await fetch(`https://api.github.com/users/${username}`);
    const profileJson = await Profile.json();
    // console.log(profileJson);
    
    const repositories = await fetch(profileJson.repos_url);
    const repoJson = await repositories.json();
    console.log(repoJson);

    if (profileJson) {
      setData(profileJson);
      setRepositories(repoJson); 
    }
  };
  return (
    <>
       <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">GitHub</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" value={username} onChange={onChangeHandler} />
                <Button variant="outline-info" onClick={submitHandler}>Search</Button>
            </Form>
        </Navbar>
          <DisplayTable data={data} repositories={repositories} />
   </>
  );
};
export default Profile;
