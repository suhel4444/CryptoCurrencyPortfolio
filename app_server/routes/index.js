var express = require('express');
var router = express.Router();
var ctrlMain = require("../controller/main");

router.get('/', ctrlMain.home);

router.post('/', ctrlMain.post_login);

router.get('/register', ctrlMain.get_register);

router.post('/register' , ctrlMain.post_register);

router.get('/home', ctrlMain.get_home);

router.get('/currency', ctrlMain.get_currency);

router.get('/convert', ctrlMain.get_convert);

router.post('/convert', ctrlMain.post_convert);

router.get('/addwallet', ctrlMain.get_addwallet);

router.post('/addwallet', ctrlMain.post_addwallet);

router.post('/mywallet-disp/:username', ctrlMain.post_dispwallet);

router.get('/mywallet', ctrlMain.get_mywallet);

router.post('/mywallet/:username', ctrlMain.deleteOrder_mywallet);

router.get('/compareCurrency', ctrlMain.get_compareCurrency);

// ****************************************************************

router.get('/history', ctrlMain.get_history);

router.get('/userlist', ctrlMain.get_user);

router.get('/updateuser', ctrlMain.get_updateuser);

router.post('/updated' , ctrlMain.post_updateuser);

router.get('/viewinfo', ctrlMain.get_viewinfo);

module.exports = router;
