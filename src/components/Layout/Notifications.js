import React, { Component } from 'react'
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream'
//mui  stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import ScreamDialog from './ScreamDialog'
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ToolTip from '@material-ui/core/ToolTip';
import Badge from '@material-ui/core/Badge';

//redux
import {connect} from 'react-redux';
import {markNotificationsRead} from '../../redux/actions/userActions'


//icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import NotificationsIcon from '@material-ui/icons/Notifications';

class Notifications extends Component{
    state={
        anchorEl:null
    }
}

export connect(mapStateToProps,{})