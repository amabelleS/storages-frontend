import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Context from '../context/storages/cotext';

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

export const NewItem = () => {
  const { globalDispatch } = useContext(Context);
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
      innerNum: {
        value: '',
        isValid: true,
      },
      rentCost: {
        value: '',
        isValid: false,
      },
      depositAmount: {
        value: '',
        isValid: false,
      },
      // qntInStock: {
      //   value: null,
      //   isValid: false,
      // },
      image: {
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
    // console.log(formState.inputs);

    try {
      const formData = new FormData();
      formData.append('name', formState.inputs.name.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('innerNum', formState.inputs.innerNum.value);
      formData.append('rentCost', formState.inputs.rentCost.value);
      formData.append('depositAmount', formState.inputs.depositAmount.value);
      // formData.append('qntInStock', formState.inputs.qntInStock.value);
      formData.append('image', formState.inputs.image.value);
      // formData.append('creator', auth.userId);
      //   console.log(formData);
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/storages/${sid}/items`,
        'POST',
        formData,
        // JSON.stringify({
        //   name: formState.inputs.name.value,
        //   description: formState.inputs.description.value,
        //   sirialNum: formState.inputs.sirialNum.value,
        //   rentCost: formState.inputs.rentCost.value,
        //   depositAmount: formState.inputs.depositAmount.value,
        //   qntInStock: formState.inputs.qntInStock.value,

        // }),
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      // localStorage.setItem('storage', JSON.stringify(responseData.storage));
      // console.log(responseData);
      globalDispatch({ type: 'set-storage', payload: responseData.storage });
      history.push(`/${sid}/items`);
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
          id="innerNum"
          element="input"
          type="number"
          label="Sirial Number"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid number, 0 if no need for internal sirial number."
          placeholder="Please enter a valid number, 0 if no need for internal sirial number."
          onInput={inputHandler}
        />
        <Input
          id="rentCost"
          element="input"
          type="number"
          label="Rent Cost"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid number."
          placeholder="Please enter a valid number, 0 if no cost for rent."
          onInput={inputHandler}
        />
        <Input
          id="depositAmount"
          element="input"
          type="number"
          label="Deposit Amount"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid number, 0 if no deposit in credit card."
          placeholder="Please enter a valid number, 0 if there is no deposit."
          onInput={inputHandler}
        />

        <ImageUpload
          id="image"
          center
          onInput={inputHandler}
          errorText="Please provide an image"
        />
        <div className="space">
          <Button type="submit" disabled={!formState.isValid}>
            ADD ITEM
          </Button>
          <Button inverse to={`/${sid}/items`}>
            BACK TO ITEMSLIST
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default NewItem;
