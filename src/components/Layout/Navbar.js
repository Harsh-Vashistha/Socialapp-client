import React, { Component,Fragment } from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton'
import PostScream from '../Scream/PostScream'
//import Notifications from './Notifications'
//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
//Icons
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';


class Navbar extends Component {
    render() {
        const {authenticated}=this.props;
        return(
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <PostScream/>
                            
                            <Link to="/">
                            <MyButton tip="Home">
                                 <HomeIcon />
                            </MyButton>
                            </Link>

                          
                                <Notifications />
                              
                          
                        </Fragment>

                    ):(
                        <Fragment>
                        <Button color="inherit" component={Link} to="/login"> login </Button>
                        <Button color="inherit" component={Link} to="/"> home </Button>
                        <Button color="inherit" component={Link} to="/signup"> signup</Button>
                        </Fragment>
                    )}

                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes={
    authenticated:PropTypes.bool.isRequired
}
const mapStateToProps=state=>({
    authenticated:state.user.authenticated
})

export default connect(mapStateToProps)( Navbar);
