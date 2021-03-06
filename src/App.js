import React, { Component } from 'react'
import './App.css'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
//components
import Navbar from './components/Layout/Navbar'
//pages 
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user'
//jwt--decode
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute'
//axios
import axios from 'axios';

//redux
import {Provider} from 'react-redux';
import store from './redux/store'
import{SET_AUTHENTICATED} from './redux/types'
import {logoutUser,getUserData} from './redux/actions/userActions'




const theme=createMuiTheme({
    palette: {
      primary: {
        light:'#a2cf6e',
        main:'#8bc34a',
        dark:'#618833',
        contrastText:'#fff'
    },
      secondary: {
        light:'#d6ffa6',
        main: '#ccff90',
        dark:'#8eb264',
        contrastText:'#fff'
      }
    },
    typography:{
      userNextVariants:true,
     fontSize:10
  }
});

const token=localStorage.FBIdToken;
if(token){
  const decodedToken=jwtDecode(token);
  if(decodedToken.exp*1000 < Date.now()){
    store.dispatch(logoutUser());
   window.location.href='/login';
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization']=token;
    store.dispatch(getUserData());
  }
}


// const token=localStorage.getItem('FBIdToken');

// if(token){
//   const decodedToken=jwtDecode(token);
//   console.log(decodedToken);

// }

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
        <Router>
        <Navbar/>
          <div className="container">
          <Switch>
            <Route exact path='/' component={home}/>
            <AuthRoute exact path='/login' component={login}   /*authenticated={authenticated}*/        />
            <AuthRoute exact path='/signup' component={signup} /*authenticated={authenticated}*/        />
            <Route exact path="/users/:handle" component={user}/>
            <Route exact path="/users/:handle/scream/:screamId" component={user}/>
          </Switch>
          </div>
        </Router>
      </Provider>
      </MuiThemeProvider>

    );
  }
}

export default App
