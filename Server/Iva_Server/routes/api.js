/**
 * Created by zhaoxuebin on 2016/12/13.
 */

module.exports=function (server) {
    server.get('/',function (req, res) {
        res.send("Hello Word !");
    });
};