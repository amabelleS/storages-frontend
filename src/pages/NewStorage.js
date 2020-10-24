import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../shared/components/FormElements/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../shared/utils/validators';
import Button from '../shared/components/FormElements/Button';

import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../shared/components/FormElements/ImageUpload';

import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../context/auth/Auth-context';

import '../pages/StorageForm.css';

export const NewStorage = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const storageSubmitHundler = async (event) => {
    event.preventDefault();

    console.log(formState.inputs);

    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);
      // formData.append('creator', auth.userId);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/storages',
        'POST',
        formData,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={storageSubmitHundler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid description (at least 5 charecters)."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          center
          onInput={inputHandler}
          errorText="Please provide an image"
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD STORAGE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewStorage;
