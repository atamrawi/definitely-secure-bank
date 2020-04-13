import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const onChangeFactory = setter => {
  return e => {
    setter(e.target.value);
  };
};

export default function Login({ user }) {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      history.replace('/');
    }
  }, [history, user]);

  return (
    <Form method="POST" action="/login">
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={username}
          onChange={onChangeFactory(setUsername)}
          placeholder="Username"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={onChangeFactory(setPassword)}
          placeholder="Password"
        />
      </Form.Group>
      <Button type="submit" disabled={username.length < 1 || password.length < 1}>
        Submit
      </Button>
    </Form>
  );
}
