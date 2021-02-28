import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

// import { AuthContext } from '../context/auth.js';
// import { useForm } from '../util/hooks';

function Login(props) {
  //   const context = useContext(AuthContext);
  //   const [errors, setErrors] = useState({});

  //   const { onChange, onSubmit, values } = useForm(loginUserCallback, {
  //     username: '',
  //     password: '',
  //   });

  //   const [loginUser, { loading }] = useMutation(LOGIN_USER, {
  //     update(_, { data: { login: userData } }) {
  //       context.login(userData);
  //       props.history.push('/');
  //     },
  //     onError(err) {
  //       setErrors(err.graphQLErrors[0].extensions.exception.errors);
  //     },
  //     variables: values,
  //   });

  //   function loginUserCallback() {
  //     loginUser();
  //   }

  return <div>LOGIN</div>;
}

// const LOGIN_USER = gql`
//   mutation login($username: String!, $password: String!) {
//     login(username: $username, password: $password) {
//       id
//       email
//       username
//       createdAt
//       token
//     }
//   }
// `;

export default Login;
