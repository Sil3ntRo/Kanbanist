import React, { Component } from 'react'
import CreateTaskButton from './Task/CreateTaskButton';
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
                    <CreateTaskButton />
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