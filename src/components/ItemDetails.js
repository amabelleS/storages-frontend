import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../shared/components/UIElements/Modal';
import ErrorModal from '../shared/components/UIElements/ErrorModal';

import Avater from '../shared/components/UIElements/Avatar';
import Button from '../shared/components/FormElements/Button';

import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../context/auth/Auth-context';
import Context from '../context/storages/cotext';

import './ItemDetails.css';

const ItemDetails = (props) => {
  const { globalState, deleteItem, updateItem } = useContext(Context);
  const { storage } = globalState;

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmReserveModal, setShowConfirmReserveModal] = useState(false);
  const [showConfirmOutModal, setShowConfirmOutModal] = useState(false);
  const [showConfirmInModal, setShowConfirmInModal] = useState(false);
  const [showUserDetailModal, setShowUserDetailModal] = useState(false);
  const [reserve, setReseve] = useState(false);

  const { sendRequest, error, clearError } = useHttpClient();

  const [item, setItem] = useState(
    storage.storageItems.find((item) => item._id === props.id)
  );

  const auth = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    setItem(storage.storageItems.find((item) => item._id === props.id));
  }, [deleteItem, storage, setReseve, updateItem, props.id]);

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
      const res = await sendRequest(
        process.env.REACT_APP_BACKEND_URL +
          `/storages/${storage.id}/items/${item._id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );

      deleteItem(item._id, res.storage);
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

      updateItem(item._id, responseData.item);
      setReseve(responseData.item.inStock);

      history.push(`/${props.storageId}/items`);
    } catch (err) {}
  };

  // OUT - log item out of storage
  const showOutHandler = () => {
    setShowConfirmOutModal(true);
  };

  const cancelOutHandler = () => {
    setShowConfirmOutModal(false);
  };

  const confirmOutHandler = async () => {
    setShowConfirmOutModal(false);
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL +
          `/storages/${storage.id}/items/${props.id}/out`,
        'PATCH',
        JSON.stringify({ income: item.rentCost }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      // console.log(responseData.storage);

      // DOESNT WORK :(
      // globalDispatch({ type: 'set-storage', payload: responseData.storage });
      // updateSorage(responseData.storage);
      updateItem(item._id, responseData.item);

      history.push(`/${props.storageId}/items`);
    } catch (err) {}
  };

  // ITEM IN - log item back into the storage
  const showInHandler = () => {
    setShowConfirmInModal(true);
  };

  const cancelInHandler = () => {
    setShowConfirmInModal(false);
  };

  const confirmInHandler = async () => {
    setShowConfirmInModal(false);
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/items/${props.id}/in`,
        'PATCH',
        null,
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );

      updateItem(item._id, responseData.item);

      history.push(`/${props.storageId}/items`);
    } catch (err) {}
  };

  const outInButton =
    item && item.out ? (
      <Button stat big onClick={showInHandler}>
        IN
      </Button>
    ) : (
      <Button out big onClick={showOutHandler}>
        OUT
      </Button>
    );

  //reserved item - user details
  const showUserDetailHandler = () => {
    setShowUserDetailModal(true);
  };

  const cancelUserDetailHandler = () => {
    setShowUserDetailModal(false);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {/* {isLoading && (
        <div className="center">
          {isLoading && <LoadingSpinner asOverlay />}
        </div>
      )} */}
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="storage__modal-actions"
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
        footerClass="storage__modal-actions"
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

      <Modal
        show={showConfirmOutModal}
        onCancel={cancelOutHandler}
        header="You are going to chack this item OUT"
        footerClass="storage__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelOutHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmOutHandler}>
              Check item OUT
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed and OUT this item?</p>
      </Modal>

      <Modal
        show={showConfirmInModal}
        onCancel={cancelInHandler}
        header="You are going to chack this item IN"
        footerClass="storage__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelInHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmInHandler}>
              Check item IN
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed and check IN this item?</p>
      </Modal>

      {item && item.reservedByDetails && (
        <Modal
          show={showUserDetailModal}
          onCancel={cancelUserDetailHandler}
          header={
            item &&
            item.reservedByDetails &&
            `Name: ` + item.reservedByDetails.name
          }
          footerClass="storage__modal-actions"
          footer={
            <Button inverse onClick={cancelUserDetailHandler}>
              CLOSE
            </Button>
          }
        >
          <address>
            <a href={'mailto:' + item.reservedByDetails.email}>
              {item.reservedByDetails.email}
            </a>
          </address>
          <p>
            Phon Number:{' '}
            {item && item.reservedByDetails && item.reservedByDetails.phoneNum}
          </p>
          <p>
            facebook Name:{' '}
            {item &&
              item.reservedByDetails &&
              item.reservedByDetails.facebookName}
          </p>
        </Modal>
      )}

      {item && (
        <li className="item">
          <div className="image_name">
            <div className="item__image">
              <Avater image={`${props.image}`} alt={props.name} />
            </div>
            {props.name && (
              <h3 className="item-details grouped_actions">{props.name}</h3>
            )}
          </div>
          <div className="info-container">
            {props.description && (
              <div className="wrapper item-details big">
                <div className="container">
                  <div className="parent">
                    <p
                      className="scrollbar"
                      // style={{
                      //   margin: '1.2rem',
                      // }}
                    >
                      {props.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="cost">
              <p className="item-details cost rent">
                <strong>Rent cost:</strong>{' '}
                <span className="color">{item && item.rentCost}</span>
              </p>

              <p className="item-details cost deposit">
                <strong>Deposit Amount:</strong>{' '}
                <span className="color">{item && item.depositAmount}</span>
              </p>
            </div>
          </div>
          <div className="actions">
            {auth.userId === props.adminId && (
              <div className="grouped_actions edit">
                <Button enter to={`/${storage.id}/items/${props.id}/update`}>
                  EDIT
                </Button>
                <Button onClick={showDeleteWarningHandler}>DELETE</Button>
              </div>
            )}
            {item && (
              <div className="grouped_actions reserve">
                <Button
                  onClick={showReserveHandler}
                  disabled={!auth.isLoggedIn || !item.inStock}
                  danger
                >
                  {auth.isLoggedIn && item
                    ? item.inStock
                      ? 'RESERVE'
                      : 'שמור'
                    : 'authenticate to reserve'}
                </Button>
                {auth.userId === props.adminId && (
                  <Button
                    onClick={showReserveHandler}
                    disabled={!(auth.userId === props.adminId) || item.inStock}
                    inverse
                  >
                    UNRESERVE
                  </Button>
                )}
              </div>
            )}

            {auth.userId === props.adminId && (
              <div className="grouped_actions">
                {outInButton}
                {item &&
                  item.reservedByDetails &&
                  auth.userId === props.adminId && (
                    <Button
                      danger
                      onClick={showUserDetailHandler}
                      disabled={!auth.userId === props.adminId}
                    >
                      User Details
                    </Button>
                  )}
              </div>
            )}
          </div>
        </li>
      )}
    </React.Fragment>
  );
};

export default ItemDetails;
