const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", isAdmin, (req, res) => {
    res.render("admin/index", { user: req.user, sessions: activeSessions});
});

module.exports = router;
