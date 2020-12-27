import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';

import { AuthContext } from '../context/auth/Auth-context';
import StorageContext from '../context/storages/StorageContext';

import { useHttpClient } from '../shared/hooks/http-hook';

import StorageItemsList from '../components/StorageItemsList';

import Button from '../shared/components/FormElements/Button';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';

import './StorageItems.css';

const StorageItems = (props) => {
  const [fetchedStorage, setLocalStorage] = useState({});
  const [storageItems, setStorageItems] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const auth = useContext(AuthContext);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  const history = useHistory();

  // const [reserve, setReserve] = useState(false);
  // const { sid } = useParams();

  const { storage, setStorage, itemDeleteHandler } = useContext(StorageContext);

  // const [rows, set] = useState(storageItems);

  // let height = 0;
  // const transitions = useTransition(
  //   rows.map((storageItems) => ({
  //     ...storageItems,
  //     y: (height += storageItems.height) - storageItems.height,
  //   })),
  //   (d) => d.name,
  //   {
  //     from: { height: 0, opacity: 0 },
  //     leave: { height: 0, opacity: 0 },
  //     enter: ({ y, height }) => ({ y, height, opacity: 1 }),
  //     update: ({ y, height }) => ({ y, height }),
  //   }
  // );

  // const fetchedStorage = localStorage.getItem('stoeage');

  useEffect(() => {
    // getStorageFromLocalStorage();
    const data = localStorage.getItem('storage');
    if (data) {
      // console.log(data);
      setStorage(JSON.parse(data));
      setLocalStorage(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (fetchedStorage) {
      // console.log(fetchedStorage);
      setStorageItems(fetchedStorage.storageItems);
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
