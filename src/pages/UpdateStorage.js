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

export const UpdateStorage = () => {
  const { globalState } = useContext(Context);
  const { storages, storage } = globalState;
  const [isLoading, setIsLoading] = useState(true);
  const storageId = useParams().sid;
  const { error, clearError, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
    },
    false
  );

  const identifiedStorage = storages.find((s) => s.id === storageId);

  useEffect(() => {
    if (identifiedStorage) {
      setFormData(
        {
          title: { value: identifiedStorage.title, isValid: true },
          description: { value: identifiedStorage.description, isValid: true },
        },
        true
      );
    }

    setIsLoading(false);
  }, [setFormData, identifiedStorage]);

  const updateSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/storages/${storageId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      history.push(`/${storageId}`);
    } catch (err) {}
  };

  if (isLoading && !error) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!identifiedStorage) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find storage</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onclear={clearError} />
      {!isLoading && identifiedStorage && (
        <form className="storage-form" onSubmit={updateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={storage.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={storage.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE STORAGE
          </Button>
          <Button inverse to={`/${storage.id}`}>
            BACK TO STORAGE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};
export default UpdateStorage;
