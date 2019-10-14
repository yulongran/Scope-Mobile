var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// ********************** Developement Testing ***************

const courses = [
  { id: 1, name: 'course1', },
  { id: 2, name: 'course2', },
  { id: 3, name: 'course3', },
]

router.get('/courses', (req, res) => {
  res.send("List of courses");
});
// API
router.get('/courses/:id', (req, res) => {
  let course = courses.find(c => c.id == parseInt(req.params.id));
  if (!course) res.status(404).send('The course with given id not found');// 404 Object Not found
  res.send(course);
});

module.exports = router;
