var dbConfig = require('../../util/dbconfig');
var md5=require('md5-node');
var jwt = require('jsonwebtoken');

loginValidate = (req, res) => {
    let {username, password} = req.body;
    password = md5(password);
    sql = 'select * from admin where username = ? AND password = ? AND status = "0"';
    sqlArr = [username, password];
    callBack = (err, data) => {
        if(err) {
            console.log(err); 
        }else if(data && data.length != 0){
            //验证成功，发布token
            const token = jwt.sign({ user: data[0].username }, global.secret)
            res.send({
                code: 200,
                message: '登录成功！',
                token
            });            
            
        }else {
            console.log(data);
            
            res.send({
                code: 422,
                message: '账号或密码错误！'
            });
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack);
}


module.exports = {
    loginValidate
}