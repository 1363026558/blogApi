var dbConfig = require('../../util/dbconfig');

//获取banner图
getBanner = (req, res) => {
    var sql = 'select * from banner order by sort asc'
    var sqlArr = [];
    var callBack = (err, data) => {
        if(err) {
            console.log('连接出错');
            return;
        }else{
            res.send({
                banner: data
            })
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack);
}

module.exports = {
    getBanner
}