// let database = require("../database");
let database = require("../models/userModel");
let userController = require("./userController");

let remindersController = {
  list: (req, res) => {
    const activeUser = userController.getUserById(req.user.id);
    const activeUserId = activeUser.id;

    let activeUserReminders = [];

    for(let user of database.database){
      console.log(user);
      if(user['id'] === activeUserId){
        activeUserReminders = user['reminders'];
      }
    }
    
    console.log(activeUserReminders);
    res.render("reminder/index", { reminders: activeUserReminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });

    searchResult.title       = req.body.title;
    searchResult.description = req.body.description;

    if(req.body.completed === "true"){
      searchResult.completed = true;
    } else {
      searchResult.completed = false;
    }

    res.render("reminder/single-reminder", { reminderItem: searchResult });
  },

  delete: (req, res) => {
    let reminderId = req.params.id;
    
    database.cindy.reminders = database.cindy.reminders.filter(function(reminder) { 
      return reminder.id != reminderId; 
    });
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
