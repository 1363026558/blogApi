var dbConfig = require('../../util/dbconfig');


//获取文章评论
getReview = (req, res) => {
    if(req.query.id) {
        let id = req.query.id
        let sql = 'select * from reviewss where article_id=?'
        let sqlArr = [id];
        callBack = (err, data) => {
            if(err) {
                console.log(err);
                return;
            }else{
                res.send({
                    reviews: data
                })
            }
        }
        dbConfig.sqlConnect(sql, sqlArr, callBack);

    }
}


//添加文章评论
postReview = (req, res) => {
    console.log(req.body);
    let img = "../assets/img/words/11.jpg";
    let now = Math.floor(new Date().getTime()) / 1000;
    
    let sql = 'insert into reviewss(img, user_name, content, article_id, create_time, update_time) value(?,?,?,?,?,?)';
    let sqlArr = [img, req.body.username, req.body.content, req.body.articleId, now, now];
    var callBack = (err, data) => {
      if(err) {
        console.log(err);
        return;
      }else{
        res.send({
          'reviewss': data
        });
      }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}


module.exports = {
    getReview,
    postReview
}