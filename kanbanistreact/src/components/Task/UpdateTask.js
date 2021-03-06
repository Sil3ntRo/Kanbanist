import React, { Component } from 'react'
import { getTask, createTask } from '../../actions/taskActions';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import classnames from 'classnames';

class UpdateTask extends Component {
    // set state
    constructor() {
      super()

      this.state = {
        "id": "",
        "taskName": "",
        "taskIdentifier": "",
        "description": "",
        "start_date": "",
        "end_date": "",
        "errors": {}
      };

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      
      if(nextProps.errors) {
        this.setState({errors: nextProps.errors});
      }
      const {
        id,
        taskName,
        taskIdentifier,
        description,
        start_date,
        end_date,

      } = nextProps.task

      this.setState({
        id,
        taskName,
        taskIdentifier,
        description,
        start_date,
        end_date,
      });
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getTask(id, this.props.history);
    }

    onChange(e) {
      this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
      e.prevDefault()

      const updateTask = {
        "id": this.state.id,
        "taskName": this.state.taskName,
        "taskIdentifier": this.state.taskIdentifier,
        "description": this.state.description,
        "start_date": this.state.start_date,
        "end_date": this.state.end_date,
      };

      this.props.createTask(updateTask, this.props.history);
    }

  render() {
    const {errors} = this.state;
    return (
        <div className="task">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Update Task form</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.taskName
                      })}
                      placeholder="Task Name"
                      name="taskName"
                      value={this.state.taskName}
                      onChange={this.onChange}
                    />
                    {
                      errors.taskName && (
                        <div className="invalid-feedback">{errors.taskName}</div>
                      )
                    }
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.taskIdentifier
                      })}
                      placeholder="Unique Task ID"
                      name="taskIdentifier"
                      value={this.state.taskIdentifier}
                      onChange={this.onChange}
                      disabled
                    />
                    {
                      errors.taskIdentifier && (
                        <div className="invalid-feedback">{errors.taskIdentifier}</div>
                      )
                    }
                  </div>
                  <div className="form-group">
                    <textarea
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.description
                      })}
                      placeholder="Task Description"
                      name="description"
                      onChange={this.onChange}
                      value={this.state.description}
                    />
                    {
                      errors.description && (
                        <div className="invalid-feedback">{errors.description}</div>
                      )
                    }
                  </div>
                  <h6>Start Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.start_date
                      })}
                      name="start_date"
                      value={this.state.start_date}
                      onChange={this.onChange}

                    />
                    {
                      errors.start_date && (
                        <div className="invalid-feedback">{errors.start_date}</div>
                      )
                    }

                  </div>
                  <h6>Estimated End Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.end_date
                      })}                      
                      name="end_date"
                      value={this.state.end_date}
                      onChange={this.onChange}

                    />
                    {
                      errors.end_date && (
                        <div className="invalid-feedback">{errors.end_date}</div>
                      )
                    }
                  </div>
  
                  <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

UpdateTask.propTypes = {
    getTask: PropTypes.func.isRequired,
    createTask: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    task: state.task.task,
    errors: state.errors
})


export default connect(mapStateToProps, {getTask, createTask})(UpdateTask)