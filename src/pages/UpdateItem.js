import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useHttpClient } from '../shared/hooks/http-hook';

import Input from '../shared/components/FormElements/Input';
import Button from '../shared/components/FormElements/Button';
import Card from '../shared/components/UIElements/Card';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../shared/components/UIElements//ErrorModal';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../shared/utils/validators';
import { useForm } from '../shared/hooks/form-hook';

import Context from '../context/storages/cotext';
import { AuthContext } from '../context/auth/Auth-context';

import './StorageForm.css';

export const UpdateItem = () => {
  const { globalState, updateItem } = useContext(Context);
  const { storage } = globalState;
  const [isLoading, setIsLoading] = useState(true);
  const storageId = useParams().sid;
  const itemId = useParams().itemId;
  const { error, clearError, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: { value: '', isValid: false },
      description: { value: '', isValid: false },
      rentCost: { value: '', isValid: false },
    },
    false
  );

  const identifiedItem = storage.storageItems.find((i) => i.id === itemId);

  useEffect(() => {
    if (identifiedItem && identifiedItem.length > 0) {
      setFormData(
        {
          name: { value: identifiedItem.name, isValid: true },
          description: { value: identifiedItem.description, isValid: true },
          rentCost: { value: identifiedItem.rentCost, isValid: true },
        },
        true
      );
    }

    setIsLoading(false);
  }, [setFormData, identifiedItem]);

  const updateSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/storages/${storageId}/items/${itemId}`,
        'PATCH',
        JSON.stringify({
          name: formState.inputs.name.value,
          description: formState.inputs.description.value,
          rentCost: formState.inputs.rentCost.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );

      updateItem(itemId, responseData.item);

      history.push(`/${storageId}/items`);
    } catch (err) {}
  };

  if (isLoading && !error) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!identifiedItem) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find item</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onclear={clearError} />
      {!isLoading && identifiedItem && (
        <form className="storage-form" onSubmit={updateSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid item name."
            onInput={inputHandler}
            initialValue={identifiedItem.name}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={identifiedItem.description}
            initialValid={true}
          />
          <Input
            id="rentCost"
            element="textarea"
            label="Rent Cost"
            validators={[VALIDATOR_REQUIRE()]}
            type="number"
            errorText="Please enter a valid number."
            onInput={inputHandler}
            initialValue={identifiedItem.rentCost}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE ITEM
          </Button>
          <Button inverse to={`/${storage.id}/items`}>
            BACK TO ITEMSLIST
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};
export default UpdateItem;
