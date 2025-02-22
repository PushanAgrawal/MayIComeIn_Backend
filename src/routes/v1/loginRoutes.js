const express = require("express");
const router = express.Router();

router.get("/user", async function name(req,res) {
    console.log("hi")
    return res.send(200);
});
module.exports = router;