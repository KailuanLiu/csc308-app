// user-services.js
import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getUsers(name, job) {
  let promise; 
  if (!name && !job) {
    promise = userModel.find();
  } else if (name && !job) {
    promise =  findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  } else if (name && job) {
    promise = findUserByNameAndJob(name, job);
  }
  return promise;
}

function findUserById(_id) {
  return userModel.findById(_id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function findUserByNameAndJob(name, job) {
  return userModel.find({ name: name, job: job });
}

function deleteUserById(_id) {
  return userModel.findByIdAndDelete(_id).then((deletedUser) => !!deletedUser);
}

export default{ 
  addUser, 
  getUsers, 
  findUserById, 
  findUserByName, 
  findUserByJob, 
  deleteUserById 
};
