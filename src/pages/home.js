import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream/Scream';
import PropTypes from 'prop-types';

//import { Typography } from '@material-ui/core';
import axios from 'axios';
//import path from 'path';

import Profile from '../components/Profile/Profile';
import {connect} from 'react-redux'
import { getScreams} from '../redux/actions/dataActions'
class home extends Component {

    // state={
    //     screams:null
    // }

    componentDidMount(){
        this.props.getScreams();
    //    axios.get('/scream')
    //  // axios.get(s)
    //     .then(res=>{
    //      //   console.log(res.data)
    //         this.setState({
    //             screams:res.data
    //         })
    //     })
    //     .catch(err=>console.log(err));
    }

    render(){
        const{ screams, loading}={...this.props.data}
    //     const {screamId}={...screams}
        let recentScreamsMarkup=!loading?(
        screams.map((scream)=> <Scream key={scream.screamId} scream={scream}/>)
        ):(<p>Loading...</p>);
        return (
           <Grid container spacing={10}>
               <Grid item sm={8} xs={12}> 
               {recentScreamsMarkup}
               </Grid>
               <Grid item sm={4} xs={12}> 
               <Profile/>
               </Grid>
           </Grid>
        )
    }
}
home.propTypes={
    getScreams:PropTypes.func.isRequired,
    data:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
    data:state.data
})

export default connect(mapStateToProps,{getScreams})(home)
