import React, { Component } from 'react'
import TaskItem from './Task/TaskItem';

class Dashboard extends Component {
  render() {
    return (

        <div className="tasks">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">Tasks</h1>
                    <br />
                    <a href="TaskForm.html" className="btn btn-lg btn-info">
                        Create a Task
                    </a>
                    <br />
                    <hr />
                    <TaskItem />
              
                </div>
            </div>
        </div>
    </div>

    );
  }
}

export default Dashboard;