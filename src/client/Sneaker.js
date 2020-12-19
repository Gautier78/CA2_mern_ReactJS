import React from 'react';
import ReactDOM from 'react-dom';
//import the Link component to use for linking prop information
import { Link } from 'react-router-dom';

// define one single sneaker card component
class Sneaker extends React.Component {
  render() {
    return (
      <div className="column is-2" style={{ padding: "20px" }}>
        <div className="card" style={{ borderRadius: "20px" }}>
          <div className="card-image">
            <figure className="image is-4by3">
              <img alt="Profile" src={this.props.image} />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4 has-text-primary">{this.props.model}</p>
                <hr/>
                <p className="subtitle is-size-6">{this.props.available}</p>
                {/*delete the prop with requested id from the function invoked in the parent component*/}
                <button className="button is-danger" type="button" onClick={() => {this.props.handleDelete(this.props.id);}}>
                  Delete
                </button>
                {/*load the EditSneaker component via React Router and send the id over to the EditSneaker component*/}
                <Link to={`/edit-sneaker/${this.props.id}`}>
                  <button className="button is-primary" type="button">
                  Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sneaker;
