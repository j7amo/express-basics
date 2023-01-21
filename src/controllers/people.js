const { people } = require('../data');

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name!' });
  }

  return res.status(201).json({ success: true, person: name });
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((item) => item.id === Number(id));

  if (person) {
    const updatedPeople = people.map((item) => {
      if (item.id === person.id) {
        return {
          ...item,
          name,
        };
      }

      return item;
    });

    return res.status(200).json({ success: true, data: updatedPeople });
  }

  return res
    .status(404)
    .json({ success: false, msg: `no person with id ${id}` });
};

const deletePerson = (req, res) => {
  const { id } = req.params;

  const person = people.find((item) => item.id === Number(id));

  if (person) {
    const updatedPeople = people.filter((item) => item.id !== person.id);

    return res.status(200).json({ success: true, data: updatedPeople });
  }

  return res
    .status(404)
    .json({ success: false, msg: `no person with id ${id}` });
};

module.exports = {
  getPeople,
  createPerson,
  updatePerson,
  deletePerson,
};
