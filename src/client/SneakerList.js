import React, { Component } from 'react';
//import the Link component to handle React Router
import { Link } from 'react-router-dom';
import Sneaker from './Sneaker';
//Axios is a lightweight HTTP client based on the $http service within Angular.js
//Axios provides support for request and response interceptors, transformers and auto-conversion to JSON
// Use "npm install axios" command to install
import axios from 'axios';
import './app.css';
// import stylesheet 
//MAKE SURE TO INSTALL USING npm install bulma
import 'bulma/css/bulma.css';

// this component will handle all elements in the sneakers array
class SneakerList extends Component {
    constructor(props) {
        super(props);
        // store the sneakers array in the state
        this.state = { sneakers: [] };

        //this binding is necessary to make `this` work in the callback
        //generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method
        this.updateSneakers = this.updateSneakers.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    // fetch all sneaker data from the server when the component mounts
    componentDidMount() {
        this.updateSneakers();
    }

    //
    updateSneakers() {
        // get the sneakers API using axios GET request to the server 
        axios.get('api/sneakers')
            .then(response => {
                //store the response in the state
                this.setState({ sneakers: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleDelete(sneakerId) {
        // make a DELETE request to the server which will handle the removal of the sneaker with the specific sneakerId
        axios
            .delete('api/sneakers', {
                data: {
                    id: sneakerId
                }
            })
            .then(response => {
                //if the deletion was successful then re-render the list of sneakers
                this.updateSneakers();
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        // produce a Sneaker component for each sneaker object
        const sneakerList = this.state.sneakers.map(u => (
            //map through each element in the array and set to the value received from the server
            <Sneaker
                key={u._id}
                id={u._id}
                brand={u.brand}
                model={u.model}
                size={u.size}
                image={u.picture}
                available={u.available}
                //you must include the handleDelete method to use in child components
                handleDelete={this.handleDelete}
            />
        ));

        //return the list of sneakers
        return (
            <div className="is-fluid">
                {/*Navigation bar*/}
                <nav className="navbar">
                    <h1 className="navbar-item title is-1 has-text-primary">List of Sneakers</h1>
                    {/*when this button is pressed, CreateSneaker component will be rendered by using React Router*/}
                    <Link to={'/create-sneaker'} className="navbar-item navbar-end">
                        <button className="button is-warning" type="button">Create new Sneakers</button>
                    </Link>
                </nav>
                <hr />
                {/*SNEAKER LIST*/}
                <div>
                    <div className="columns is-multiline">
                        {sneakerList}
                    </div>
                </div>
                {/*FOOTER*/}
                <footer className="footer has-background-primary">
                    <div className="content has-text-centered">
                        <p className="has-text-white-bis"><strong>Random Sneaker API</strong> styled with Bulma.</p>
                    </div>
                </footer>
            </div>

        );
    }
}

export default SneakerList;
