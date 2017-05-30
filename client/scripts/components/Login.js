import React from 'react';
import { Form, Segment } from 'semantic-ui-react';

const Login = ({ isValid, inviteCode, login, onInviteCodeChange }) => {
  return (
    <Form>
      <Segment>
        <Form.Group grouped>
          <Form.Input
            action={{
              type: 'submit',
              icon: 'sign in',
              onClick: (e) => {
                e.preventDefault();
                login()
              },
              disabled: !isValid,
            }}
            placeholder='Enter invite code'
            value={inviteCode}
            onChange={e => onInviteCodeChange(e.target.value)}
          />
        </Form.Group>
      </Segment>
    </Form>
  );
}

export default Login;
