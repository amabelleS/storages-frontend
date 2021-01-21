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

// const MOCK_STORAGES = [
//   {
//     id: 's1',
//     title: "eliyahu's storage",
//     description: 'community storage',
//     address: 'רחבת האיצטדיון, מול וינגייט 18',
//     location: {
//       lat: 32.0603126,
//       lng: 34.7887586,
//     },
//     creator: 'u1',
//     img:
//       'https://scontent.ftlv8-1.fna.fbcdn.net/v/t1.0-9/74237778_481063296084612_5601605886289117184_n.jpg?_nc_cat=100&_nc_sid=e3f864&_nc_ohc=jSKEBBsjudYAX929Gas&_nc_ht=scontent.ftlv8-1.fna&oh=4ce3fc640df42b2d2efe7d6b45a3a48d&oe=5F9878FE',
//   },
//   {
//     id: 's2',
//     title: "Baba's storage",
//     description: 'satlas joint',
//     address: 'רחבת האיצטדיון, מול וינגייט 18',
//     creator: 'u2',
//     img:
//       'https://scontent.ftlv8-1.fna.fbcdn.net/v/t1.0-9/74237778_481063296084612_5601605886289117184_n.jpg?_nc_cat=100&_nc_sid=e3f864&_nc_ohc=jSKEBBsjudYAX929Gas&_nc_ht=scontent.ftlv8-1.fna&oh=4ce3fc640df42b2d2efe7d6b45a3a48d&oe=5F9878FE',
//   },
// ];

export const UpdateStorage = () => {
  const { globalState, globalDispatch } = useContext(Context);
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
        <form className="place-form" onSubmit={updateSubmitHandler}>
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
