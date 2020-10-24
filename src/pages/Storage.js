import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import StorageContext from '../context/storages/StorageContext';
import { AuthContext } from '../context/auth/Auth-context';
import { useHttpClient } from '../shared/hooks/http-hook';

import Card from '../shared/components/UIElements/Card';
import Button from '../shared/components/FormElements/Button';
import Modal from '../shared/components/UIElements/Modal';
import Map from '../shared/components/UIElements/Map';

import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';

import './Storage.css';

export const Storage = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  const history = useHistory();

  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loadedStorage, setLoadedStorage] = useState();

  const { sid } = useParams();
  const { setStorage, storageDeleteHandler } = useContext(StorageContext);
  // const storages = storages.find((s) => s.id === sid);
  //   console.log(storage);

  useEffect(() => {
    const fetchedStorage = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/storages/${sid}`
        );
        setLoadedStorage(responseData.storage);
        setStorage(responseData.storage);
        // console.log(responseData.storage);
      } catch (err) {}
    };

    fetchedStorage();
  }, [sendRequest, sid, setStorage, setLoadedStorage]);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/storages/${loadedStorage.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      storageDeleteHandler(loadedStorage.id);
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {loadedStorage && (
        <Modal
          show={showMap}
          onCancel={closeMapHandler}
          header={loadedStorage.address}
          contentClass="place-item__modal-content"
          footerClass="place-item__modal-actions"
          footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
        >
          <div className="map-container">
            <Map center={loadedStorage.location} zoom={16} />
          </div>
        </Modal>
      )}

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this storage? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      {loadedStorage && (
        <article className="place-item">
          <Card className="box place-item__content">
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="place-item__image">
              <img
                src={`${process.env.REACT_APP_ASSET_URL}/${loadedStorage.image}`}
                alt={loadedStorage.title}
              ></img>
            </div>
            <div className="place-item__info">
              <h2>{loadedStorage.title}</h2>
              <h3>{loadedStorage.address}</h3>
              <p>{loadedStorage.description}</p>
            </div>
            <div className="place-item__actions">
              <Button inverse onClick={openMapHandler}>
                VIEW ON MAP
              </Button>
              {auth.userId === loadedStorage.creator && (
                <Button to={`/${loadedStorage.id}/update`}>EDIT</Button>
              )}
              {auth.userId === loadedStorage.creator && (
                <Button danger onClick={showDeleteWarningHandler}>
                  DELETE STORAGE
                </Button>
              )}
              {auth.isLoggedIn && <Button enter>RESERVE ITEM</Button>}
            </div>
          </Card>
        </article>
      )}
    </React.Fragment>
  );
};

export default Storage;
