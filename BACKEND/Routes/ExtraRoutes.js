const {
  createExtra,
  patchExtra,
  getExtra,
} = require("../Controllers/ExtraController");
const router = require("express").Router();

router.post("/createExtra", createExtra);
router.get("/getExtra", getExtra);
router.patch("/patchExtra", patchExtra);

module.exports = router;
