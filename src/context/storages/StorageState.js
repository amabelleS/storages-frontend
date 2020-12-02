import React, { useState } from 'react';

import StorageContext from './StorageContext';
// import { useHttpClient } from '../../shared/hooks/http-hook';

// const MOCK_STORAGES = [
//   {
//     id: 's1',
//     title: "eliyahu's storage",
//     description: 'community storage',
//     address: 'רחבת האיצטדיון, מול וינגייט 18',
//     location: {
//       lat: 32.0603126,
//       lng: 34.7887586,
//     },
//     creator: 'u1',
//     img:
//       'https://scontent.ftlv8-1.fna.fbcdn.net/v/t1.0-9/74237778_481063296084612_5601605886289117184_n.jpg?_nc_cat=100&_nc_sid=e3f864&_nc_ohc=jSKEBBsjudYAX929Gas&_nc_ht=scontent.ftlv8-1.fna&oh=4ce3fc640df42b2d2efe7d6b45a3a48d&oe=5F9878FE',
//   },
//   {
//     id: 's2',
//     title: "Baba's storage",
//     description: 'satlas joint',
//     address: 'רחבת האיצטדיון, מול וינגייט 18',
//     creator: 'u2',
//     img:
//       'https://scontent.ftlv8-1.fna.fbcdn.net/v/t1.0-9/74237778_481063296084612_5601605886289117184_n.jpg?_nc_cat=100&_nc_sid=e3f864&_nc_ohc=jSKEBBsjudYAX929Gas&_nc_ht=scontent.ftlv8-1.fna&oh=4ce3fc640df42b2d2efe7d6b45a3a48d&oe=5F9878FE',
//   },
// ];

function StorageState({ children }) {
  const [storages, setStorages] = useState();
  const [storage, setStorage] = useState();

  // const { sendRequest } = useHttpClient();

  // useEffect(() => {
  //   const fetchStorages = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         'http://localhost:5000/api/storage'
  //       );

  //       setLoadedStorages(responseData.storages);
  //     } catch (err) {
  //       // console.log(err); // TOFIX!!!!!!!!!!!!
  //     }
  //   };
  //   fetchStorages();
  // }, [sendRequest]);

  const storageDeleteHandler = (deletedStorageId) => {
    setStorages((prevStorages) =>
      prevStorages.filter((storage) => storage.id !== deletedStorageId)
    );
  };

  return (
    <StorageContext.Provider
      value={{
        storages,
        setStorages,
        storage,
        setStorage,
        storageDeleteHandler,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
export { StorageState };
