import React, { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../../context/auth/Auth-context';
import Context from '../../context/storages/cotext';
import { useHttpClient } from '../../shared/hooks/http-hook';
import UserItemsList from '../components/UserItemsList';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserInfo = () => {
  const auth = useContext(AuthContext);
  const { globalState, globalDispatch } = useContext(Context);
  const { userItems } = globalState;
  const [loadedItems, setLoadedItems] = useState();
  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/items/${auth.userId}`
        );

        setLoadedItems(responseData.items);
        // console.log(responseData.items);
        globalDispatch({
          type: 'set-userItems',
          payload: responseData.items,
        });
      } catch (err) {
        console.log(err); // TOFIX!!!!!!!!!!!!
      }
    };
    fetchUserItems();
  }, [sendRequest, setLoadedItems]);

  //   useEffect(() => {
  //     if (loadedItems && loadedItems.length > 0) {
  //       localStorage.setItem('userItems', JSON.stringify(loadedItems));

  //       const results = loadedItems.filter((item) => {
  //         if (
  //           (item &&
  //             item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
  //           (item &&
  //             item.descripsion.toLowerCase().includes(searchTerm.toLowerCase()))
  //         ) {
  //           return item;
  //         }
  //       });

  //       setSearchResults(results);
  //     }
  //   }, [searchTerm, loadedItems]);

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
          placeholder="Search by name or discription"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      {!loadedItems && (
        <div className="user-list center">
          <Card>
            <h2>No items found</h2>
            {/* <Button to={`/${props.storageId}`}>Back to last storage</Button> */}
            <Button inverse to="/">
              Back to all storages
            </Button>
          </Card>
        </div>
      )}
      {!isLoading && loadedItems && (
        <UserItemsList
          items={searchResults.length > 0 ? searchResults : loadedItems}
        />
      )}
    </React.Fragment>
  );
};

export default UserInfo;
