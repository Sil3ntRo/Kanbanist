import React, { Component } from 'react'
import CreateTaskButton from './Task/CreateTaskButton';
import TaskItem from './Task/TaskItem';
import {connect} from "react-redux";
import {getTasks} from "../actions/taskActions";
import PropTypes from "prop-types";

class Dashboard extends Component {
  
  componentDidMount(){
    this.props.getTasks();
  }
  
  render() {

    const {tasks} = this.props.task

    return (

        <div className="tasks">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">Tasks</h1>
                    <br />
                    <CreateTaskButton />
                    <br />
                    <hr />
                    {tasks.map(task => (
                      <TaskItem key={task.id} task={task} />

                    ))}
                </div>
            </div>
        </div>
    </div>

    );
  }
}

Dashboard.propTypes = {
  task: PropTypes.object.isRequired,
  getTasks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  task:state.task,

})

export default connect(mapStateToProps, {getTasks})(Dashboard);