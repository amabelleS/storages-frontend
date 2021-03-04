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
  const { globalDispatch } = useContext(Context);
  const [loadedItems, setLoadedItems] = useState([]);

  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/items/${auth.userId}`
        );

        setLoadedItems(responseData.items);
        globalDispatch({
          type: 'set-userItems',
          payload: responseData.items,
        });
      } catch (err) {
        console.log(err); // TOFIX!!!!!!!!!!!!
      }
    };
    fetchUserItems();

    // eslint-disable-next-line
  }, [sendRequest, setLoadedItems, auth.userId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          {isLoading && <LoadingSpinner asOverlay />}
        </div>
      )}

      {!isLoading && !loadedItems && (
        <div className="user-list center">
          <Card>
            <h2>No items found</h2>
            <Button inverse to="/">
              Back to all storages
            </Button>
          </Card>
        </div>
      )}
      {!isLoading && loadedItems && <UserItemsList items={loadedItems} />}
    </React.Fragment>
  );
};

export default UserInfo;
