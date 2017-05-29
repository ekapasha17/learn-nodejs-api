function variable_setting(express,mysql,bodyParser,md5){
    this.express            =   express;
    this.mysql              =   mysql;
    this.bodyParser         =   bodyParser;
    this.md5                =   md5;
};

module.exports = new variable_setting(require("express"),require("mysql"),require("body-parser"),require('MD5'));