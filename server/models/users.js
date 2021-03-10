import mongoose from 'mongoose';

const allUsers = mongoose.Schema({
   name : String,
   email : String,
   password : String
});
const alUsers = mongoose.model('allUsers',allUsers);
export default alUsers;