var dbConfig = require('../../util/dbconfig')

//进行获取留言操作
getMessage = (req, res)=> {
  if(!req.query.isdel) {
    var sql = "select * from words where isdel = 0 order by create_time desc";
    var sqlArr = [];
  }else if(req.query.isdel){
    let isdel = req.query.isdel;
    var sql = `select * from words where isdel = ${isdel}`;
    var sqlArr = [isdel];
}
    var callBack = (err, data) => {
      if(err) {
        console.log('连接出错');
        return;
      }else{
        res.send({
          'message': data
        });
      }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//进行添加留言操作
postMessage = (req, res)=> {
  console.log(req.body);
  let img = "../assets/img/words/words.jpg";
  // let now =new Date().toLocaleString();
  let now = new Date().getTime() / 1000;
  // console.log(Math.floor(now/1000));
  
  let sql = 'insert into words(img, username, content, create_time, update_time) value(?,?,?,?,?)';
  let sqlArr = [img, req.body.username, req.body.content, now, now];
  var callBack = (err, data) => {
    if(err) {
      console.log(err);
      return;
    }else{
      res.send({
        'message': data
      });
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}


//文章删除

delMessage = (req, res)=> {
  let id = req.query.messageId;
  let isdel = req.query.isdel;
  if(isdel == 0) {
      var sql = `update words set isdel = 1 where id = ?`;
  }else if(isdel == 1) {
      var sql = `update words set isdel = 0 where id = ?`;
  }
  let sqlArr = [id];  
  var callBack = (err, data) => {
    if(err) {
      console.log(err);
      return;
    }else{
      res.send('success');
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}
//导出方法
module.exports = {
    getMessage,
    postMessage,
    delMessage
}