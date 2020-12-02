import React, { useEffect, useState, useContext } from 'react';

import StorageContext from '../context/storages/StorageContext';
import { useHttpClient } from '../shared/hooks/http-hook';
import StorageList from '../components/StorageList';

import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';

import Input from '../shared/components/FormElements/Input';
import Button from '../shared/components/FormElements/Button';

export const Storages = () => {
  const [LoadedStorages, setLoadedStorages] = useState();
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const { setStorages } = useContext(StorageContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // const STORAGES = [
  //   {
  //     id: 's1',
  //     title: "eliyahu's storage",
  //     description: 'community storage',
  //     address: 'רחבת האיצטדיון, מול וינגייט 18',
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

  useEffect(() => {
    const fetchStorages = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/storages`
        );

        setLoadedStorages(responseData.storages);
        // console.log(responseData.storages);
        setStorages(responseData.storages);
      } catch (err) {
        console.log(err); // TOFIX!!!!!!!!!!!!
      }
    };
    fetchStorages();
  }, [sendRequest, setStorages]);

  useEffect(() => {
    if (LoadedStorages) {
      const results = LoadedStorages.filter((storage) => {
        if (
          storage.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          storage.address.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return storage;
        }
      });

      setSearchResults(results);
    }
  }, [searchTerm]);

  // const storageDeleteHandler = () => {};

  // const inputHandler = () => {};

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          {isLoading && <LoadingSpinner asOverlay />}
        </div>
      )}
      <div className="form-control place-form" style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search by title or address"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      {!isLoading && LoadedStorages && (
        <StorageList
          items={searchResults.length > 0 ? searchResults : LoadedStorages}
          error={error}
          onClear={clearError}
          // onDeleteStorage={storageDeleteHandler}
        />
      )}
    </React.Fragment>
  );
};

export default Storages;
