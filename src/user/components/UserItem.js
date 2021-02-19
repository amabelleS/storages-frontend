import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import Avater from '../../shared/components/UIElements/Avatar';
import Button from '../../shared/components/FormElements/Button';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../context/auth/Auth-context';
import Context from '../../context/storages/cotext';

const UserItem = (props) => {
  const { globalState, updateItem } = useContext(Context);
  const { userItems } = globalState;

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [reserve, setReseve] = useState(userItems.inStock);

  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  const [item, setItem] = useState(
    userItems.find((item) => item._id === props.id)
  );
  // console.log(item._id);
  const auth = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    setItem(userItems.find((item) => item._id === props.id));
  }, [setItem, userItems]);

  useEffect(() => {
    if (item) {
      setReseve(item.inStock);
    }
  }, [setItem, item, setReseve]);

  // RESERVE

  const showReserveHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelReserveHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmResrveHandler = async () => {
    setShowConfirmModal(false);
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL +
          `/storages/${item.storage}/items/${props.id}/reserve`,
        'PATCH',
        JSON.stringify({ reserve: false }),
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
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
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
        {item && item.image && (
          <div className="item__image">
            <Avater
              image={`${process.env.REACT_APP_ASSET_URL}/${item.image}`}
              alt={item.name}
            />
          </div>
        )}
        {item && item.name && <h3 className="item-details">{item.name}</h3>}
        {item && item.description && (
          <p
            className="item-details"
            // style={{
            //   margin: '1.2rem',
            // }}
          >
            {item.description}
          </p>
        )}
        {item && item.rentCost && (
          <p className="item-details">
            <strong>Rent cost:</strong> {item.rentCost}
          </p>
        )}

        <p className="item-details">
          <strong>Deposit Amount:</strong>{' '}
          {item && item.depositAmount && item.depositAmount}{' '}
        </p>

        {/* <p className="item-details">
          <strong>{item.inStock ? 'available' : 'not available'}</strong>
        </p> */}

        {item && (
          <Button
            onClick={showReserveHandler}
            className="item-details"
            disabled={!auth.isLoggedIn || item.out}
            danger
          >
            UNRESERVE
          </Button>
        )}
        {auth.userId === props.adminId && (
          <div className="place-item__actions">
            <Button
              className="item-details"
              enter
              to={`/${item.storage}/items/${props.id}/update`}
            >
              EDIT
            </Button>
          </div>
        )}
      </li>
    </React.Fragment>
  );
};

export default UserItem;
