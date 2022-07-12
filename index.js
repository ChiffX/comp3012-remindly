const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const path = require("path");
const { MemoryStore } = require("express-session");
const { isAdmin } = require("./middleware/checkAuth");

const app = express();

const sessionStore = new MemoryStore();

app.set("view engine", "ejs");
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: sessionStore,
  })
);

const passport = require("./middleware/passport");
const authRoute = require("./routes/authRoute");
const reminderRoute = require("./routes/reminderRoute");
const dashboardRoute = require("./routes/dashboardRoute");
// const adminRoute = require("./routes/adminRoute");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoute);
app.use("/reminder", reminderRoute);
app.use("/reminders", reminderRoute);
app.use("/dashboard", dashboardRoute);
// app.use("/admin", adminRoute);

app.get("/admin", isAdmin, (req, res) => {
  sessionStore.all(function (err, sessions) {
    if (err) {
      console.log(err);
    }
    res.render("admin/index", { user: req.user, sessions: sessions});
  });
});

app.post("/admin/delete/:id", isAdmin, (req, res) => {
  let sessionToDestroy = req.params.id;
  
  sessionStore.destroy(sessionToDestroy, function (err) {
    if (err) {
      console.log(err);
    }
    sessionStore.all(function (err, sessions) {
      if (err) {
        console.log(err);
      }
      res.render("admin/index", { user: req.user, sessions: sessions});
    });
  });
});

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
