/**
 * Created by zhaoxuebin on 2016/12/9.
 */
var ElementModel = require("../schema/Schema.js").ElementModel;

exports.Element= Element;

function Element() {
    if(typeof this.newElement == "undefined"){
        Element.prototype.newElement =newElement;
    }
    if(typeof this.deleteElement == "undefined"){
        Element.prototype.deleteElement =deleteElement;
    }
    if(typeof this.updateElement == "undefined"){
        Element.prototype.updateElement =updateElement;
    }

};

/**
 * 新建一个互动元素，提供基本属性信息
 * @param elementObj [ ElementModel (required)]  element对象
 * @param fn [Function  (required)]
 */
function newElement(elementObj,fn) {
    var query = ElementModel.create(elementObj,function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 删除一个互动元素，根据_id
 * @param element_Id [Object_Id  (required)]
 * @param fn   [Function  (required)]
 */
function deleteElement(element_Id,fn) {
    var query =ElementModel.findOneAndRemove({_id:element_Id},function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 更新互动元素的属性信息
 * @param element_Id  [Object_Id (required) ]
 * @param elementObj  [ElementModel  (required)] 互动元素Element 对象
 * @param fn [Function (required) ]
 */
function updateElement(element_Id,elementObj,fn) {
    var query = ElementModel.findOneAndUpdate({_id:element_Id},{
        $set:{
            kind:elementObj.kind,
            titles:elementObj.imgs,
            imgs:elementObj.imgs,
            colors:elementObj.colors,
            times:elementObj.times,
            links:elementObj.links,
            sizes:elementObj.sizes,
            positions:elementObj.positions,
            texts:elementObj.texts
        }
    },function (err,doc) {
        fn(err,doc);
    });
};
