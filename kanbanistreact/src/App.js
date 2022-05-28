import React, {Component} from "react";
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AddTask from "./components/Task/AddTask";
import {Provider} from "react-redux";
import store from "./store";
import UpdateTask from "./components/Task/UpdateTask";
import ProductBoard from "./components/ProductBoard/ProductBoard"
import AddProductTask from "./components/ProductBoard/ProductTask/AddProductTask";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";

class App extends Component {
  render() {
      return (
      <Provider store={store}>
        <Router>
          <div className="App">
          <Header />
            <Routes>
              <Route exact path="/dashboard" element={<Dashboard />}/>
              <Route exact path="/addTask" element={<AddTask />}/>
              <Route exact path="/updateTask/:id" element={<UpdateTask />}/>
              <Route exact path="/taskBoard/:id" element={<ProductBoard />}/>
              <Route exact path="/addProductTask/:id" element={<AddProductTask />} />
              <Route exact path="/updateProductTask/:id" element={<ProductBoard />} />
              <Route exact path="/" element={<Landing />}/>
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
