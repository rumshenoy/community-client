import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Updates extends Component {

  constructor(props){
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount(){
    this.props.getDavUpdates();
  }

  deleteItem(id){
    var del = confirm("Are you sure?");
    if(del){
      this.props.deleteDavUpdate(id);
    }
  }

  render(){

    let updateList = this.props.updates.map((update, index) => {
      return (<UpdateItem key={index} details={update} onRootClick={this.deleteItem}/>);
    });
    return(
      <div>
        <h2 className="section-header">Update List</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {updateList}
          </tbody>
        </table>
      </div>
    );
  }
}

class UpdateItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    e.preventDefault();
    this.props.onRootClick(this.props.details._id);
  }

  render() {
    let d = new Date(this.props.details.createdAt);
    let dateOptions = {month: 'long', day: 'numeric', year:'numeric', hour: '2-digit', minute: '2-digit', hour12: false};
    let id = this.props.details._id;
    return (
      <tr>
        <td>{d.toLocaleString('en-US', dateOptions)}</td>
        <td>{this.props.details.description}</td>
        <td><a href="#" onClick={this.handleClick}>Delete</a></td>
      </tr>
    );
  }
}

Updates.propTypes = {
  updates: PropTypes.array,
  getDavUpdates: PropTypes.func,
  deleteDavUpdate: PropTypes.func
};

UpdateItem.propTypes = {
  details: PropTypes.object,
  onRootClick: PropTypes.func
};

export default Updates;