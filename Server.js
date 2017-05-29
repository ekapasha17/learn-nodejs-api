var grab_setting    =   require('./library/Setting');
var rest            =   require("./REST.js");
var app             =   grab_setting.express();

function REST(){
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function() {
    var self    =   this;
    var conn    =   grab_setting.mysql.createPool({
        connectionLimit : 100,
        host            : 'localhost',
        user            : 'root',
        password        : '',
        database        : 'learn_node_restapi',
        debug           :  false
    });
    conn.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
};

REST.prototype.configureExpress = function(connection) {
    var self = this;
    app.use(grab_setting.bodyParser.urlencoded({ extended: true }));
    app.use(grab_setting.bodyParser.json());
    var router = grab_setting.express.Router();
    app.use('/api', router);
    var rest_router = new rest(router,connection,grab_setting.md5);
    self.startServer();
}

REST.prototype.startServer = function() {
    app.listen(3000,function(){
        console.log("All right ! I am alive at Port 3000.");
    });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
}

new REST();