import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// Avatar Pics:
import cat from '../assets/cat.png';
import koala from '../assets/koala.png';
import penguin from '../assets/penguin.png';

const SignupForm = () => {
    const [userFormData, setUserFormData] = useState({ username: '', password: '', avatar: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [signup, { error }] = useMutation(SIGNUP_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await signup({
                variables: { ...userFormData }
            });

            Auth.login(data.signup.token);
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            password: '',
        });
    };

    return (
        <>
            {/* This is needed for the validation functionality above */}
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                {/* show alert if server response is bad */}
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wrong with your signup!
                </Alert>

                <Form.Group>
                    <Form.Label htmlFor='username'>Username</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Your username'
                        name='username'
                        onChange={handleInputChange}
                        value={userFormData.username}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Your password'
                        name='password'
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor='avatar'>Choose your Avatar</Form.Label>
                    <Form.Select className='form-select' name="avatar" onChange={handleInputChange}>
                        <option>Choose an Avatar</option>
                        <option value={cat}>Cat</option>
                        <option value={koala}>Koala</option>
                        <option value={penguin}>Penguin</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>Avatar is required!</Form.Control.Feedback>
                </Form.Group>

                <Button
                    disabled={!(userFormData.username && userFormData.password)}
                    type='submit'
                    variant='success'>
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default SignupForm;
