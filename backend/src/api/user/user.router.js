"use strict"

// import router ✨
const router = require("express").Router();
const { index, show, create, update, _delete, findByOptions, updateByOptions } = require("./user.controller");

// default api ✨
//GET /users
router.get("/", index); 
// GET /users/find-by-options?option=[value]
router.get("/find-by-options", findByOptions);
// GET /users/:id
router.get("/:id", show);
// POST /users 
router.post("/", /**@AUTH 보안 관련 미들웨어 필요 */ create);
// PUT /users/:nickname
router.put("/:nickname", /**@AUTH 보안 관련 미들웨어 필요 */ update);
// PATCH /users/:id
router.patch("/:id", /**@AUTH 보안 관련 미들웨어 필요 */ updateByOptions);
// DELETE /users/:id
router.delete("/:id", /**@AUTH 보안 관련 미들웨어 필요 */ _delete);

// export router ✨
module.exports = router;

