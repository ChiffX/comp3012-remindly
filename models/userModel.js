const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    reminders: [{id: 1, title: "abc", description: "abcabc", completed: false}],
    role: "user",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    reminders: [{id: 1, title: "cba", description: "cbacba", completed: true}],
    role: "user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
  },
  {
    id: 4,
    name: "Big Daddymin",
    email: "bigdaddymin@gmail.com",
    password: "bigdaddy!",
    reminders: [
      {id: 1, title: "delete the database", description: "because why not", completed: false},
      {id: 2, title: "debate changing admin's email", description: "sanity is breaking", completed: false}
    ],
    role: "admin",
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
  },
};

module.exports = { database, userModel };
