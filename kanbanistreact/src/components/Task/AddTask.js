import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createTask} from "../../actions/taskActions";

class AddTask extends Component {
  constructor() {
    super()

    this.state = {
      taskName: "",
      taskIdentifier: "",
      description: "",
      start_date: "",
      end_date: "",
      errors:{}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Life cycle hooks
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors});
    }
  }
  
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e){
    e.preventDefault();
    const newTask = {
      taskName: this.state.taskName,
      taskIdentifier: this.state.taskIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date
    };

    this.props.createTask(newTask, this.props.history)

}

  render() {
    const {errors} = this.state;

    return (
      <div>
        <div className="register">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h5 className="display-4 text-center">Create / Edit Task form</h5>
                    <hr />
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input 
                              type="text" 
                              className="form-control form-control-lg " 
                              placeholder="Task Name" 
                              name="taskName"
                              value={this.state.taskName}
                              onChange={this.onChange}  
                              />
                        <p>{errors.taskName}</p>

                        </div>
                        <div className="form-group">
                            <input 
                              type="text" 
                              className="form-control form-control-lg" 
                              placeholder="Unique Task ID"
                              name="taskIdentifier"
                              value={this.state.taskIdentifier}
                              onChange={this.onChange}  

                                 />
                              <p>{errors.taskIdentifier}</p>

                        </div>
                        <div className="form-group">
                            <textarea 
                              className="form-control form-control-lg" 
                              placeholder="Task Description" 
                              name="description"
                              value={this.state.description} 
                              onChange={this.onChange}  
 
                              />
                            <p>{errors.description}</p>


                        </div>
                        <h6>Start Date</h6>
                        <div className="form-group">
                            <input 
                              type="date" 
                              className="form-control form-control-lg" 
                              name="start_date" 
                              value={this.state.start_date}
                              onChange={this.onChange}  
  
                              />
                        </div>
                        <h6>Estimated End Date</h6>
                        <div className="form-group">
                            <input type="date" 
                              className="form-control form-control-lg" 
                              name="end_date" 
                              value={this.state.end_date}
                              onChange={this.onChange}    
                              />
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>

      </div>

      
    );
  }
}

AddTask.propTypes = {
  createTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {createTask}
  ) (AddTask);