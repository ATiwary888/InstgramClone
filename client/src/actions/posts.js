import * as api from '../api';

// action creators

export const getPost = ()=> async (dispatch) =>{
    try{
        const {data} = await api.fetchPosts();
        dispatch({type: 'FETCH_ALL',payload : data});
    
    }catch(error){
        console.log(error.message);
    }
    
    
}

export const createPost = (post) => async (dispatch) =>{
    try{
        console.log("trying...");
        post = {...post,creator: JSON.parse(localStorage.getItem('profile')).name,
         creatorEmail:JSON.parse(localStorage.getItem('profile')).email}
        const {data} = await api.createPost(post);
        dispatch({type:'CREATE', payload: data});

    }catch(error){
        console.log("failed!!!")
        console.log(error.message);
    }
}
export const realLogin = (adata,history) => async (dispatch) =>{
   try{
       console.log('action-sending');
       console.log(adata);
       const {data} = await api.reallLogin(adata);
       console.log(data);
       if(data.email!==""){
           const newdata = {name:data.name,email:data.email,password:data.password}
           console.log(newdata)
           dispatch({type:'AUTH', payload: newdata});
           history.push('/');
       }
   }catch(err){
       console.log(err);
   } 
}


export const AuthLogin = (post,history) => async (dispatch) =>{
    try{
        console.log("sending11...");
        console.log(post);
        const {data} = await api.authLogin(post);
        console.log('recieved22....');
        console.log(data);
        console.log('dispatching data...');
        dispatch({type:'AUTH', payload: data});
        history.push('/')

    }catch(error){
        console.log("failed!!!")
        console.log(error.message);
    }
}

export const updatePost = (id,post) =>async (dispatch)=>{
    try{
        const {data} = await api.updatePost(id,post);
        dispatch({type: 'UPDATE',payload: data});

    }catch(error){
        console.log(error);

    }
}

export const deletePost = (id) => async (dispatch) =>{
    try{
        await api.deletePost(id);
        dispatch({type:'DELETE',payload:id});
    }catch(error){
        console.log(error);
    }
}

export const likePost = (id)=> async (dispatch) => {
    try{
        console.log('liking....');
        const data= { id: id, email :JSON.parse(localStorage.getItem('profile')).email,
    }
    console.log(data);

        const dataa = await api.likePost(data);
        const mydata = dataa.data;
        console.log(data);
        console.log(dataa);
        dispatch({type: 'LIKE',payload: mydata});

    }catch(error){
        console.log('failed search for reason');
        console.log(error);
    }
}