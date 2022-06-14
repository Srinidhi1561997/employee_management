import React, { useEffect } from 'react';
import './App.css';
import {HashRouter as Router} from 'react-router-dom'
import { connect } from "react-redux";
import AppRoutes from './router'
import {
  deleteEmployees,
  createEmployees,
  getEmployees
} from "./reducers/actions"
import AppPropType from './AppPropType'
import { initialReducerState } from './utils/interface';

const App  =()=> {

  return (
    <Router>
      <AppRoutes/>
    </Router>
  );
}

// const mapStateToProps = (state: initialReducerState) => {
//   return {
//     employees: state.employees,
//     isLoading: state.isLoading
//   };
// };

export default App;
