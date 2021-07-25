import React, { useState, useContext, useEffect } from 'react';

import { AuthContext } from '../context/auth/Auth-context';
import Context from '../context/storages/cotext';

import { useHttpClient } from '../shared/hooks/http-hook';

import StorageItemsList from '../components/StorageItemsList';

import Button from '../shared/components/FormElements/Button';

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

  const [onlyOutMode, setOnlyOutMode] = useState(false);
  const [onlyReservedMode, setOnlyReservedMode] = useState(false);

  const auth = useContext(AuthContext);
  const { isLoading } = useHttpClient();

  useEffect(() => {
    if (storage) {
      setfetchedStorage(storage);
      setStorageItems(storage.storageItems);
    } else {
      const data = localStorage.getItem('storage');
      if (data) {
        globalDispatch({ type: 'set-storage', payload: JSON.parse(data) });
        setfetchedStorage(JSON.parse(data));
      }
    }
    // eslint-disable-next-line
  }, [storage]);

  const onlyOutItems = storage.storageItems.filter((item) => item.out);
  const onlyResevedItems = storage.storageItems.filter((item) => !item.inStock);

  useEffect(() => {
    if (storage) {
      setfetchedStorage(storage);
      setStorageItems(storage.storageItems);
    }
    if (storageItems && storageItems.length > 0) {
      const results = storageItems.filter((item) => {
        if (
          (item &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item &&
            item.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (item && item.innerNum.toString().includes(searchTerm))
        ) {
          return item;
        }
        return null;
      });
      setSearchResults(results);
    }
  }, [fetchedStorage, searchTerm, storage, storageItems]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}

      <div className="search-and-add ">
        <div
          className="form-control search-input"
          style={{ marginBottom: '2rem' }}
        >
          <input
            type="text"
            placeholder={`Search by item's name / description ${
              storage.creator === auth.userId && ` / sirial number`
            }`}
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        {auth.userId === fetchedStorage.creator && (
          <div className="items-actions">
            <Button enter to={`/${fetchedStorage.id}/items/new`}>
              ADD ITEM
            </Button>
            <Button inverse to={`/${fetchedStorage.id}`}>
              BACK TO STORAGE
            </Button>
            {auth.userId === fetchedStorage.creator && (
              <Button to={`/${fetchedStorage.id}/statistics`}>
                Total: {storageItems.length} | show charts
              </Button>
            )}
            {auth.userId === fetchedStorage.creator && (
              <Button out onClick={() => setOnlyOutMode(!onlyOutMode)}>
                {onlyOutMode ? 'Show All' : 'Show Out Items'}
              </Button>
            )}
            {auth.userId === fetchedStorage.creator && (
              <Button
                stat
                onClick={() => setOnlyReservedMode(!onlyReservedMode)}
              >
                {onlyReservedMode ? 'Show All' : 'Show Reserved Items'}
              </Button>
            )}
          </div>
        )}
      </div>

      {!isLoading && storageItems && (
        <StorageItemsList
          items={
            onlyOutMode
              ? onlyOutItems
              : onlyReservedMode
              ? onlyResevedItems
              : searchResults.length > 0
              ? searchResults
              : storageItems
          }
          storageId={fetchedStorage._id}
          adminId={fetchedStorage.creator}
          setOnlyOutMode={() => setOnlyOutMode(!onlyOutMode)}
        />
      )}
    </React.Fragment>
  );
};

export default StorageItems;
