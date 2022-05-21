import { Component } from "react";
import {Link} from "react-router-dom";
import Backlog from "./Backlog";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getBacklog} from "../../actions/backlogActions"

class ProductBoard extends Component {

    constructor() {
        super();
        this.state = {
            errors: {}
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getBacklog(id);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    render() {
        const {id} = this.props.match.params;
        const {product_tasks} = this.props.backlog;
        const {errors} = this.state

        let BoardContent;

        const boardAlgo = (errors, product_tasks) => {
            if(product_tasks.length < 1) {
              if(errors.productNotFound) {
                  return (   
                    <div className="alert alert-danger text-center" role="alert">
                        {errors.productNotFound}
                    </div>
                  );
              } else {
                return (<div className="alert alert-info text-center" role="alert">
                        No Product Tasks on this board
                    </div>
                );
              }
            } else {
                return <Backlog product_tasks_prop={product_tasks}/>

            }
        };

        BoardContent = boardAlgo(errors, product_tasks);

        return (    
            <div className="container">
            <Link to={`/addProductTask/${id}`} className="btn btn-primary mb-3">
                <i className="fas fa-plus-circle"> Create Product Task </i>
            </Link>
            <br />
            <hr />
            {BoardContent}
            </div>
            
        );
    }
}

ProductBoard.propTypes = {
    backlog: PropTypes.object.isRequired,
    getBacklog: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    backlog: state.backlog,
    errors: state.errors
});

export default connect(mapStateToProps, {getBacklog})(ProductBoard);