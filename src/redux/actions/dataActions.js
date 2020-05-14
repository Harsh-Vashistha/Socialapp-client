import {SET_SCREAMS,LOADING_DATA,LIKE_SCREAM,UNLIKE_SCREAM, LOADING_USER,DELETE_SCREAM} from '../types';

import axios from 'axios';

export const getScreams=()=>dispatch=>{
    dispatch({type:LOADING_DATA});
    axios.get('/scream')
    .then(res=>{
        dispatch({
            type:SET_SCREAMS,
            payload:res.data
        })
    })
    .catch(err=>{
        console.log("error has occurred");
        dispatch({
            type:SET_SCREAMS,
            payload:[]
        })
    })
}

export const likeScream=(screamId)=>dispatch=>{
    axios.get(`/scream/${screamId}/like`)
    .then(res=>{
        dispatch({
            type:LIKE_SCREAM,
            payload:res.data
        })
    })
    .catch(err=>console.log(err));
}

export const unlikeScream=(screamId)=>dispatch=>{
    axios.get(`/scream/${screamId}/unlike`)
    .then(res=>{
        dispatch({
            type:UNLIKE_SCREAM,
            payload:res.data
        })
    })
    .catch(err=>console.log(err));
}

export const deleteScream=(screamId)=>(dispatch)=>{
    axios.delete(`/scream/${screamId}`)
    .then(()=>{
        dispatch({type:DELETE_SCREAM,
        payload:screamId
    })
    })
    .catch(err=>console.log(err));
}