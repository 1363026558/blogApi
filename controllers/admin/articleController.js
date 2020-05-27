var dbConfig = require('../../util/dbconfig')
//获取文章
getArticle = (req, res) => {
    if(req.query.id) {
        //根据文章id查询 
        let id = req.query.id;
        console.log(req.query);
        var sql = 'select * from article where isdel = 0 AND id=?';
        var sqlArr = [id];
    }else if(req.query.title){
        //模糊查询文章标题
        let title = req.query.title;
        // console.log(title);
        var sql = `select * from article where isdel = 0 AND title LIKE '%${title}%'`;
        var sqlArr = [title];

    }else if(req.query.board){
        //查询排行榜文章数据
        let board = req.query.board;
        if(board == 1) {
            //浏览量由高到低
            var sql = 'select * from article  where isdel = 0 order by views desc limit 5';
        }else if(board == 2) {
            //创建时间由近到远
            var sql = 'select * from article  where isdel = 0 order by create_time desc limit 5';
        }else if(board == 3) {
            //点赞数由高到低
            var sql = 'select * from article  where isdel = 0 order by good desc limit 5';
        }
        
        var sqlArr = [board];
        //查询是否被删除的
    }else if(req.query.isdel){
        let isdel = req.query.isdel;
        console.log(isdel);
        
        var sql = `select * from article where isdel = ${isdel} order by create_time desc`;
        var sqlArr = [isdel];
    }else {
        var sql = 'select * from article where isdel = 0 order by create_time desc';
        var sqlArr = [];
    }
    var callBack = (err, data) => {
        if(err) {
            console.log(err);
            return;
        }else{
            res.send({
                article: data
            })
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack);
}

//文章点赞

addGoods = (req, res)=> {
    let id = req.body.id;
    let add = req.body.add;
    let sql = `update article set good=good+${add} where id = ?`;
    let sqlArr = [id];
    var callBack = (err, data) => {
      if(err) {
        console.log(err);
        return;
      }else{
        
      }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  }
  
  //文章删除

delArticle = (req, res)=> {
    let id = req.query.articleId;
    let isdel = req.query.isdel;
    if(isdel == 0) {
        var sql = `update article set isdel = 1 where id = ?`;
        var msg = '删除文章成功！';
    }else if(isdel == 1) {
        var sql = `update article set isdel = 0 where id = ?`;
        var msg = '恢复文章成功！';
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


//文章添加

addArticle = (req, res)=> {
    article = req.body.article;
    let now = Math.floor(new Date().getTime()) / 1000;
    if(article.articleId) {
        var sql = 'update article set title = ?, info = ?, img = ?, category = ?, content = ?, update_time = ? where id = ?';
        var sqlArr = [article.title, article.info, article.img, article.category, article.content, now, article.articleId];
        var callBack = (err, data) => {
            if(err) {
              console.log(err);
              return;
            }else{
              res.send('编辑文章成功！');
            }
          }
    }else if(!article.articleId) {
        var sql = 'insert into article(title, info, img, category, content, create_time, update_time) value(?,?,?,?,?,?,?)';
        var sqlArr = [article.title, article.info, article.img, article.category, article.content, now, now];
        var callBack = (err, data) => {
            if(err) {
              console.log(err);
              return;
            }else{
              res.send('上传文章成功！');
            }
          }
    }
    
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  }



module.exports = {
    getArticle,
    addGoods,
    delArticle,
    addArticle
}