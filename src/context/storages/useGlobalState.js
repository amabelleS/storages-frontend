import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-storages':
      return { ...state, storages: action.payload };
    case 'set-storage':
      localStorage.setItem('storage', JSON.stringify(action.payload));
      return { ...state, storage: action.payload };
    // case 'delete-item':
    //   const updatedStorage = {
    //     ...state.storage,
    //     storageItems: [
    //       ...state.storage.storageItems.filter(
    //         (item) => item.id !== action.payload
    //       ),
    //     ],
    //   };
    //   return {
    //     ...state,
    //     storage: updatedStorage,
    //   };

    default:
      return state;
  }
};

const useGlobalState = () => {
  const initialSate = {
    storages: [],
    storage: JSON.parse(localStorage.getItem('storage') || {}),
  };
  const [globalState, globalDispatch] = useReducer(reducer, initialSate);

  // add item:
  // const addItem = (item) => {
  //   globalDispatch({
  //     type: 'add-item',
  //     payload: item,
  //   });
  // };

  // delete item:
  const deleteItem = (itemId) => {
    const updatedStorage = {
      ...globalState.storage,
      storageItems: [
        ...globalState.storage.storageItems.filter(
          (item) => item.id !== itemId
        ),
      ],
    };
    globalDispatch({
      type: 'set-storage',
      payload: updatedStorage,
    });
  };

  // const storageDeleteHandler = (deletedStorageId) => {
  //   setStorages((prevStorages) =>
  //     prevStorages.filter((storage) => storage.id !== deletedStorageId)
  //   );
  // };
  // const setAmount = (itemId) => {

  //  const updatedStorage = {
  //    ...globalState.storage,
  //    storageItems: [
  //      ...globalState.storage.storageItems.find((item) => item.id === itemId),
  //    ],
  //  };
  //  globalDispatch({
  //    type: 'set-storage',
  //    payload: updatedStorage,
  //  });
  // };

  return {
    globalState,
    globalDispatch,
    deleteItem,
  };
};

export default useGlobalState;
