import React, { useState }  from "react";
import { Table} from 'react-bootstrap';


const DisplayTable = ({ data, repositories }) => {

  const submitHandler = async e => {
    e.preventDefault();

    const Profile = await fetch(`https://api.github.com/users`);
    const profileJson = await Profile.json();
    console.log(profileJson);

    const listRepos = profileJson.length !==0  ? (
      profileJson.map((item) => (
      <li key ={item.id}>
          <a href ={item.html_url}>{item.id}</a>
          </li>)) 
         ) : (
              <li>No repos</li>

              );
    
    /*const repositories = await fetch(profileJson.repos_url);
    const repoJson = await repositories.json();
    console.log(repoJson);*/


  };
    
  
  return (
    
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Avatar</th>
          <th>username</th>
          <th>location</th>
          <th>Message</th>
          <th>Hash</th>
          <th>Parent hash</th>
          <th>repositories</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {!data.avatar_url ? (
              " "
            ) : (
              <img
                 onClick={submitHandler}
                className="ui small circular image"
                src={data.avatar_url}
                alt={data.avatar_url}
                
              />
              
            )}
          </td>
          <td>{data.name}</td>
          <td>{data.location}</td>
          <td>{data.bio}</td>
          <td>{data.id}</td>
          <td> {!!data.node_id && (<p>{data.node_id.substr(0, 7)}</p>)}</td>
          <td>
            {repositories.map(repo => (
              <div className="ui relaxed divided list" key={repo.data}>
                <div className="item">
                  <i className="large github middle aligned icon"></i>
                  <div className="content">
                    <a href={repo.html_url} className="header" target="_blank">
                      {repo.name}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </td>
        </tr>
      </tbody>
    </Table>
  
     
  );
};

export default DisplayTable;
