import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

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

  const { sendRequest, error, clearError } = useHttpClient();

  const [item, setItem] = useState(
    userItems.find((item) => item._id === props.id)
  );

  const auth = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    setItem(userItems.find((item) => item._id === props.id));
  }, [setItem, userItems, props.id]);

  useEffect(() => {
    if (item) {
      setReseve(item.inStock);
    }
  }, [setItem, item, setReseve]);

  // UNRESERVE
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

      updateItem(item._id, responseData.item);
      setReseve(responseData.item.inStock);

      history.push(`/${item.storage}/items`);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelReserveHandler}
        header="need change?"
        footerClass="storage-item__modal-actions"
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
        {item && item.image && (
          <div className="item__image">
            <Avater image={`${item.image.url}`} alt={item.name} />
          </div>
        )}
        {item && item.name && (
          <h3 className="item-details grouped_actions">{item.name}</h3>
        )}
        {item && item.description && (
          <div className="wrapper item-details big">
            <div className="container">
              <div className="parent">
                <p className="scrollbar">{item.description}</p>
              </div>
            </div>
          </div>
        )}

        <div className="cost user-fix">
          {item && item.rentCost && (
            <p className="item-details cost rent">
              <strong>Rent cost:</strong>{' '}
              <span className="color">{item.rentCost}</span>
            </p>
          )}

          <p className="item-details cost deposit">
            <strong>Deposit Amount:</strong>{' '}
            <span className="color">
              {item && item.depositAmount && item.depositAmount}
            </span>
          </p>
        </div>

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
          <div className="storage-item__actions">
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
