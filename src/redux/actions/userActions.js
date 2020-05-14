import{SET_USER,SET_ERRORS,CLEAR_ERRORS,LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED,LOADING_USER} from '../types'
import axios from 'axios';

export const loginUser=(userData,history)=>(dispatch)=>{
    dispatch({type: LOADING_UI});
    axios.post('/login',userData)
    .then((res)=>{
    // console.log(res.data);
    // this.setState({
    //     loading:false
    // });
    setAuthorizationHeader(res.data.token)
    dispatch(getUserData());
    dispatch({type:CLEAR_ERRORS});
    /*this.props.*/history.push('/');
    })
    .catch((err)=>{
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    //  this.setState({
    //     errors:err.response.data,
    //     loading:false
    //     });
    });
}

export const signupUser=(newUserData,history)=>(dispatch)=>{
    dispatch({type: LOADING_UI});
    axios
     .post('/signup',newUserData)
     .then((res)=>{

     setAuthorizationHeader(res.data.usertoken);
    
    //dispatch( getUserData());
    getUserData();
     dispatch({type:CLEAR_ERRORS});
    /*this.props.*/
    history.push('/');
    })
    .catch((err)=>{
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        });
    //  this.setState({
    //     errors:err.response.data,
    //     loading:false
    //     });
    });
}

export const getUserData=()=> (dispatch)=>{
    dispatch({type:LOADING_USER})
    axios.get('/user')
    .then(res=>{
        dispatch({
            type:SET_USER,
            payload:res.data
        })
    })
    .catch(err=>console.log(err));

}

export const logoutUser=()=>(dispatch)=>{
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type:SET_UNAUTHENTICATED})
}

const setAuthorizationHeader=(token)=>{
    const FBIdToken=`Bearer ${token}`;
    localStorage.setItem('FBIdToken',FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}
export const uploadImage =(formData)=>(dispatch)=>{
    dispatch({type:LOADING_USER});
    axios.post('/user/image',formData)
    .then(()=>{
        dispatch(getUserData());
    })
    .catch(err=>console.log(err));
}

export const editUserDetails=(userDetails)=>(dispatch)=>{
    dispatch({type:LOADING_USER});

    axios.post('/user',userDetails)
    .then(()=>{
        dispatch(getUserData());
    })
    .catch(err=>console.log(err));
}