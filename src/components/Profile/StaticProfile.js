import React,{Component,Fragment} from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs';
import withStyles from '@material-ui/core/styles/withStyles'
import MuiLink from '@material-ui/core/Link'
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

//icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';


const styles=(theme)=>({
    paper:{
        padding:20
    },
    profile:{
        '& .image-wrapper':{
            textAlign:'center',
            position:'relative'
        },
        '& .profile-image':{
            width:200,
            height:200,
            objectFit:'cover',
            maxWidth:'100%',
            borderRadius:'50%'
        },
        '& .profile-details':{
            textAlign:'center',
            '& span,svg':{
                verticalAlign:'middle'
            },
            '& a':{
                color:'#8bc34a'
            }
        },
        '& hr':{
            border:'none',
            margin:'0 0 10px 0'
        }
    }
});

const StaticProfile=(props)=>{
    const{classes,profile:{handle,createdAt,imageUrl,bio,website,location}}=props
    return (
        <Paper className={classes.paper}>
        <div className={classes.profile}>
           <div className="image-wrapper">
               <img src={imageUrl} alt="profile" className="profile-image"/>
           </div>
           <hr/>
           <div className="profile-details">
               <MuiLink component={Link} to={`/user/${handle}}`} color="primary" variant="h5">
                   @{handle}
               </MuiLink>
               <hr/>
               {bio && <Typography variant="body2">{bio}</Typography>}
               <hr/>
               {location && (
                 <Fragment>
                       <LocationOn color="primary" /> <span> {location} </span> 
                   <hr/>
                 </Fragment>
               )}

               {website && (
                   <Fragment>
                       <LinkIcon color="primary"/>
                       <a href={website} target="_blank" rel="noopener noreferrer">
                           {' '}{website}
                       </a>
                       <hr/>
                   </Fragment>
               )}
               <CalendarTodayIcon color="primary"/>{' '}
               <span>joined{dayjs(createdAt).format('MMM YYYY')}</span>
           </div>
        </div>
    </Paper>

    )
}

StaticProfile.propTypes={
    profile:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile)