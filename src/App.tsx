import './App.css';
import {HashRouter as Router} from 'react-router-dom'
import AppRoutes from './router'

const App  =()=> {

  return (
    <Router>
      <AppRoutes/>
    </Router>
  );
}

export default App;
