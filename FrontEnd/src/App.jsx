import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router';
import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx';
import ChatPage from './Components/ChatPage';
import { ToastContainer } from 'react-toastify';



const App = () => {
    return (
        <Fragment>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/signup' component={Signup}/>
                <Route path='/' exact component={ChatPage}/>
            </Switch>
            <ToastContainer/>
        </Fragment>
      );
}
 
export default App;