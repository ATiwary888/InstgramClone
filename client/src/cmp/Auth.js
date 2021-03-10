import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper, Container } from '@material-ui/core';
import {useHistory} from 'react-router-dom';

import {useDispatch} from 'react-redux';
import {AuthLogin,realLogin} from '../actions/posts';

const Auth = () =>{
    const history = useHistory();

    const [authData, setAuthData] = useState({
        email:'', password:"", name : ""
    });
    const [loginData, setLoginData] = useState({
        email:'', password:"", name : ""
    });
    const dispatch = useDispatch();

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(authData.email);
        console.log(authData.password);
        dispatch(AuthLogin(authData,history));
        // history.push('/')
        

    }

    const handleLogin=(e) =>{
        e.preventDefault();
        dispatch(realLogin(loginData,history));
        console.log(loginData);


    }


    

    return (
        <Container>

        
        <Container component="main" maxWidth="xs">
            <Paper>
                <h3>Sign in</h3>
           <form  autoComplete= "off" noValidate onSubmit = {handleSubmit}>
               <TextField name = "title" variant = "outlined" label = "Name" fullWidth  value= {authData.name} onChange={(e)=>setAuthData({...authData,name:e.target.value})}/>
               <TextField name = "title" variant = "outlined" label = "Email" fullWidth  value= {authData.email} onChange={(e)=>setAuthData({...authData,email:e.target.value})}/>

               
               <TextField name = "title" variant = "outlined" label = "Password" fullWidth value= {authData.password} onChange={(e)=>setAuthData({...authData,password:e.target.value})}/>
              <Button type = "submit" variant="contained" color = "primary">Submit</Button>
           </form>
        </Paper>
           </Container>

<Container component="main" maxWidth="xs">
<Paper>
    <h3>Log in</h3>
<form  autoComplete= "off" noValidate onSubmit = {handleLogin}>
   <TextField name = "title" bsSize="large" variant = "outlined" label = "Name" fullWidth  value= {loginData.name} onChange={(e)=>setLoginData({...loginData,name:e.target.value})}/>
   <TextField name = "title" variant = "outlined" label = "Email" fullWidth  value= {loginData.email} onChange={(e)=>setLoginData({...loginData,email:e.target.value})}/>

   
   <TextField name = "title" variant = "outlined" label = "Password" fullWidth value= {loginData.password} onChange={(e)=>setLoginData({...loginData,password:e.target.value})}/>
  <Button type = "submit" variant="contained" color = "primary">Submit</Button>
</form>
</Paper>
</Container>
        </Container>
      
    );
}

export default Auth;