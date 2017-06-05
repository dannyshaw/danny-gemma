import React from 'react';
import { Form, Segment } from 'semantic-ui-react';

const Login = ({ isValid, inviteCode, login, onInviteCodeChange }) => {
  return (
    <div className="loginBox">
      <Form>
          <Form.Group grouped>
            <Form.Input
              label="Enter your Invitation Code"
              action={{
                type: 'submit',
                icon: 'sign in',
                onClick: (e) => {
                  e.preventDefault();
                  login()
                },
                disabled: !isValid,
              }}
              placeholder='Invite code'
              value={inviteCode}
              onChange={e => onInviteCodeChange(e.target.value)}
            />
          </Form.Group>
      </Form>
    </div>
  );
}

export default Login;
