import React from "react"
import PropTypes from "prop-types"
import axios from "axios"
import NavListsStatic from './NavListsStatic'

class AddList extends React.Component {
  constructor(props){
	  super(props);
    this.state = {
      title: '',
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTitleChange(event) {
    var value = event.target.value;
    this.setState(function () {
      return {
        title: value
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    var user_id = this.props.user_id;
    var title = this.state.title;

    axios.post('/tasks/add-list', {
        utf8: "&#x2713;",
        authenticity_token: "NNb6+J/j46LcrgYUC60wQ2titMuJQ5lLqyAbnbAUkdo=",
        task: {
          user_id: user_id,
          title: title,
        }
      }
    )
    .then(function (response) {
      if (response.data.data == '/tasks') {
        window.location = response.data.data;
      }
    })
    .catch(function (error) {
      console.log(error);
    });   
  }
  render () {
    var maxLists = false;
    if (this.props.list_count >= 5) {
      maxLists = true;
    }
    return (
      <div>
        {<NavListsStatic username={this.props.username}/>}
        <div className="form-container">
          <h2 className="signup-padding">New List</h2>
          {maxLists && <div className="invalid">Maximum of 5 lists reached.</div>}
          <div className= "col-md-4 center-div form-beginning">
            <label>List Title</label>
            
            <input
              id="title"
              type="text"
              autoComplete="off"
              maxLength="30"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />

            <button className="button" onClick={this.handleSubmit} disabled={!(this.state.title && !maxLists)}>Add List</button>
          </div>
        </div>
      </div>
    );
  }
}

AddList.propTypes = {
  username: PropTypes.string.isRequired,
  user_id: PropTypes.number.isRequired,
  list_count: PropTypes.number.isRequired,
}

export default AddList