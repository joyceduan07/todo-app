import React from "react"
import PropTypes from "prop-types"
import axios from "axios"
import NavLists from './NavLists'

class TaskGrid extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      task_count: 0,
      descriptions: [],
      priorities: [],
      categories: [],
      list: '',
    };
    this.updateTasks = this.updateTasks.bind(this);
    this.editTask = this.editTask.bind(this);
  }
  componentWillMount() {
  	var task_count = this.props.task_count;
    var descriptions = this.props.descriptions;
    var priorities = this.props.priorities;
    var categories = this.props.categories;
    var list = this.props.list;
    console.log('in grid, ', list);
  	if (list == "all") {
  		console.log("here");
  		this.setState({ 
	        task_count : task_count,
	        descriptions: descriptions,
	        priorities: priorities,
	        categories: categories,
	        list: list,
	      }
	    );
    }
    else {
    	console.log("here1");
    	var task_count_list = 0;
    	var descriptions_list = [];
    	var priorities_list = [];
    	var categories_list = [];
    	for (var i = 0; i < task_count; i++) { 
		    if (categories[i] == list) {
		    	descriptions_list.push(descriptions[i]);
		    	priorities_list.push(priorities[i]);
		    	categories_list.push(categories[i]);
		    	task_count_list++;
		    }
		}
		this.setState({ 
	        task_count : task_count_list,
	        descriptions: descriptions_list,
	        priorities: priorities_list,
	        categories: categories_list,
	        list: list,
	      }
	    );
    }
  }
  updateTasks(event) {
    var description = event.target.value;
    var task_count = this.state.task_count;
    var descriptions = this.state.descriptions;
    var priorities = this.state.priorities;
    var categories = this.state.categories;
    var user_id = this.props.user_id;
    axios.post('/tasks', {
        utf8: "&#x2713;",
        authenticity_token: "NNb6+J/j46LcrgYUC60wQ2titMuJQ5lLqyAbnbAUkdo=",
        task: {
          description: description,
          user_id: user_id,
        }
      }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });  
    
    var index_to_remove = this.state.descriptions.indexOf(description);  
    descriptions.splice(index_to_remove, 1);
    priorities.splice(index_to_remove, 1);
    categories.splice(index_to_remove, 1);
    this.setState({ 
        task_count : task_count-1,
        descriptions: descriptions,
        priorities: priorities,
        categories: categories,
      }
    );
  }
  editTask(event) {
    event.preventDefault();
    
    console.log(event.target.href);
    console.log(event.target.id);
    var task_id = event.target.href.substring(event.target.href.lastIndexOf("/")+1);
    console.log("id from tasks");
    console.log(task_id);
    axios.post('/tasks/edit-id', {
        task: {
          task_id: task_id,
        }
      }
    )
    .then(function (response) {
      window.location = '/tasks/edit';
    })
    .catch(function (error) {
      console.log(error);
    });  
  }
  render () {
    var self = this;

    var task_count = this.state.task_count;
    var descriptions = this.state.descriptions;
    var priorities = this.state.priorities;
    var categories = this.state.categories;
    var task_ids = this.props.task_ids;
    console.log(task_ids);
    var list = this.props.list;

    if (list != "all") {
    	var task_count_list = 0;
    	var descriptions_list = [];
    	var priorities_list = [];
    	var categories_list = [];
    	for (var i = 0; i < task_count; i++) { 
		    if (categories[i] == list) {
		    	descriptions_list.push(descriptions[i]);
		    	priorities_list.push(priorities[i]);
		    	categories_list.push(categories[i]);
		    	task_count_list++;
		    }
		}
		  task_count = task_count_list;
    	descriptions = descriptions_list;
    	priorities = priorities_list;
    	categories = categories_list;
    }
    
    return (
      <div>
        {task_count == 0 && 
            <h2 id="no-tasks">No tasks!</h2>}
        {task_count != 0 && list == "all" &&
            <h3 className="little-header">All Tasks</h3>}
        {task_count != 0 && list != "all" &&
            <h3 className="little-header">{list.charAt(0).toUpperCase() + list.substr(1)}</h3>}


        <div className="task-grid">
          <ul className='task-list'>
            {descriptions.map(function(description, index) {
              console.log(task_ids[index]);
              return (
                <li key={description} className="task-item">
                  <label className="control control--checkbox">
                    <input type="checkbox" value={description} onClick={self.updateTasks}/>
                    <div className="control__indicator"></div>
                  </label>
                  <div className="task-container">
                    <div className="bold">{description}</div>
                    <div>Priority: {priorities[index]}</div>
                    <div>List: {categories[index].charAt(0).toUpperCase() + categories[index].substr(1)}</div> 
                    <div><a href={task_ids[index]} id={"edit-task-"+index} onClick={self.editTask}>Edit Task</a></div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

TaskGrid.propTypes = {
  task_count: PropTypes.number.isRequired,
  task_ids: PropTypes.array.isRequired,
  descriptions: PropTypes.array.isRequired,
  priorities: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  list: PropTypes.string.isRequired,
  user_id: PropTypes.number.isRequired,
}

class Tasks extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
		list: 'all',
	};
	this.updateList = this.updateList.bind(this);
  this.deleteList = this.deleteList.bind(this);
  }
  updateList(list) {
  	console.log("changing to in set state ", list);
  	this.setState(function() {
  		return {
  			list: list,
  		}
  	});
  }
  deleteList() {
    var result = confirm("Deleting the list will also delete all of the list's tasks. Do you want to continue?");
    if (result) {
        var list = this.state.list;
        var user_id = this.props.user_id;

        axios.post('/tasks/delete-list', {
            utf8: "&#x2713;",
            authenticity_token: "NNb6+J/j46LcrgYUC60wQ2titMuJQ5lLqyAbnbAUkdo=",
            task: {
              user_id: user_id,
              title: list,
            }
          }
        )
        .then(function (response) {
          window.location = '/tasks';
        })
        .catch(function (error) {
          console.log(error);
        });   
    }
  }
  render () {
    var self = this;
    return (
      <div>
        {<NavLists
        	username={this.props.username}
        	category={this.state.list}
        	lists={this.props.all_lists}
        	onSelect={this.updateList}/>}
        {<TaskGrid
          task_count={this.props.task_count}
          task_ids={this.props.task_ids}
          descriptions={this.props.descriptions}
          priorities={this.props.priorities}
          categories={this.props.categories}
          list={this.state.list}
          user_id={this.props.user_id}
          />}
        <div id="move_add_button">
          <a className="button" id="add-task" href="/tasks/add-task">New Task</a>
        </div>

        {this.state.list != "all" && 
          <button className="button delete-button" onClick={self.deleteList}>Delete List</button>}

      </div>
    );
  }
}

Tasks.propTypes = {
  username: PropTypes.string.isRequired,
  user_id: PropTypes.number.isRequired,
  task_count: PropTypes.number.isRequired,
  task_ids: PropTypes.array.isRequired,
  descriptions: PropTypes.array.isRequired,
  priorities: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  all_lists: PropTypes.array.isRequired,
}

export default Tasks