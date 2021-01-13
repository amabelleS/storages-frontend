import React, { useContext, useEffect, useState, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../shared/components/UIElements/Modal';

import Button from '../shared/components/FormElements/Button';

import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../context/auth/Auth-context';
import Context from '../context/storages/cotext';

import './ItemDetails.css';

const initialState = {
  items: [],
  item: {},
  storage: {},
  showConfirmModal: false,
  showConfirmReserveModal: false,
  reserve: true,
  itemsLeftInStock: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STORAGE':
      return { ...state, storage: action.payload };

    case 'SET_ITEMS_LEFT':
      return { ...state, itemsLeftInStock: action.payload };
    default:
      return state;
  }
}

const ItemDetails = (props) => {
  const { globalState, globalDispatch, deleteItem } = useContext(Context);
  const { storage } = globalState;

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmReserveModal, setShowConfirmReserveModal] = useState(false);
  const [reserve, setReseve] = useState(true);

  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  // const { storage, itemDeleteHandler, setStorage, getItemsLeft } = useContext(
  //   StorageContext
  // );

  // const i = storage.storageItems.find((item) => item.id === props.id);

  const [item, setItem] = useState(
    storage.storageItems.find((item) => item.id === props.id)
  );
  // const [itemsLeft, setItemsLeft] = useState(
  //   item.qntInStock - item.reservedBy.length
  // );

  // const { item, setItem } = useState();

  const auth = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    setItem(storage.storageItems.find((item) => item.id === props.id));
  }, [deleteItem, storage, setReseve]);

  // useEffect(() => {
  //   setItemsLeft(item.qntInStock - item.reservedBy.length);

  //   console.log(itemsLeft);
  // }, [setItemsLeft, storage, item, setReseve]);

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
      // itemDeleteHandler(props.storageId, props.item.id);

      deleteItem(props.item.id);
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
          `/storages/${storage.id}/items/${props.item.id}/reserve`,
        'PATCH',
        JSON.stringify({ reserve: reserve }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      // console.log(responseData.storage);
      // console.log(reserve);
      globalDispatch({ type: 'set-storage', payload: responseData.storage });
      localStorage.setItem('storage', JSON.stringify(responseData.storage));
      setReseve(!reserve);
      // setItem(storage.storageItems.find((s) => s.id === props.id));
      // setItemsLeft(
      //   props.reservedBy && props.reservedBy.length > 0
      //     ? props.qntInStock - props.reservedBy.length
      //     : props.qntInStock
      // );
      // itemDeleteHandler(props.storageId, props.item.id);
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
            <strong>available:</strong> {props.qntInStock - props.reservedStack}
          </p>
        </div>
        {/* {props.qntInStock && <p>Total {props.qntInStock}</p>} */}
        <Button onClick={showReserveHandler} className="item-details" reverse>
          {reserve ? 'RESERVE' : 'UNRESERVE'}
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
