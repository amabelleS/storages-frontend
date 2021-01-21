import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../context/auth/Auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './Auth.css';

export const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },

      // IDnum: {
      //   value: '',
      //   isValid: false,
      // },
      // phoneNum: {
      //   value: '',
      //   isValid: false,
      // },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          IDnum: undefined,
          phoneNum: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
          IDnum: {
            value: '',
            isValid: false,
          },
          phoneNum: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        console.log(responseData);
        auth.login(responseData.userId, responseData.token, responseData.name);
        history.push('/');
      } catch (err) {}
    } else {
      try {
        // const formData = new FormData();
        // formData.append('email', formState.inputs.email.value);
        // formData.append('name', formState.inputs.name.value);
        // formData.append('password', formState.inputs.password.value);

        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/users/signup',
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            IDnum: formState.inputs.IDnum.value,
            phoneNum: formState.inputs.phoneNum.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );

        auth.login(responseData.userId, responseData.token, responseData.name);
        history.push('/');
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <React.Fragment>
              <Input
                element="input"
                id="name"
                type="text"
                label="Your Full Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter your full name."
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="IDnum"
                type="number"
                label="ID Number"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter your ID number."
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="phoneNum"
                type="tel"
                label="Phone Number"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter your phone number."
                onInput={inputHandler}
              />
            </React.Fragment>
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid e-mail address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />

          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
