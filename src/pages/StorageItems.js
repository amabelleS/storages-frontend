import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { AuthContext } from '../context/auth/Auth-context';
import Context from '../context/storages/cotext';

import { useHttpClient } from '../shared/hooks/http-hook';

import StorageItemsList from '../components/StorageItemsList';

import Button from '../shared/components/FormElements/Button';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';

import './StorageItems.css';

export const StorageItems = (props) => {
  const { globalState, globalDispatch } = useContext(Context);
  const { storage } = globalState;
  const [fetchedStorage, setfetchedStorage] = useState({});
  const [storageItems, setStorageItems] = useState(
    () => JSON.parse(localStorage.getItem('storage')).storageItems
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const auth = useContext(AuthContext);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  const history = useHistory();

  // const [reserve, setReserve] = useState(false);
  const { sid } = useParams();

  // useEffect(() => {
  //   const fetchedStorage = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         process.env.REACT_APP_BACKEND_URL + `/storages/${sid}`
  //       );
  //       setfetchedStorage(responseData.storage);
  //       setStorageItems(responseData.storage.storageItems);
  //       // console.log(responseData.storage);
  //     } catch (err) {}
  //   };

  //   fetchedStorage();
  // }, [sendRequest, sid, setfetchedStorage, setStorageItems]);

  useEffect(() => {
    // getStorageFromLocalStorage();
    if (storage) {
      setfetchedStorage(storage);
      setStorageItems(storage.storageItems);
    } else {
      const data = localStorage.getItem('storage');
      if (data) {
        // console.log(data);
        globalDispatch({ type: 'set-storage', payload: JSON.parse(data) });
        setfetchedStorage(JSON.parse(data));
      }
    }
  }, [storage]);

  useEffect(() => {
    if (storage) {
      // console.log(fetchedStorage);
      setfetchedStorage(storage);
      setStorageItems(storage.storageItems);
    }
    if (storageItems) {
      const results = storageItems.filter((item) => {
        if (
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return item;
        }
      });
      setSearchResults(results);
    }
  }, [fetchedStorage, searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const reserveSubmitHandler = async () => {
    try {
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <div className="search-and-add">
        <div
          className="form-control place-form"
          style={{ marginBottom: '2rem' }}
        >
          <input
            type="text"
            placeholder="Search by item name or description"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        {auth.userId === fetchedStorage.creator && (
          <div className="add-item_button">
            <Button enter to={`/${fetchedStorage.id}/items/new`}>
              ADD ITEM
            </Button>
          </div>
        )}
      </div>

      {!isLoading && storageItems && (
        <StorageItemsList
          items={searchResults.length > 0 ? searchResults : storageItems}
          storageId={fetchedStorage._id}
          adminId={fetchedStorage.creator}

          // reserved={}
        />
      )}
    </React.Fragment>
  );
};

export default StorageItems;
