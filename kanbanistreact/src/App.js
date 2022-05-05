import React, {Component} from "react";
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AddTask from "./components/Task/AddTask";
import {Provider} from "react-redux";
import store from "./store";

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
            </Routes>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
