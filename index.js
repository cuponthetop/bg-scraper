var route = require('./lib/routes/route');

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

app.use(methodOverride('X-HTTP-Method-Override'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


route(app);

app.listen(3000);

// crawl('http://www.divedice.com/web_dev/bbs/bbs_list_type01.php?type=f&c_type=1&pagenum=1&cateid=A002A021A006')
//     .then((data)=> {
//         console.log(data);
//     });