// here we define a controller (just another name for "handlers"/"request listeners")
const login = (req, res) => {
  const { name } = req.body;

  if (name) {
    return res.status(200).send(`Welcome ${name}!`);
  }

  return res.status(401).send('Please provide a name!');
};

module.exports = login;
