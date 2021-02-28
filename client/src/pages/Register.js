import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

// import { AuthContext } from '../context/auth.js';
// import { useForm } from '../util/hooks';

function Register(props) {
  //   const context = useContext(AuthContext);
  //   const [errors, setErrors] = useState({});

  //   const { onChange, onSubmit, values } = useForm(registerUser, {
  //     username: '',
  //     email: '',
  //     password: '',
  //     confirmPassword: '',
  //   });

  //   const [addUser, { loading }] = useMutation(REGISTER_USER, {
  //     update(_, { data: { register: userData } }) {
  //       context.login(userData);
  //       props.history.push('/');
  //     },
  //     onError(err) {
  //       setErrors(err.graphQLErrors[0].extensions.exception.errors);
  //     },
  //     variables: values,
  //   });

  //   function registerUser() {
  //     addUser();
  //   }

  return <div>REGISTER</div>;
}

// const REGISTER_USER = gql`
//   mutation register(
//     $username: String!
//     $email: String!
//     $password: String!
//     $confirmPassword: String!
//   ) {
//     register(
//       registerInput: {
//         username: $username
//         email: $email
//         password: $password
//         confirmPassword: $confirmPassword
//       }
//     ) {
//       id
//       email
//       username
//       createdAt
//       token
//     }
//   }
// `;

export default Register;
