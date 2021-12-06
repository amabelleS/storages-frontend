import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-storages':
      return { ...state, storages: action.payload };
    case 'set-storage':
      return { ...state, storage: action.payload };
    case 'set-userItems':
      return { ...state, userItems: action.payload };

    default:
      return state;
  }
};

const useGlobalState = () => {
  const initialSate = {
    storages: [],
    storage: JSON.parse(localStorage.getItem('storage')) || {},
    userItems: [],
  };
  const [globalState, globalDispatch] = useReducer(reducer, initialSate);

  // update storage:
  // const updateSorage = (updatedStorage) => {
  //   console.log(updatedStorage);
  //   globalDispatch({
  //     type: 'set-storage',
  //     payload: updatedStorage,
  //   });
  // };

  // delete item:
  const deleteItem = (itemId, storage) => {
    const updatedStorage = {
      ...globalState.storage,
      storageItems: [
        ...globalState.storage.storageItems.filter(
          (item) => item._id !== itemId
        ),
      ],
      totalItemsInStockCountLog: storage.totalItemsInStockCountLog,
    };
    globalDispatch({
      type: 'set-storage',
      payload: updatedStorage,
    });
  };

  // update item:
  const updateItem = (itemId, newItem) => {
    const updatedStorage = {
      ...globalState.storage,
      storageItems: [
        ...globalState.storage.storageItems.map((item) =>
          item._id === itemId ? newItem : item
        ),
      ],
    };
    globalDispatch({
      type: 'set-storage',
      payload: updatedStorage,
    });
  };

  return {
    globalState,
    globalDispatch,
    deleteItem,
    updateItem,
  };
};

export default useGlobalState;
