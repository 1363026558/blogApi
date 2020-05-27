const mysql = require('mysql');
module.exports = {
    config: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'wym_tp5'
    },
    //连接数据库.连接池。创建连接池对象
    sqlConnect:function(sql, sqlArr, callBack) {
        var pool = mysql.createPool(this.config);
        pool.getConnection((err, data) => {
            if(err) {
                console.log('数据库连接失败！');
                return;
            }
            //事件驱动回调
            data.query(sql, sqlArr, callBack);
            //释放连接
            data.release();
        })
    }


}