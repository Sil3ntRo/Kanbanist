import React, { Component } from 'react';
import { connect } from "react-redux";
import classnames from "classnames";
import { getProductTask, updateProductTask } from "../../../actions/backlogActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class UpdateProductTask extends Component {
    
    constructor() {
        super();
    
        this.state = {
          id: "",
          productSequence: "",
          summary: "",
          acceptanceCriteria: "",
          status: "",
          priority: "",
          dueDate: "",
          productIdentifier: "",
          create_At: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
    

    componentDidMount() {
        const { backlog_id, pt_id } = this.props.match.params;
        this.props.getProductTask(backlog_id, pt_id, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        const {
          id,
          productSequence,
          summary,
          acceptanceCriteria,
          status,
          priority,
          dueDate,
          productIdentifier,
          create_At
        } = nextProps.product_task;
    
        this.setState({
          id,
          productSequence,
          summary,
          acceptanceCriteria,
          status,
          priority,
          dueDate,
          productIdentifier,
          create_At
        });
      }
    
      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
      onSubmit(e) {
        e.preventDefault();
    
        const UpdateProductTask = {
          id: this.state.id,
          productSequence: this.state.productSequence,
          summary: this.state.summary,
          acceptanceCriteria: this.state.acceptanceCriteria,
          status: this.state.status,
          priority: this.state.priority,
          dueDate: this.state.dueDate,
          productIdentifier: this.state.productIdentifier,
          create_At: this.state.create_At
        };
    
        this.props.updateProductTask(
            this.state.productIdentifier, 
            this.state.productSequence, 
            UpdateProductTask,
            this.props.history
        );
      }
  
    render() {
        const { errors } = this.state;
        return (
        <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            <Link
                to={`/productBoard/${this.state.productIdentifier}`}
                className="btn btn-light"
              >
                Back to Product Board
              </Link>
              <h4 className="display-4 text-center">Update Product Task</h4>
              <p className="lead text-center">
                Product Name: {this.state.productIdentifier} | Product Task ID:{" "}
                {this.state.productSequence}{" "}
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.summary
                    })}
                    name="summary"
                    placeholder="Product Task summary"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  />
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="BLOCKED">BLOCKED</option>
                    <option value="DONE">DONE</option>
                  </select>
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

UpdateProductTask.propTypes = {
    getProductTask: PropTypes.func.isRequired,
    product_task: PropTypes.object.isRequired,
    updateProductTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    product_task: state.backlog.product_task,
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
    { getProductTask, updateProductTask })(UpdateProductTask);