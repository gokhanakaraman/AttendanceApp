const express = require('express');
const router = express.Router();

const UserController = require('./../controllers/UserController');
const StudentController = require('./../controllers/StudentController');
const LectureController = require('./../controllers/LectureController');

const custom = require('./../middleware/custom');

const path = require('path');
const User = require('../models').User;
const Student = require('../models').Student;

let passportS = require('passport');

require('./../middleware/passportS')(passportS, Student)
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ status: "success", message: "Parcel Pending API", data: { "version_number": "v1.0.0" } })
});


router.post('/users', UserController.create);
router.post('/student', StudentController.create);
router.get('/student', passportS.authenticate('jwt', { session: false }), StudentController.get);
router.get('/student/lectures',  passportS.authenticate('jwt', { session: false }), StudentController.getLectures)        
router.post('/student/login', StudentController.login);
router.post('/student/enroll',  passportS.authenticate('jwt', { session: false }), StudentController.enroll);
let passport = require('passport');
require('./../middleware/passport')(passport, User)
router.get('/users', passport.authenticate('jwt', { session: false }), UserController.get);     // R
router.get('/users/approve', passport.authenticate('jwt', { session: false }), UserController.getApprove);  
router.get('/users/approveAll', passport.authenticate('jwt', { session: false }), UserController.setApprove);  
router.put('/users', passport.authenticate('jwt', { session: false }), UserController.update);     // U
router.delete('/users', passport.authenticate('jwt', { session: false }), UserController.remove);     // D
router.post('/users/login', UserController.login);

router.post('/lectures', passport.authenticate('jwt', { session: false }), LectureController.create);                  // C
router.get('/lectures', passport.authenticate('jwt', { session: false }), LectureController.getAll);                  // R
router.post('/lectures/:lecture_id/:lecture_code', passport.authenticate('jwt', { session: false }), custom.code , LectureController.genHash); 

router.get('/lectures/:lecture_id', passport.authenticate('jwt', { session: false }), custom.lecture, LectureController.get);     // R
router.put('/lectures/:company_id', passport.authenticate('jwt', { session: false }), custom.lecture, LectureController.update);  // U
router.delete('/lectures/:company_id', passport.authenticate('jwt', { session: false }), custom.lecture, LectureController.remove);  // D

module.exports = router;
