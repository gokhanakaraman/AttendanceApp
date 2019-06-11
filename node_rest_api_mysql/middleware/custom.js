const Lectures 			    = require('./../models').Lectures;

let lecture = async function (req, res, next) {
    let lecture_id, err, lecture;
    lecture_id = req.params.lecture_id;

    [err, lecture] = await to(Lectures.findOne({where:{id:lecture_id}}));
    if(err) return ReE(res, "err finding lecture");

    if(!lecture) return ReE(res, "Lectures not found with id: "+lecture_id);
    let user, users_array, users;
    user = req.user;
    [err, users] = await to(lecture.getUsers());

    users_array = users.map(obj=>String(obj.user));

    if(!users_array.includes(String(user._id))) return ReE(res, "User does not have permission to read app with id: "+app_id);

    req.lecture = lecture;
    next();
}
module.exports.lecture = lecture;

let code = async function (req, res, next) {
    let lecture_code, err, lecture;
    lecture_id = req.params.lecture_id;

    [err, lecture] = await to(Lectures.findOne({where:{id:lecture_id}}));
    if(err) return ReE(res, "err finding lecture");

    if(!lecture) return ReE(res, "Lectures not found with id: "+lecture_id);
    let user, users_array, users;
    user = req.user;
    [err, users] = await to(lecture.getUsers());

    users_array = users.map(obj=>String(obj.user));

    if(!users_array.includes(String(user._id))) return ReE(res, "User does not have permission to read app with id: "+app_id);
    lecture_code = req.params.lecture_code;  

    lecture.code = hashCode(lecture_code);
    req.lecture = lecture;
    next();
}
module.exports.code = code;

hashCode = function(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
  }