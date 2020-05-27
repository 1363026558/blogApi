var dbConfig = require('../../util/dbconfig');
var md5=require('md5-node');

//获取管理员信息
getAdmin = (req, res) => {
        var sql = 'select * from admin';
        var sqlArr = [];
    var callBack = (err, data) => {
        if(err) {
            console.log(err);
            return;
        }else{
            res.send({
                admin: data,
            })
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack);
}


//管理员状态修改
changeAdmin = (req, res)=> {
    var { id, status } = req.body;
    console.log(req.body);
    
    if(status == 0) {
        var sql = 'update admin set status = ? where id = ?';
        console.log(0);
        
    }else if(status == 1) {
        var sql = 'update admin set status = ? where id = ?';
        console.log(1);
        
    }
    let sqlArr = [status, id];  
    var callBack = (err, data) => {
      if(err) {
        console.log(err);
        return;
      }else{
          console.log(data);
          
        res.send({
            code: 'success',
            message: '管理员权限修改成功！'
        });
      }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  }


//管理员添加

addAdmin = (req, res)=> {
    let admin = req.body.admin;
    let password = md5(admin.password);
    console.log(admin);
    
    let now = Math.floor(new Date().getTime()) / 1000;
        var sql = 'insert into admin(nickname, username, password, img, email, status, create_time, update_time) value(?,?,?,?,?,?,?,?)';
        var sqlArr = [admin.nickname, admin.username, password, admin.img, admin.email, 1, now, now];
        var callBack = (err, data) => {
            if(err) {
              console.log(err);
              return;
            }else{
              res.send({
                  code: 'success',
                  message: '添加管理员成功！'
                });
            }
          }
    
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  }



module.exports = {
    getAdmin,
    addAdmin,
    changeAdmin
}