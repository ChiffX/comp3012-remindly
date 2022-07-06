let userController = require("./userController");
let { database } = require("../models/userModel");

let remindersController = {
  list: (req, res) => {
    const activeUserReminders = userController.getUserById(req.user.id).reminders;

    res.render("reminder/index", { reminders: activeUserReminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    const activeUserReminders = userController.getUserById(req.user.id).reminders;
    
    let reminderToFind = req.params.id;
    let searchResult = activeUserReminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: activeUserReminders });
    }
  },

  create: (req, res) => {
    const activeUserReminders = userController.getUserById(req.user.id).reminders;
    
    let reminder = {
      id: activeUserReminders[activeUserReminders.length - 1]['id'] + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    activeUserReminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    const activeUserReminders = userController.getUserById(req.user.id).reminders;
    
    let reminderToFind = req.params.id;
    let searchResult = activeUserReminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    const activeUserReminders = userController.getUserById(req.user.id).reminders;
    let reminderToFind = req.params.id;
    
    let searchResult = activeUserReminders.find(function (reminder) {
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
    const activeUserId = userController.getUserById(req.user.id).id;
    const activeUserReminders = userController.getUserById(req.user.id).reminders;
    let reminderId = req.params.id;
    
    let activeDatabaseEntryIndex = null;

    for(let i = 0; i < database.length; i++){
      if(database[i]['id'] === activeUserId){
        activeDatabaseEntryIndex = i;
      }
    }

    database[activeDatabaseEntryIndex]['reminders'] = activeUserReminders.filter(function(reminder) { 
      return reminder.id != reminderId; 
    });

    res.redirect("/reminders");
  },
};

module.exports = remindersController;
