import React, {useContext} from 'react';
import { Button, Form } from 'semantic-ui-react';
import {useMutation} from '@apollo/client';
import gql from 'graphql-tag';

import {AuthContext} from '../context/auth';

import {useForm} from '../util/hooks';
import ImageUpload from '../components/ImageUpload';

const Register = (props) => {
    const context = useContext(AuthContext);
    const initialState = { 
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        imageUrl: 'https://res.cloudinary.com/dvvinugki/image/upload/v1615384195/man.jpg' 
    };

    const { onChange, onSubmit, values } = useForm(registerUser, initialState)
    const [addUser, { loading, error }] = useMutation(REGISTER_USER, {
        update(_, {data: {register: userData}}){
            context.login(userData);
            props.history.push('/');
        },
        onError() {},
        variables: values
    });
    
    function registerUser() {
        addUser();
    }

    function showGraphqlError(fieldName) {
        if (!error) {
            return false;
        }

        const graphqlError = error.graphQLErrors[0].extensions.errors[fieldName];

        if (!graphqlError) {
            return false;
        }

        return graphqlError;
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input 
                    name='username'
                    type='text'
                    placeholder='Username...'
                    label='Username'
                    value={values.username}
                    error={showGraphqlError('username')}
                    onChange={onChange}
                />
                <ImageUpload onUploadComplite={(evt, data)=> {onChange(evt, data)}}/>

                <Form.Input 
                    name='email'
                    type='email'
                    placeholder='Email...'
                    label='Email'
                    value={values.email}
                    error={showGraphqlError('email')}
                    onChange={onChange}
                />
                <Form.Input 
                    name='password'
                    type='password'
                    placeholder='Password...'
                    label='Password'
                    value={values.password}
                    error={showGraphqlError('password')}
                    onChange={onChange}
                />
                <Form.Input 
                    name='confirmPassword'
                    type='password'
                    placeholder='Confirm password...'
                    label='Confirm Password'
                    value={values.confirmPassword}
                    error={showGraphqlError('confirmPassword')}
                    onChange={onChange}
                />
                
                <Button type='submit' primary>
                    Register
                </Button>    
            </Form>
            {/*{Object.keys(errors).length > 0 && ( */}
            {/*    <div className='ui error message '>*/}
            {/*    <ul className='list'>*/}
            {/*        {Object.values(errors).map(value => (*/}
            {/*            <li key={value.id}>{value}</li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*</div>  */}
            {/*)}*/}
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
        $imageUrl: String
    ) {
        register(
        registerInput: {
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword   
            imageUrl: $imageUrl
        }
        ) {
        id
        email
        username
        createdAt
        imageUrl
        token
        }
    }
`;

export default Register;
