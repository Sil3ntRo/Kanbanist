import React, { Component } from 'react'
import ProductTask from './ProductTask/ProductTask'

 class Backlog extends Component {
  render() {
    const {product_tasks_prop} = this.props
    const tasks = product_tasks_prop.map(product_task =>(
        <ProductTask key={product_task.id} product_task={product_task} />
    ));

    let todoItems = [];
    let inProgressItems = [];
    let blockedItems = [];
    let doneItems = [];

    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].props.product_task.status === "TO_DO") {
            todoItems.push(tasks[i]);
        }
    }

    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].props.product_task.status === "IN_PROGRESS") {
            inProgressItems.push(tasks[i]);
        }
    }

    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].props.product_task.status === "BLOCKED") {
            blockedItems.push(tasks[i]);
        }
    }

    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].props.product_task.status === "DONE") {
            doneItems.push(tasks[i]);
        }
    }

    return (
        
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-secondary text-white">
                            <h3>TO DO</h3>
                        </div>
                    </div>
                    {todoItems}
                    {
                        
                    }                
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-primary text-white">
                            <h3>In Progress</h3>
                        </div>
                    </div>
                    {inProgressItems}
                    {
                        
                    }     
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-success text-white">
                            <h3>Blocked</h3>
                        </div>
                    </div>
                    {inProgressItems}
                    {
                        
                    }     
                    
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-success text-white">
                            <h3>Done</h3>
                        </div>
                    </div>
                    {inProgressItems}
                    {
                        
                    }     
                    
                </div>
            </div>
        </div>
    )
  }
}

export default Backlog