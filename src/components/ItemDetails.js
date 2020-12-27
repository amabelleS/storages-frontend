import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../shared/components/UIElements/Modal';

import Button from '../shared/components/FormElements/Button';

import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../context/auth/Auth-context';
import StorageContext from '../context/storages/StorageContext';

import './ItemDetails.css';

const ItemDetails = (props) => {
  const [reserved, setReserved] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const { storage, itemDeleteHandler } = useContext(StorageContext);

  // const { item, setItem } = useState();

  const auth = useContext(AuthContext);

  const history = useHistory();

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
          `/storages/${storage.id}/items/${props.item.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      itemDeleteHandler(props.storageId, props.item.id);
      history.push(`/${props.storageId}/items/${props.item.id}`);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={props.cancelDeleteHandler}
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

      <li className="item">
        <div
        // className={`card ${props.className}`}
        // style={props.style}
        // onClick={props.onClick}
        >
          {props.children}
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
        <div className="item-details">
          <p>
            <strong>Total:</strong> {props.qntInStock && props.qntInStock}{' '}
          </p>

          <p>
            <strong>In stock:</strong>{' '}
            {props.item.reservedBy && props.item.reservedBy.length > 0
              ? props.item.reservedBy.length
              : 0}{' '}
          </p>
        </div>
        {/* {props.qntInStock && <p>Total {props.qntInStock}</p>} */}
        <Button className="item-details" reverse>
          {reserved ? 'UNRESERVE' : 'RESERVE'}
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
