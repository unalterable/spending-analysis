const initTransactionController = (store) => {
  const save = async (req, res) => {
    const userId = req.jwt.user.id;
    await store.rentStrings.insertOne(userId, req.body.newRentString);
    res.sendStatus(204);
  };

  return {
    save,
  };
};

module.exports = initTransactionController;
