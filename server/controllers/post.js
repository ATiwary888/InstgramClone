import  mongoose  from 'mongoose';
import PostMessage from '../models/postMessage.js';
import allUsers from '../models/users.js';
import bcrypt from 'bcryptjs'

export const getPosts = async (req,res) => {
    try{
        const postMessages = await PostMessage.find();
        // console.log("before:");
        // console.log(postMessages);
        res.status(200).json(postMessages);

    }catch(error){
        res.status(404).json({message: error.message});

    }
}
export const createUser = async(req,res) =>{
    const userData = req.body;
    // console.log(userData);
    const email = userData.email;
     
    const user = await allUsers.findOne({email});


    if(!user){ console.log('user not found');
         return res.status(404).json({ email:"",password:"****",message: "invalid password"})}else{
        
        const isPasswordCorrect = await bcrypt.compare( userData.password,user.password);

        // console.log('user found');
    if (!isPasswordCorrect) {
        // console.log('flying in sky');
        return res.status(404).json({ email:"", password:"****", message: "Invalid credentials" });
    }else{
        // console.log("waigbrother");
        res.status(200).json({ name:user.name, email:email,password:"****",message: "invalid password"})
    }
    }

}

export const loginUser = async (req,res) => {
    
        const userData = req.body;
        // console.log(userData);

        var newUser ={
            name:req.body.name,
            email : req.body.email,
            password: req.body.password
        }

        var has = 'xs';
        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(newUser.password,salt,function(err,hash){
                newUser.password = hash;
                has = hash;
                // console.log(hash);
                    const newuserdb = new allUsers(newUser);
                    // try{
                         newuserdb.save();
                        })
                    });
                    // console.log(has);
                    // console.log('again2');
                    res.status(201).json(userData);

}

export const createPost = async (req,res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try{
        await newPost.save();
        res.status(201).json(newPost );
    }catch(error){
        res.status(409).json(error);
    } 
}

// export const updatePost = async(req,res) => {
//     const {id: _id} = req.params;
//     const post = req.body;

//     if(mongoose.Types.ObjectId.isValid(_id))
//     return res.status(404).send("No post with this  id");
    
//     const updatePost = await PostMessage.findByIdAndUpdate(_id,post,{new:true});
//     res.json(updatePost);

// }

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async(req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with this id:');
    await PostMessage.findByIdAndRemove(id);
    res.json({message: 'Post deleted successfully'});
}

export const likePost = async (req, res) => {
    const email = req.body.email;
    const  id  = req.body.id;
    // console.log('liking in backend');
    // console.log(email);
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await PostMessage.findById(id);
    // console.log(req.body)
    // console.log('ok');

    const index = post.likeCount.findIndex((m)=>m===email);
    // console.log(index);

    if (index === -1) {
        post.likeCount.push(email);
      } else {
        post.likeCount = post.likeCount.filter((id) => id !== email);
      }
    //   console.log(post);


    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    // console.log('updated post');
    // console.log(updatedPost);

    res.json(updatedPost); 
}

//...................................................................................

