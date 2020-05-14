//like component is not working because call to api asynchronous so nested object are undefined this.likedscream is returning false
//(https://stackoverflow.com/questions/50417895/cant-access-nested-json-objects-in-react)
//at 8:33
//I have to put screamId in scream collection
//screamId is string proptypes


import React, { Component } from 'react'
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton';
import DeleteScream from './DeleteScream'
//mui  stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

//redux
import {connect} from 'react-redux';
import {likeScream,unlikeScream} from '../redux/actions/dataActions'


//icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const styles={
    card:{
        display:'flex',
        marginBottom:20,
        position:'relative'
    },
    image:{
        minWidth:100,
    },
    content:{
     padding:25,
     objectFit:'cover'
    }

}


class Scream extends Component {

    likedScream=()=>{
        const {userData}={...this.props.user}
        const{likes}={...userData}
        const {scream}={...this.props}

        //  if(this.props.user.likes&&this.props.user.likes.find(like=>like.screamId===this.props.scream.screamId))
        //     return true;
        // else
        // {
        // return false
        // }

        
        if(this.props.user.likes &&this.props.user.likes.find(like=>like.screamId===this.props.scream.screamId))
        return true;
    else
    {
    return false
    }
    };

    likeScream=()=>{
        this.props.likeScream(this.props.scream.screamId);
        //this.props.likeScream("5T7DslEz4Q8KCJ3AxsF");
    }

    unlikeScream=()=>{
        this.props.unlikeScream(this.props.scream.screamId);
        //this.props.unlikeScream("5T7DslEz4Q8KCJ3AxsF");
    }




    render() {
        dayjs.extend(relativeTime)
        //below commented line is correct
//const { classes,scream:{body,createdAt,userImage,likeCount,commentCount,userHandle,screamId},user:{authenticated,credentials:{handle}}}=this.props

const { classes,scream:{body,createdAt,userImage,likeCount,commentCount,userHandle,screamId},user:{authenticated}}=this.props
const handle="jane"

 const likeButton=!authenticated?(
    <MyButton tip="like">
        <Link to="/login">
        <FavoriteBorder color="primary"/>
        </Link>
    </MyButton>
):(
    this.likedScream()?(
        <MyButton tip="Undo like"onClick={this.unlikeScream}>
            <FavoriteIcon color="primary"/>
        </MyButton>
    ):(
        <MyButton tip="like" onClick={this.likeScream}>
            <FavoriteBorder color="primary"/>
        </MyButton>
    )

)

const deleteButton=authenticated && userHandle===handle?(
    <DeleteScream screamId={screamId}/>
):null

//const classes=this.props.classes
        return (
            <Card className={classes.card}>
                <CardMedia  image={userImage} title="Profile Image" className={classes.image}/>

                <CardContent className={classes.content}>
                    <Typography variant="h4" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="subtitle1" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                   <Typography variant="body1">{body}</Typography>

                   {likeButton}
                   <span>{likeCount} Likes</span>
                   <MyButton tip="comments">
                       <ChatIcon color="primary"/>
                   </MyButton>
                   <span>{commentCount} comments</span>

                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes={
    user:PropTypes.object.isRequired,
    likeScream:PropTypes.func.isRequired,
    unlikeScream:PropTypes.func.isRequired,
    scream:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
user:state.user
})

const mapActionsToProps={
    likeScream,
    unlikeScream
}
export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Scream))