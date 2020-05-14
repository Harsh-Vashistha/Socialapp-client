import React, { Component } from 'react'
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import AppIcon from '../images/icon.png';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import CircularProgress from '@material-ui/core/CircularProgress';
//import helperText from '@material-ui/core/FormHelperText'

import axios from 'axios';

//icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
//import { red } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
//redux stuff
import { connect } from 'react-redux'
import {signupUser, logoutUser} from '../redux/actions/userActions'

const styles={
    form:{
        textAlign:'center'
    },
    image:{
        margin:'20px auto 10px auto'
    },
    button:{
    
    },
    pageTitle:{
        margin:'10px auto 20px auto'
    },
    textField:{
        margin:'20px auto 10px auto',
        minWidth:'200px'
    },
    button:{
        marginTop:'20px',
        //position: 'relative'
    },
    textIcon:{
        marginTop:'45px',
        marginRight:'10px',
        marginLeft:'130px'
    },
    signup:{
        marginTop:'20px'
    }
    // customError:{
    //     color:'red',
    //     fontSize:'0.8rem',
    //     marginTop:'50px'
    // }
}
 

class signup extends Component {

    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            confirmPassword:'',
            handle:'',
            errors:{}
        }
    }

    componentWillReceiveProps(nextProps){
        // this.setState({errors:nextProps.UI.errors})
        if(nextProps.UI.errors){
         this.setState({ errors: nextProps.UI.errors });
        }
     }

    handleSubmit=(event)=>{

        event.preventDefault();

        this .setState({
            loading:true
        });

        const newUserData={
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword,
            handle:this.state.handle
        }

        this.props.signupUser(newUserData,this.props.history)
        // axios.post('/signup',newUserData)
        // .then((res)=>{
        //     localStorage.setItem('FBIdToken',`Bearer ${res.data.token}`)
        //     console.log(res.data.token);
        //     this.setState({
        //         loading:false
        //     });
        //     this.props.history.push('/');
        // })
        // .catch((err)=>{
        //     this.setState({
        //         errors:err.response.data,
        //         loading:false
        //     });
        // });
    } 

    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }



    render() {
        const { classes, UI:{ loading } }=this.props;
        const {errors}=this.state;

        return (
                <Grid container className={classes.form}>
                    <Grid item sm/>
                    <Grid item sm >
                        <img src={AppIcon} alt="icon" className={classes.image}/>
                        <Typography variant="h2"className={classes.pageTitle}>
                            Signup
                        </Typography>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <Grid container spacing={1}>
                                <Grid item className={classes.textIcon}>
                                    <AccountCircleIcon/>
                                </Grid>
                                <Grid item>
                                <TextField 
                                id="email" 
                                name="email" 
                                type="email" 
                                label="Email"
                                className={classes.textField} 
                                helperText={errors.email}
                                error={errors.email?true:false}
                                value={this.state.email} 
                                onChange={this.handleChange} 
                                fullWidth/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                            <Grid item className={classes.textIcon}>
                                    <RemoveRedEyeIcon/>
                                </Grid>
                                <Grid item>
                                <TextField 
                                id="password" 
                                name="password" 
                                type="password" 
                                label="Password" 
                                helperText={errors.password}
                                error={errors.password?true:false}
                                className={classes.textField} 
                                value={this.state.password} 
                                onChange={this.handleChange} 
                                fullWidth/>
                                </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                            <Grid item className={classes.textIcon}>
                                    <RemoveRedEyeIcon/>
                                </Grid>
                                <Grid item>
                                <TextField 
                                id="confirmPassword" 
                                name="confirmPassword" 
                                type="password" 
                                label="Confirm Password" 
                                helperText={errors.confirmPassword}
                                error={errors.confirmPassword?true:false}
                                className={classes.textField} 
                                value={this.state.confirmPassword} 
                                onChange={this.handleChange} 
                                fullWidth/>
                                </Grid>
                                </Grid>
                                {/* {errors.general&&(
                                    <div>
                                    <Typography variant="body2" className={classes.customError}>
                                        {errors.general}
                                    </Typography>
                                    </div>
                                )}  */}
                                 <Grid container spacing={1}>
                            <Grid item className={classes.textIcon}>
                                    <AccountCircleIcon/>
                                </Grid>
                                <Grid item>
                                <TextField 
                                id="handle" 
                                name="handle" 
                                type="text" 
                                label="Handle" 
                                helperText={errors.handle}
                                error={errors.handle?true:false}
                                className={classes.textField} 
                                value={this.state.handle} 
                                onChange={this.handleChange} 
                                fullWidth/>
                                </Grid>
                                </Grid>
                            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>Signup</Button>
                            <small><div className={classes.signup}>Already have an account ?Login <Link to='/login'>Here</Link></div></small>

                        </form> 
                    </Grid>
                    <Grid item sm/>
                </Grid>
        )
    }
}

signup.propTypes={
    classes:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired,
    UI:PropTypes.object.isRequired,
    signupUser:PropTypes.func.isRequired
}

const mapStateToProps=(state)=>({
    user:state.user,
    UI:state.UI
})
const mapActionsToProps={
    signupUser
}

export default connect(mapStateToProps,mapActionsToProps) (withStyles(styles)(signup))
