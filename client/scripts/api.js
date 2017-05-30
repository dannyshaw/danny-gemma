import React from 'react';
import Request from 'superagent';

export const getInvitation = (code) => {
  return new Promise((resolve, reject) => {
    Request
      .get(`/api/invitation/${code}`)
      .end((err, result) => {
        if (err) {
          resolve({ data: false, error: result.body.error });
        } else {
          resolve({ data: result.body.invitation, error: false });
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


export const fuckingSpotify = (clientId, clientSecret) => {
  return new Promise((resolve, reject) => {
    Request
      .post('https://accounts.spotify.com/api/token')
      .set('Authorization', btoa(`${clientId}:${clientSecret}`))
      .send({ grant_type: 'client_credentials'})
      .end((err, result) => {
        if (err) {
          reject(result.body.error);
        } else {
          debugger
          resolve(result);
        }
      })
    ;
  });
}

