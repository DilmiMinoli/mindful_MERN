const router=require("express").Router();
const { event } = require('../controller/event');


router.post('/payment/create',requireSignin,attendeemiddleware,payment);
router.post('/payment/conference/create',requireSignin,attendeemiddleware,payment);




 module.exports = router;  