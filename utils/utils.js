const fs = require("fs");

const parserClients = (path) => {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
};

const addClient = (usersData, path) =>
  fs.writeFileSync(path, JSON.stringify(usersData));

const updateClient = (userDtata, path) =>
  fs.writeFileSync(path, JSON.stringify(userDtata));

const findAclient = (path, userId ) => parserClients(path)?.users?.find((user)=> userId === user.id);

const updateSingleUser = (path, user) => {

  const {users} = parserClients(path);
  const newUsers = users.map(u => u.id === user.id ?  user : u);
  addClient(newUsers, path);

}

const updateCoupleUsers = (path, users) =>{
users.forEach(user => { 
  updateSingleUser(path, user);
});
}

module.exports = { addClient, parserClients, updateClient, findAclient, updateSingleUser, updateCoupleUsers};

// you make me proud that greate you make this realy good that's a good code
// one thing please think what you work on Users or Clients diff naming
