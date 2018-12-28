import initStore from '../store';

const initItemController = async () => {
  const { collections: { items: itemStore } } = await initStore();

  const getItems = async (req, res) => {
    try {
      const allitems = await itemStore.getall();
      res.send(allitems);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  const createItem = async (req, res) => {
    try {
      const newItem = req.body;
      const updatedItemList = await itemStore.insert(newItem);
      res.send(updatedItemList);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  const getItemById = async (req, res) => {
    try {
      const { id } = req.params;
      const item = await itemStore.getById(id);
      res.send(item);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  const updateItemById = async (req, res) => {
    try {
      const { id } = req.params;
      const changes = req.body;
      const item = await itemStore.updateById(id, changes);
      res.send(item);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  const deleteItemById = async (req, res) => {
    try {
      const { id } = req.params;
      const changes = req.body;
      const item = await itemStore.updateById(id, changes);
      res.send(item);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  return {
    getItems,
    createItem,
    getItemById,
    updateItemById,
    deleteItemById,
  };
};

module.exports = initItemController;
