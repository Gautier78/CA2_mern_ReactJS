import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
//import required components
import CreateSneaker from './CreateSneaker';
import EditSneaker from './EditSneaker';
import SneakerList from './SneakerList';

// this is the "main" component which sets up the React Router and respective routes
const App = () => {
  return(
    <HashRouter>
      <div>
        {/*SERVERSIDE: Link the routes to components*/}
        <Route exact path="/" component={SneakerList}/>
        {/*pass the id through the EditUser component*/}
        <Route path="/edit-sneaker/:id" component={EditSneaker}/>
        {/*set the path to create a new user to CreateUser component*/}
        <Route path="/create-sneaker" component={CreateSneaker}/>
      </div>
    </HashRouter>
  );
};

export default App;
