import React from "react"
import PropTypes from "prop-types"
import axios from "axios"
import NavListsStatic from './NavListsStatic'

class EditTask extends React.Component {
  constructor(props){
	  super(props);
    this.state = {
      description: '',
      priority: 0,
      list: 'none',
    };
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleDescriptionChange(event) {
    var value = event.target.value;
    this.setState(function () {
      return {
        description: value
      }
    });
  }
  handlePriorityChange(event) {
    console.log(event.target.value);
    var value = parseInt(event.target.value);
    this.setState(function () {
      return {
        priority: value
      }
    });
  }
  handleListChange(event) {
    var value = event.target.value;
    console.log(value);
    this.setState(function () {
      return {
        list: value
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    var user_id = this.props.user_id;
    var description = this.state.description;
    var priority = this.state.priority;
    var list = this.state.list;
    var task_id = this.props.task_id;
    console.log(task_id);
    var self = this;

    axios.post('/tasks/edit-task', {
        utf8: "&#x2713;",
        authenticity_token: "NNb6+J/j46LcrgYUC60wQ2titMuJQ5lLqyAbnbAUkdo=",
        task: {
          user_id: user_id,
          task_id: task_id,
          description: description,
          priority: priority,
          list: list,
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
    var description = this.state.description;
    return (
      <div>
        {<NavListsStatic
          username={this.props.username}
          />}

        <div className="form-container">
          <h2 className="signup-padding">Edit Task</h2>

          <div className= "col-md-4 center-div form-beginning">

            <label>Task Description</label>
            <input
              id="description"
              type="text"
              autoComplete="off"
              maxLength="60"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            />

            <label>Task Priority (1 - low, 5 - high)</label>
            <div className="priority-options">
              <label>1</label>
              <input type="radio" name="priority" value="1" id="1" onClick={this.handlePriorityChange}/>
              <label>2</label>
              <input type="radio" name="priority" value="2" id="2" onClick={this.handlePriorityChange}/>
              <label>3</label>
              <input type="radio" name="priority" value="3" id="3" onClick={this.handlePriorityChange}/>
              <label>4</label>
              <input type="radio" name="priority" value="4" id="4" onClick={this.handlePriorityChange}/>
              <label>5</label>
              <input type="radio" name="priority" value="5" id="5" onClick={this.handlePriorityChange}/>
            </div>

            <label>Add to List</label>
            <select name="lists" id="lists" onChange={this.handleListChange}>
              <option defaultValue="selected" value="none">None</option>

              {this.props.lists.map(function(list) {
                return (
                  <option key={list} id={list} value={list}>{list.charAt(0).toUpperCase() + list.substr(1)}</option>
                )
              })}

            </select>

            <button className="button" onClick={this.handleSubmit} disabled={!(this.state.description && (this.state.priority != 0))}>Update Task</button>

          </div>
        </div>
      </div>
    );
  }
}

EditTask.propTypes = {
  task_id: PropTypes.number.isRequired,
	username: PropTypes.string.isRequired,
  user_id: PropTypes.number.isRequired,
  list_count: PropTypes.number.isRequired,
  lists: PropTypes.array.isRequired,
}

EditTask.defaultProps = {
  lists: [],
}

export default EditTask