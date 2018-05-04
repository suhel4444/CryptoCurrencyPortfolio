var request = require('request');
var mongo=require('mongodb');
var monk=require('monk');
var db = monk('127.0.0.1:27017/cryptodb');
var user_name;
var user = "";

var lineReader = require('line-reader');
function sendPage(fileName, result)
{
    var html = '';
    
    // Read the file one line at a time.
    lineReader.eachLine(fileName,
        function(line, last)
        {
            html += line + '\n';

            if (last) 
            { 
                result.send(html);
                return false; 
            }
            else
            {
                return true;
            }
        });
}

function sendBody(text, result)
{
    var html = '<!DOCTYPE html>\n'
        + '<html lang="en-US">\n'
        + '<head>\n'
        + '    <meta charset="UTF-8">\n'
        + '    <title>Cryptocurrency Portfolio Tracker</title>\n'
        + '    <link rel="stylesheet" href="currencyrates.css">\n'
        + '</head>\n'
        + '<body>\n'
		+ '<h2> Welcome to Cryptocurrency Portfolio Tracker!! </h2>'
		+ '<p>'
        + '    ' + text + '\n'  // insert the body text
		+ '<p>'
        + '</body>\n'
        + '</html>\n';
    
    result.send(html);    
}

function getVal(request)
{
    var curr = request.param('curr');
      
    return curr;
}

function modify(text, request)
{
    if (request.body.strong)
    {
        text = '<strong>' + text + '</strong>'; 
    }
    
    if (request.body.em)
    {
        text = '<em>' + text + '</em>'; 
    }
    
    return text;
}
var btcprice;
var request =require("request");
request({
	url:"https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD",
	json:true
},function(error,response,body){
	  btcprice=body.USD;

	
}
);
var xrmprice;
request({
	url:"https://min-api.cryptocompare.com/data/price?fsym=XRP&tsyms=USD",
	json:true
},function(error,response,body){
	  xrmprice=body.USD;

	
}
);

var eth_btc_price,eth_usd_price;
request({
	url:"https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR",
	json:true
},function(error,response,body){
	  eth_btc_price=body.BTC;
      eth_usd_price=body.USD;

	
}
);

var btc_btc_price,btc_usd_price;
request({
	url:"https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=BTC,USD,EUR",
	json:true
},function(error,response,body){
	  btc_btc_price=body.BTC;
      btc_usd_price=body.USD;
}
);

module.exports.home = function(request, result) 
{
    sendPage('login.html', result);
};

module.exports.get_home = function(request, result) 
{

    if (!request.session.user){

        sendPage('login.html',result);
    } 
    sendPage('home.html', result);

    // var collection = db.get('login');
    // user = request.body.username;
    // var pwd = request.body.password;
    // request.session.username = user;
    // collection.find({username:user}, {password:pwd}, function(err,doc){
    //     if(err)
    //     {
    //         console.log("Invalid credentials");
    //         console.log(err);
    //     }
    //     else
    //     {
    //         console.log(doc);
    //     }
    // });    
};

// module.exports.post_home = function(request, result)
// {
//     // console.log("hello");
//     user = request.body.username;
//     var pwd = request.body.password;
//     request.session.username = user;
//     console.log(user + pwd);
//     // validateLogin(user, pwd);
//     sendPage('home.html',result);
// }



// function validateLogin(user,pass){
//     // var collection=db.get('login');
//     // collection.find({username:user,password:pass},function(err,doc){
//     //     if(err){
//     //         console.log("hey" + err);
//     //         return false;
//     //     }
//     //     else{
//     //         //result.send("User Inserted");
//     //         console.log(doc);
//     //         return true;
//     //         //window.alert("User created. Please login!");
//     //     }
//     // });
//     var flag = 0;
//     var collection = db.get('login');
//     console.log("val fn");
//     collection.find({ username: user}, function(err,doc) {
//             if(err) {
//                 console.log("Invalid credentials");
//             }
//             else {
//                 var pwd = doc[0].password;
//                 console.log("Pass from db " + pwd);
//             }

//             if(pwd === pass)
//             {
//                 console.log("+ve");
//             }
//             else
//             {
//                 console.log("-ve");
//             }
//     });
// }

// function validate_credentials(usr, pass){
    // var collection = db.get('login');
    // var val = collection.find({ $and: [ {username:usr}, {password:pass}]}, function(err, doc){
    //         if(err){
    //             console.log("Invalid credentials");
    //             return false;
    //         }
    //         else
    //         {
    //             console.log("Successfully logged in!!");
    //             return true;
    //         }
    // });
// };

module.exports.get_currency = function(request, result) 
{
	//console.log(btcprice);
	// var text='<strong>BTC Price:</strong>'+btcprice+'\n' +'\n<strong>Ripple Price: </strong>'+xrmprice;
	// sendBody(text, result);
    sendPage('currency.html', result);
    //sendPage('text.html', result);
};


module.exports.get_convert = function(request, result) 
{
    sendPage('converter.html', result);
};

module.exports.get_addwallet = function(request, result) 
{
    sendPage('addWallet.html', result);
};

module.exports.get_mywallet = function(request, result) 
{
    sendPage('myWallet.html', result);
};

var user="";
module.exports.post_login = function(request,result)
{
    user = request.body.username;
    var password = request.body.password;
    var res = validateLogin(user, password);
    console.log(res);

    request.session.user=user;
    console.log(request.session.user)
    sendPage('home.html',result);

}

module.exports.get_register = function(request, result) 
{
    
    sendPage('register.html', result);
};

module.exports.post_register = function(request, result) 
{
    var username = request.body.username;
    var emailid = request.body.email;
    var password = request.body.password;
    var password_confirm = request.body.password_confirm;
    var res_addr = request.body.addr;
    var phone = request.body.mob;

   // var query = "{username: '"+username +"'},{password_confirm:'" + password+"'}";
    //console.log(query);
    var collection=db.get('login');
    collection.insert({username:username, password:password, mailid:emailid, address:res_addr, mobile:phone},function(err,doc){
        if(err){
            console.log(err);
        }
        else{
            //result.send("User Inserted");
            console.log("Success");
            // window.alert("User created. Please login!");
        }
    });
    result.redirect('/');

};

module.exports.post_addwallet = function(request, result)
{
    var amount = 0;
    var id = 0; 
    var currency = request.body.curr;
    var qty = request.body.quantity;
    var usernm = request.session.user;
    var rate = btc_usd_price;
    amount = rate * qty;
    var collection = db.get('currency');
    var count = collection.count();
    collection.find({}, {sort: {$natural:-1}, limit:1}).then(function(docs){
        id = docs[0].orderid + 1;
        collection.insert({orderid:id, username:usernm, order_date:new Date(), currency_code:currency, currency_price:rate, order_qty:qty, tot_amt:amount, payment_status:"paid"});
        result.send("Successfully added items to the cart");
    });
}

module.exports.deleteOrder_mywallet = function(request, result)
{
    var order_id = parseInt(request.body.orderid);
    var collection = db.get('currency');
    collection.remove({orderid:order_id}, function(err,docs){
        if(err)
            result.send("Delete failed");
        else {
            console.log(docs);
            result.send("Successfully deleted OrderID " + order_id);
        }
    });

}

module.exports.post_dispwallet = function(request, result)
{
    result.send("HI");
}

module.exports.get_compareCurrency = function(request, result) 
{
    sendPage('compareCurrency.html', result);
};


module.exports.post_convert = function(request, result) 
{
    sendPage('converter.html', result);
};

//*******************************************************************NEW
module.exports.get_history = ('/history', function(req, res){


    var collection = db.collection('currency');
    // console.log(user_name);
    // Find all students
   
    console.log("This is "+ req.session.user);
    
    collection.find({username:req.session.user},function (err, result) {
        // console.log(user_name);
      if (err) {
        res.send("Find failed.");
        console.log("Failure")
                         }
                         else {
                             res.render('currencylist', 
                                        { "currencylist" : result })
                            console.log(result)
                         }

    });
});

module.exports.get_user = ('/userlist', function(request, result) 
{
    user_name=request.session.user;
    //var db = request.db;
    var collection = db.collection('login');
    if(user_name=="admin"){
    collection.find({}, {}, 
                    function(e, docs)
                    {
                        result.render('userlist', { "userlist" : docs });
                    });
}
else
{
  result.redirect('/home');
}
});
module.exports.get_viewinfo = ('/viewinfo', function(request, res) 
{
  var collection = db.collection('login');
  // console.log(user_name);
  // Find all students
  user_name=request.session.user;
  collection.find({username:user_name},function (err, result) {
    if (err) {
      res.send("Find failed.");
                         }
                         else {
                             res.render('updateInfo', 
                                        { "updateInfo" : result })
                         }

  });
  });
  module.exports.get_updateuser = function(request, result)
  {
      sendPage('updateuser.html', result);
  };
  module.exports.post_updateuser = function(request,result)
  {
      var user_name = request.session.user;
      var addrs = request.body.address;
      var ph = request.body.phone;
      // var res = validateLogin(username, password);
      //var collection = db.collection('currency');

        db.collection("login").update({ username: user_name},{$set:{address:addrs,mobile:ph}}, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
        });
      result.redirect('/home');

  }

// *************************************************************
function validateLogin(user,pass){
    var collection=db.get('login');
    collection.find({username:user,password:pass},function(err,doc){
        if(err){
            console.log(err);
        }
        else{
            //result.send("User Inserted");
            console.log(doc);
            return doc;
            //window.alert("User created. Please login!");
        }
    });
}
