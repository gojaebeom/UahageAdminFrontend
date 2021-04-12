"use strict"

const router = require("express").Router();
const { find, postByExcel, _delete } = require("./ns.controller");

router.get("/:id", find);
router.post("/", postByExcel);
router.delete("/", _delete);


module.exports = router;