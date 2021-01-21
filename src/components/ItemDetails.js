import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../shared/components/UIElements/Modal';

import Avater from '../shared/components/UIElements/Avatar';
import Button from '../shared/components/FormElements/Button';

import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../context/auth/Auth-context';
import Context from '../context/storages/cotext';

import './ItemDetails.css';

const ItemDetails = (props) => {
  const { globalState, globalDispatch, deleteItem, updateItem } = useContext(
    Context
  );
  const { storage } = globalState;

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmReserveModal, setShowConfirmReserveModal] = useState(false);
  const [reserve, setReseve] = useState(false);

  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  const [item, setItem] = useState(
    storage.storageItems.find((item) => item._id === props.id)
  );
  // console.log(item._id);
  const auth = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    setItem(storage.storageItems.find((item) => item._id === props.id));
  }, [deleteItem, storage, setReseve]);

  useEffect(() => {
    if (item) {
      setReseve(item.inStock);
    }
  }, [setItem, item, setReseve]);
  // DELETE

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
        process.env.REACT_APP_BACKEND_URL +
          `/storages/${storage.id}/items/${item._id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );

      deleteItem(item._id);
      history.push(`/${props.storageId}/items`);
    } catch (err) {}
  };

  // RESERVE

  const showReserveHandler = () => {
    setShowConfirmReserveModal(true);
  };

  const cancelReserveHandler = () => {
    setShowConfirmReserveModal(false);
  };

  const confirmResrveHandler = async () => {
    setShowConfirmReserveModal(false);
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL +
          `/storages/${storage.id}/items/${props.id}/reserve`,
        'PATCH',
        JSON.stringify({ reserve: reserve }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      // console.log(responseData.item);
      // console.log(reserve);
      // globalDispatch({ type: 'set-storage', payload: responseData.storage });
      // localStorage.setItem('storage', JSON.stringify(responseData.storage));
      updateItem(item._id, responseData.item);
      setReseve(responseData.item.inStock);

      history.push(`/${props.storageId}/items`);
    } catch (err) {}
  };

  return (
    <React.Fragment>
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
      <Modal
        show={showConfirmReserveModal}
        onCancel={cancelReserveHandler}
        header="need change?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelReserveHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmResrveHandler}>
              {reserve ? 'RESERVE' : 'UNRESERVE'}
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and {reserve ? 'RESERVE' : 'UNRESERVE'} this
          item?
        </p>
      </Modal>

      <li className="item">
        <div
        // className={`card ${props.className}`}
        // style={props.style}
        // onClick={props.onClick}
        >
          {props.children}
        </div>
        <div className="item__image">
          <Avater
            image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
            alt={props.name}
          />
        </div>
        {props.name && <h3 className="item-details">{props.name}</h3>}
        {props.description && (
          <p
            className="item-details"
            // style={{
            //   margin: '1.2rem',
            // }}
          >
            {props.description}
          </p>
        )}
        {props.rentCost && (
          <p className="item-details">
            <strong>Rent cost:</strong> {props.rentCost}
          </p>
        )}

        <p className="item-details">
          <strong>Deposit Amount:</strong>{' '}
          {item && item.depositAmount && item.depositAmount}{' '}
        </p>

        {/* <p className="item-details">
          <strong>{item.inStock ? 'available' : 'not available'}</strong>
        </p> */}

        <Button
          onClick={showReserveHandler}
          className="item-details"
          disabled={!auth.isLoggedIn || !item.inStock}
          inverse
        >
          {auth.isLoggedIn
            ? item.inStock
              ? 'RESERVE'
              : 'בהשאלה'
            : 'authenticate to reserve'}
        </Button>
        {auth.userId === props.adminId && (
          <div className="place-item__actions">
            <Button
              className="item-details"
              enter
              to={`/${storage.id}/items/${props.id}/update`}
            >
              EDIT
            </Button>
            <Button onClick={showDeleteWarningHandler}>DELETE</Button>
          </div>
        )}
      </li>
    </React.Fragment>
  );
};

export default ItemDetails;
