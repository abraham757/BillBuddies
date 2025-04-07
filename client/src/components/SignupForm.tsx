import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutation';
import Auth from '../utils/auth';
import type { User } from '../models/User';

const SignupForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
  // Set initial form state with a Partial<User> to allow undefined values for optional fields
  const [userFormData, setUserFormData] = useState<Partial<User>>({ username: '', email: '', password: '' }); 
  
  // Set state for form validation
  const [validated, setValidated] = useState(false);
  
  // Set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // Set up mutation
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if form is valid using react-bootstrap validation
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return; // Exit early if validation fails
    }

    // Set validated to true even if form is valid
    setValidated(true);

    try {
      console.log('Submitting with GraphQL:', userFormData);
      
      // Execute the mutation to create the user
      const { data } = await addUser({
        variables: { 
          username: userFormData.username!,
          email: userFormData.email!,
          password: userFormData.password!
        }
      });
      
      console.log('GraphQL response:', data);

      if (!data || !data.addUser || !data.addUser.token) {
        throw new Error('Something went wrong with the signup process!');
      }

      // Use the token from the GraphQL response to log the user in
      Auth.login(data.addUser.token);
      
      // Close the modal after successful login
      handleModalClose();
    } catch (err) {
      console.error('Signup error:', err);
      setShowAlert(true);
    }

    // Reset form data after successful submit
    setUserFormData({
      username: '',
      email: '',
      password: '', // Removed SavedBooks
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* Show alert if there is an error */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          {error ? error.message : 'Something went wrong with your signup!'}
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
/*Partial<User>: The useState<Partial<User>> allows the form to be in a state where only some of the fields of User are required. This works because you don't need groups, expensesPaid, and expensesCreated when signing up a user.

Non-null Assertion (!): Since userFormData.username, userFormData.email, and userFormData.password will be required for form submission, I've used the non-null assertion (!) in the mutation variables to tell TypeScript that these values are guaranteed to be non-null at that point (even though they may initially be undefined or empty).

Reset Form: After the successful submission, the form fields (username, email, password) are reset to empty strings.
/*

/*import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutation';
import Auth from '../utils/auth';
import type { User } from '../models/User';

const SignupForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
  // set initial form state
  const [userFormData, setUserFormData] = useState<User>({ username: '', email: '', password: '' }); //Removed SavedBooks
  // set state for form validation
  const [validated, setValidated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  
  // Set up mutation
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return; // Exit early if validation fails
    }

    // Set validated to true even if form is valid
    setValidated(true);

    try {
      console.log('Submitting with GraphQL:', userFormData);
      
      // Execute the mutation
      const { data } = await addUser({
        variables: { 
          username: userFormData.username,
          email: userFormData.email,
          password: userFormData.password
        }
      });
      
      console.log('GraphQL response:', data);

      if (!data || !data.addUser || !data.addUser.token) {
        throw new Error('Something went wrong with the signup process!');
      }

      // Use the token from the GraphQL response
      Auth.login(data.addUser.token);
      
      // Close the modal after successful login
      handleModalClose();
    } catch (err) {
      console.error('Signup error:', err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '', // Removed SavedBooks
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above *///}
      //<Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        //{/* show alert if server response is bad */}
       /* <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          {error ? error.message : 'Something went wrong with your signup!'}
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};*//*

export default SignupForm;*/