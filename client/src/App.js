import React, {useState,useEffect} from 'react';
import { Container, AppBar, Typography, Grow, Grid, Button} from '@material-ui/core';
import memories from './images/memories.jpg';
import Posts from './cmp/Posts/Posts';
import Form from './cmp/Form/Form';
import Auth from './cmp/Auth'
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import {getPost} from './actions/posts';
import Homecmp from './homecmp';
import posts from './reducers/posts';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () =>{
    const [currentId, setCurrentId]=useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    
    const clear = () =>{
        localStorage.clear();

    }

    useEffect(()=>{
        dispatch(getPost());
    },[currentId,dispatch]);
    
    return (
        <BrowserRouter>
        <Container maxidth = "lg">
       
            <Switch>
            
            <Route path="/auth" exact component={Auth} />
            <Route path="/" exact component={Homecmp} />
            </Switch>    
           
        </Container>
        </BrowserRouter>
       
    )
}

export default  App;