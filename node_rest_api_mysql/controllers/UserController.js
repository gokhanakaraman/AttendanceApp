const User = require('../models').User;
const Students = require('../models').Students;
const authService = require('./../services/AuthService');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    if (!body.unique_key && !body.email && !body.phone) {
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if (!body.password) {
        return ReE(res, 'Please enter a password to register.');
    } else {
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if (err) return ReE(res, err, 422);
        return ReS(res, { message: 'Successfully created new user.', user: user.toWeb(), token: user.getJWT() }, 201);
    }
}
module.exports.create = create;

const get = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;

    Students.findAll().then((students) => {
        res.json(students)
    })


}
module.exports.get = get;

const getApprove = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;

    Students.findAll({ where: { status: 0 } }).then((students) => {
        res.json(students)
    })


}
module.exports.getApprove = getApprove;

const setApprove = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;

    [err,students]=await to(Students.findAll({ where: { status: 0 } }))
    students.map(p=>p.status=1);
    
    for (let i in students){
        await to(students[i].save());
    }
    
    return ReE(res)
}
module.exports.setApprove = setApprove;

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
    return ReS(res, { message: 'Updated User: ' + user.email });
}
module.exports.update = update;

const remove = async function (req, res) {
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if (err) return ReE(res, 'error occured trying to delete user');

    return ReS(res, { message: 'Deleted User' }, 204);
}
module.exports.remove = remove;


const login = async function (req, res) {
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(req.body));
    if (err) return ReE(res, err, 422);
    user.device = req.body.device;
    [err, user] = await to(user.save());
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, { token: user.getJWT(), user: user.toWeb() });
}
module.exports.login = login;