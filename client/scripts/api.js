import React from 'react';
import Request from 'superagent';

export const getInvitation = (code) => {
  return new Promise((resolve, reject) => {
    Request
      .get(`/api/invitation/${code}`)
      .end((err, result) => {
        if (err) {
          resolve(false, result.body.error);
        } else {
          resolve(result.body.invitation, false);
        }
      })
    ;
  });
}

export const updateInvitation = (code, data) => {
  return new Promise((resolve, reject) => {
    Request
      .post(`/api/invitation/${code}`)
      .send(data)
      .end((err, result) => {
        if (err) {
          reject(result.body.error);
        } else {
          resolve();
        }
      })
    ;
  });
}

