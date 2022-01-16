const express = require("express");
const { parserClients, addClient, updateClient, findAclient, updateSingleUser, updateCoupleUsers  } = require("../utils/utils");
const app = express();

const path = "./json/data.json";

const getUser = (req, res) => {
  res.send("works");
};

const addUser = (req, res) => {
//   use try catch
  const usersData = parserClients(path);
  const { id, cash, credit } = req.body;
  // move to the top of the file
  
  const data = { id, cash, credit};
  usersData.users.push(data);
  addClient(usersData, path);
  res.send(`User has been added`);
};

const editUser = (req, res) => {
  const usersData = parserClients(path);
  const { id } = req.query;
  const { cash, credit } = req.body;
  try {
    const data = usersData.users.filter((user) => {
      if (user.id === +id) {
        user.cash = cash;
        user.credit = credit;
        return user;
      } else {
        return user;
      }
    });
    // move to utils
    
    usersData.users = data.sort((a, b) => a.id - b.id);
    // move to utils

    updateClient(usersData, path);
    // not good name updateClient === updateUser but that still not tell me what you update please be clearer
    
  } catch (err) {
    res.send(err.toString());
  }
  res.send("ok");
};

const deleteUser = (req, res) => {
  res.send("ok");
};

const getAllUsers = (req, res) => {
  const usersData = parserClients(path);
  // just users not usersData
  
  res.send(usersData);
};

const deposit = (req,res) => {
 const {id} = req.params;
 const { amount } = req.body;
  // good code
  
 const user = findAclient(path, +id);
  // bad function name findClient => findUser
  // good name ( const user )
 console.log(user); // remove console.log
 user.cash += amount;
 updateSingleUser(path, user);
  // good name 
 res.send("ok");
 };

const withdraw = (req,res) => {
  const {id} = req.params;
  const user = findAclient(path, +id);
  // see above
  
  const { amount } = req.body;
  // move to the top of the function
  
  user.cash -= amount;
  updateSingleUser(path, user);
  res.send("ok");
};

const transfer = (req, res) => {
  const {amount} = req.query;
  const {user1, user2} = req.body;
  // good code
  
  const firstUser = findAclient(path, +user1.id);
  const secondUser = findAclient(path, +user2.id);
  // bad names please think on other name fo this vars
  // see above
  
  firstUser.cash -= amount;
  secondUser.cash += amount;
  
  const two = [firstUser, secondUser];
  // bad name two is the length of the array but that really not a something with meaning
  updateCoupleUsers(path, two); 
  res.send("ok");
  // if you dont want to send something use res.end()
}



module.exports = { getUser, addUser, editUser, deleteUser, getAllUsers, deposit, withdraw, transfer};
