import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import {createPost,updatePost} from '../../actions/posts';


const Form = ({currentId, setCurrentId}) =>{
    const user = JSON.parse(localStorage.getItem('profile'));
    const post = useSelector((state)=>currentId?state.posts.find((p)=>p._id===currentId):null);
    const [postData, setPostData] = useState({
        creator:'',title:'',message:'',tags:'',selectedFile:'',creatorEmail:''
    });
    // const user = localStorage.
    const [usx,setUsx] = useState("");
    // const usx = user?.email;
    const dispatch = useDispatch();

    const handleSubmit = (e) =>{    // Handling onSubmit....
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId,postData));
            console.log(user);
        }else{

            dispatch(createPost(postData));
        }
        clear();

    }//...........................................................................
    useEffect(()=>{
        if(post) setPostData(post);
    },[post]);

    useEffect(()=>{
        if(user) setUsx(user.email);
    },[usx]);




    const clear = () =>{
        setCurrentId(null);
        setPostData({
            creator:'',title:'',message:'',tags:'',selectedFile:'',
        })

    }

    if (!user?.email) {
        return (
          <Paper >
            <Typography variant="h6" align="center">
              Please Sign In to create your own memories and like other's memories.
            </Typography>
          </Paper>
        );
      }
    



    return (
       <Paper>
           <form autoComplete= "off" noValidate onSubmit = {handleSubmit}>
               <Typography variant = "h6">{currentId?'Editing':'Create'} a Memory</Typography>
               <TextField name = "title" variant = "outlined" label = "Title" fullWidth value= {postData.title} onChange={(e)=>setPostData({...postData,title:e.target.value})}/>
               <TextField name = "creator" variant = "outlined" label = "Creator" fullWidth value= {postData.creator} onChange={(e)=>setPostData({...postData,creator:e.target.value})}/>
               <TextField name = "message" variant = "outlined" label = "Message" fullWidth value= {postData.message} onChange={(e)=>setPostData({...postData,message:e.target.value})}/>
               <TextField name = "variant" variant = "outlined" label = "Tags" fullWidth value= {postData.tags} onChange={(e)=>setPostData({...postData,tags:e.target.value})}/>
                <div>
                    <FileBase
                    type="file"
                    multiple={false}
                    onDone={({base64})=>setPostData({...postData,selectedFile:base64})}
                
                    />
                </div>
                <Button variant = "contained" color = "secondary" size = "large" type = "submit" fullWidth >Submit</Button>
                <Button variant = "contained" color = "primary" size = "large" onClick = {clear} fullWidth >Clear</Button>
           
           </form>
       </Paper>
    );
}

export default Form;