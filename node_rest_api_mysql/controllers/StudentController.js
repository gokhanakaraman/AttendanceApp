const Student = require('../models').Students;
const User = require('../models').User;
const Lectures = require('../models').Lectures;
const authService = require('./../services/AuthService');
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
    const body = req.body;

    if (!body.unique_key && !body.number) {
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if (!body.password) {
        return ReE(res, 'Please enter a password to register.');
    } else {
        let err, user;
        [err, user] = await to(authService.createStudent(body));

        if (err) return ReE(res, err, 422);
        return ReS(res, { message: 'Successfully created new user.', user: user.toWeb(), token: user.getJWT() }, 201);
    }
}
module.exports.create = create;

const get = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;

    return ReS(res, { user: user.toWeb() });
}
module.exports.get = get;

const update = async function (req, res) {
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if (err) {
        if (err.message == 'Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated Student: ' + user.email });
}
module.exports.update = update;

const remove = async function (req, res) {
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if (err) return ReE(res, 'error occured trying to delete user');

    return ReS(res, { message: 'Deleted Student' }, 204);
}
module.exports.remove = remove;

const getLectures = async function (req, res) {
    let user, err;
    user = req.user;

    [err, companies] = await to(user.getLectures({ include: [{ association: Lectures.Students }] }));

    res.json(companies);
}
module.exports.getLectures = getLectures;

function setTimer(diff) {
    setTimeout(() => {
        fcm.send(message)
            .then(function (response) {
                console.log("Successfully sent with response: ", response);
                setTimer(diff + (24 * 60 * 60 * 1000))
            })
            .catch(function (err) {
                console.log("Something has gone wrong!");
                console.error(err);
            })
    }, diff);
}

const login = async function (req, res) {
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authStudent(req.body));
    if (err) return ReE(res, err, 422);
    Lectures.findAll().then(lectures => {
        for (let i in lectures) {
            let tNow = new Date();
            let t = tNow.toLocaleTimeString();
            let gT = new Date('0 ' + lectures[Number(i)].start + ':00');
            let nT = new Date('0 ' + t)
            message.to = req.body.device;
            if (gT - nT > 0) {
                setTimer(gT - nT)
            } else {
                setTimer(gT - nT + (24 * 60 * 60 * 1000))
            }
        }
    })
    return ReS(res, { token: user.getJWT(), user: user.toWeb() });
}
module.exports.login = login;

const enroll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    [err, student] = await to(Student.findOne({ where: { id: req.user.id } }));;

    [err, lecture] = await to(Lectures.findOne({ where: { id: body.id } }));

    if (err) return ReE(res, err, 404);

    if (lecture.code === body.code) {
        [err, user] = await to(User.findOne({ where: { id: body.userId } }));
        let dist = distanceCalc(body, user);
        if (dist * 1000.0 < 10.0) {
            let n = student.lecture.split(',');
            let r = n.filter(p => p == lecture.id).length;
            if (r <= 0) {
                if (student.lecture) {
                    let nSL = student.lecture + ',' + lecture.id;
                    student.lecture = nSL;
                } else {
                    student.lecture = lecture.id;
                }
            }

            student.set(student);
            [err, student] = await to(student.save());
            if (err) return ReE(res, err, 422);
            return ReS(res, { success: true });
        } else {
            ReE(res, { 'err': 'You are too far from lecturer' }, 500);
        }

    } else {
        ReE(res, { 'err': 'Your code is wrong' }, 500);
    }
}
module.exports.enroll = enroll;

function distanceCalc(coor1, coor2) {
    var radlat1 = Math.PI * Number(coor1.lat) / 180
    var radlat2 = Math.PI * Number(coor2.lat) / 180
    var theta = Number(coor1.lng) - Number(coor2.lng)
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344
    return dist
}