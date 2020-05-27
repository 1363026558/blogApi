var dbConfig = require('../../util/dbconfig');
var md5=require('md5-node');

//获取电影信息
getFilm = (req, res) => {
  if(req.query.id) {
    //根据文章id查询  
    let id = req.query.id;
    var sql = 'select * from film where isdel = 0 AND id=?';
    var sqlArr = [id];
    }else if(req.query.isdel){
      let isdel = req.query.isdel;
      console.log(isdel);
      var sql = `select * from film where isdel = ${isdel} order by create_time desc`;
      var sqlArr = [isdel];
  }else {
      var sql = 'select * from film where isdel = 0';
        var sqlArr = [];
    }
    var callBack = (err, data) => {
        if(err) {
            console.log(err);
            return;
        }else{
            res.send({
                film: data,
            })
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack);
}

//获取5电影信息
getfiveFilm = (req, res) => {
  var sql = 'select * from film limit 5';
  var sqlArr = [];
var callBack = (err, data) => {
  if(err) {
      console.log(err);
      return;
  }else{
      res.send({
          film5: data,
      })
  }
}
dbConfig.sqlConnect(sql, sqlArr, callBack);
}

 //电影删除

 delFilm = (req, res)=> {
  let id = req.query.filmId;
  let isdel = req.query.isdel;
  if(isdel == 0) {
      var sql = `update film set isdel = 1 where id = ?`;
      var msg = '删除电影成功！';
  }else if(isdel == 1) {
      var sql = `update film set isdel = 0 where id = ?`;
      var msg = '恢复电影成功！';
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


//电影添加

addFilm = (req, res)=> {
  film = req.body.film;
  let now = Math.floor(new Date().getTime()) / 1000;
  if(film.filmId) {
      var sql = 'update film set name = ?, img = ?, info = ?, actor = ?, update_time = ? where id = ?';
      var sqlArr = [film.name, film.img, film.info, film.actor, now, film.filmId];
      var callBack = (err, data) => {
          if(err) {
            console.log(err);
            return;
          }else{
            res.send('编辑文章成功！');
          }
        }
  }else if(!film.filmId) {
      var sql = 'insert into film(name, img, info, actor, create_time, update_time) value(?,?,?,?,?,?)';
      var sqlArr = [film.name, film.img, film.info, film.actor, now, now];
      var callBack = (err, data) => {
          if(err) {
            console.log(err);
            return;
          }else{
            res.send('上传电影成功！');
          }
        }
  }
  
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}





module.exports = {
    getFilm,
    getfiveFilm,
    addFilm,
    delFilm
  }