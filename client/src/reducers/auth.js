// import * as actionType from '../constants/actionTypes';
// import {useHistory} from 'react-router-dom';

// const history = useHistory();

const authReducer = (state = {email:"",password:""}, action) => {
  switch (action.type) {
    case 'AUTH':
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      console.log(action.payload);
      // history.push('/')
      console.log('waiting man....');

    //   return { ...state, authData: action.data, loading: false, errors: null };
        return state;
    case 'LOGOUT':
      localStorage.clear();
        return state;
    //   return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;