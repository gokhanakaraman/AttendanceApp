const Lecture = require('../models').Lectures;
const Student = require('../models').Students;
const User = require('../models').User;
var FCM = require('fcm-push');

var serverKey = 'AIzaSyCYkMJ00vQmFWh7XP3w-idyqbp6_KgVYso';
var fcm = new FCM(serverKey);

var message = {
    to: 'allDevices',
    notification: {
        title: 'Dersiniz Başlıyor',
        body: 'Lütfen Dersliklerde yerinizi alınız'
    }
};

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, lecture;
    let user = req.user;

    let lecture_info = req.body;


    [err, lecture] = await to(Lecture.create(lecture_info));
    if (err) return ReE(res, err, 422);

    lecture.addUser(user, { through: { status: 'started' } })

    [err, lecture] = await to(lecture.save());
    if (err) return ReE(res, err, 422);
    let tNow=new Date();
    let t = tNow.toLocaleTimeString();
    let gT = new Date('0 '+req.body.start+':00');
    let nT= new Date('0 '+ t)
    message.to=user.device;
    if (gT-nT > 0){
        setTimer(gT-nT)
    }else{
        setTimer(gT-nT + (24*60*60*1000))
    }
    
    let lecture_json = lecture.toWeb();
    lecture_json.users = [{ user: user.id }];
    
    return ReS(res, { lectures: lecture_json }, 201);
}
module.exports.create = create;

function setTimer(diff){
    setTimeout(() => {
        fcm.send(message)
            .then(function (response) {
                console.log("Successfully sent with response: ", response);
                setTimer(diff + (24*60*60*1000))
            })
            .catch(function (err) {
                console.log("Something has gone wrong!");
                console.error(err);
            })
    }, diff);
}
const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, companies;

    [err, users] = await to(User.findAll());
    if (err) return ReE(res, err);

    let companies_json = []
    let counts = [];
    for (let user in users) {

        [err, companies] = await to(users[user].getLectures({ include: [{ association: Lecture.Users }] }));

        for (let i in companies) {
            let lecture = companies[i];
            let users = lecture.Users;
            let lecture_info = lecture.toWeb();
            let users_info = [];
            let condition =
                {
                    where:
                        {
                            lecture: companies[i].id
                        }
                };

            [err, students] = await to(Student.findAll(condition));

            if (err) {
                counts.push(0)
            } else {
                counts.push(students.length);
            }

            for (let i in users) {
                let user = users[i];
                // let user_info = user.toJSON();
                users_info.push({ user: user.id });
            }
            lecture_info.users = users_info;
            lecture_info.students = students;
            companies_json.push(lecture_info);
        }

    }

    console.log('c t', companies_json);
    return ReS(res, { lectures: companies_json });
}
module.exports.getAll = getAll;

const get = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let lecture = req.lecture;

    return ReS(res, { lecture: lecture.toWeb() });
}
module.exports.get = get;

const update = async function (req, res) {
    let err, lecture, data;
    lecture = req.lecture;
    data = req.body;
    lecture.set(data);

    [err, lecture] = await to(lecture.save());
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, { lecture: lecture.toWeb() });
}
module.exports.update = update;

const genHash = async function (req, res) {
    let err, lecture, data;
    lecture = req.lecture;
    data = req.body;
    lecture.set(data);
    let user = req.user;
    user.lat = req.body.lat;
    user.lng = req.body.lng;
    user.set(user);

    [err, user] = await to(user.save());
    if (err) {
        return ReE(res, err);
    }
    [err, lecture] = await to(lecture.save());
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, { lecture: lecture.toWeb() });
}
module.exports.genHash = genHash;

const remove = async function (req, res) {
    let lecture, err;
    lecture = req.lecture;

    [err, lecture] = await to(lecture.destroy());
    if (err) return ReE(res, 'error occured trying to delete the lecture');

    return ReS(res, { message: 'Deleted Lecture' }, 204);
}
module.exports.remove = remove;