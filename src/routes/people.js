const express = require('express');
const {
  getPeople,
  createPerson,
  updatePerson,
  deletePerson,
} = require('../controllers/people');

// instead of using "app["HTTP method name"]" we can:
// 1) instantiate "router"
// 2) replace "app["HTTP method name"]" with "router["HTTP method name"]"
// 3) export "router"
// 4) use it in "index.js" as a MIDDLEWARE
// This whole setup will make our code much cleaner.
const router = express.Router();

// 5) because we specified "base path" in "index.js" (which is "/api/people"),
// then "base path" will be concatenated with path of each route we set up here (so we need
// to remove excessive characters if we don't want to have a route like "/api/people/api/people" ):
router.get('/', getPeople);

router.post('/', createPerson);

router.put('/:id', updatePerson);

router.delete('/:id', deletePerson);

// alternatively we can set up these routes like this:
// router.route('/').get(getPeople).post(createPerson);
// router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router;
