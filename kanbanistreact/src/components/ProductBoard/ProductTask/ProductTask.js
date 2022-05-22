import React, { Component } from 'react';
import { Link } from "react-router-dom";


class ProductTask extends Component {
  render() {
    const {product_task} = this.props;

    let priorityString;
    let priorityClass;

    if(product_task.priority === 1) {
        priorityClass = "bg-danger text-light"
        priorityString = "HIGH"
    }

    if(product_task.priority === 2) {
        priorityClass = "bg-warning text-light"
        priorityString = "MEDIUM"
    }

    if(product_task.priority === 3) {
        priorityClass = "bg-info text-light"
        priorityString = "LOW"
    }
    return (

         <div className="card mb-1 bg-light">

             <div className={`card-header text-primary ${priorityClass}` }>
                 ID: {product_task.producttSequence} -- Priority: {priorityString}
             </div>
             <div className="card-body bg-light">
                 <h5 className="card-title">{product_task.summary}</h5>
                 <p className="card-text text-truncate ">
                     {product_task.acceptanceCriteria}
                 </p>
                 <Link
                    to={`/updateProductTask/${product_task.projectIdentifier}/${
                    product_task.productSequence
                    }`}
                    className="btn btn-primary"
                    >
                    View / Update
                </Link>

                 <button className="btn btn-danger ml-4">
                     Delete
                 </button>
             </div>
        </div>

    );
  }
}

export default ProductTask;