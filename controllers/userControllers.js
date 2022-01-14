const express = require("express");
const { parserClients, addClient, updateClient, findAclient, updateSingleUser, updateCoupleUsers  } = require("../utils/utils");
const app = express();

const path = "./json/data.json";

const getUser = (req, res) => {
  res.send("works");
};

const addUser = (req, res) => {
  const usersData = parserClients(path);
  const { id, cash, credit } = req.body;
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
    usersData.users = data.sort((a, b) => a.id - b.id);

    updateClient(usersData, path);
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
  res.send(usersData);
};

const deposit = (req,res) => {
 const {id} = req.params;
 const { amount } = req.body;
 const user = findAclient(path, +id);
 console.log(user);
 user.cash += amount;
 updateSingleUser(path, user);
 res.send("ok");
 };

const withdraw = (req,res) => {
  const {id} = req.params;
  const user = findAclient(path, +id);
  const { amount } = req.body;
  user.cash -= amount;
  updateSingleUser(path, user);
  res.send("ok");
};

const transfer = (req, res) => {
  const {amount} = req.query;
  const {user1, user2} = req.body;
  const firstUser = findAclient(path, +user1.id);
  const secondUser = findAclient(path, +user2.id);
  firstUser.cash -= amount;
  secondUser.cash += amount;
  const two = [firstUser, secondUser];
  updateCoupleUsers(path, two); 
  res.send("ok");
}



module.exports = { getUser, addUser, editUser, deleteUser, getAllUsers, deposit, withdraw, transfer};