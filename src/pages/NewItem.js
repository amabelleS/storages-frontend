import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Input from '../shared/components/FormElements/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../shared/utils/validators';
import Button from '../shared/components/FormElements/Button';

import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';

import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../context/auth/Auth-context';

import '../pages/StorageForm.css';

export const NewItem = () => {
  const auth = useContext(AuthContext);
  const { sid } = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      rentCost: {
        value: '',
        isValid: false,
      },
      qntInStock: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const itemSubmitHundler = async (event) => {
    event.preventDefault();
    // console.log(sid);
    console.log(formState.inputs);

    try {
      //   const formData = new FormData();
      //   formData.append('name', formState.inputs.name.value);
      //   formData.append('description', formState.inputs.description.value);
      //   formData.append('rentCost', formState.inputs.rentCost.value);
      //   formData.append('qntInStock', formState.inputs.qntInStock.value);
      //   // formData.append('creator', auth.userId);
      //   console.log(formData);
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/storages/${sid}/items`,
        'POST',
        JSON.stringify({
          name: formState.inputs.name.value,
          description: formState.inputs.description.value,
          rentCost: formState.inputs.rentCost.value,
          qntInStock: formState.inputs.qntInStock.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      history.push(`/${sid}`);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={itemSubmitHundler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 charecters)."
          onInput={inputHandler}
        />
        <Input
          id="rentCost"
          element="input"
          type="number"
          label="Rent Cost"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid number."
          onInput={inputHandler}
        />
        <Input
          id="qntInStock"
          element="input"
          type="number"
          label="Quantety"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid number."
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          ADD ITEM
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewItem;
