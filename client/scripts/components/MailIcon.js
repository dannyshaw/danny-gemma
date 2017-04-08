import React from 'react';

const MailIcon = ({ rsvpEmail }) => (
    <a
      className="mail"
      href={`mailto:${rsvpEmail}`}
      onClick={e => {
        window.ga('send', {
          hitType: 'event',
          eventCategory: 'Email',
          eventAction: 'email button clicked',
          eventLabel: 'Save the date'
        });
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="envelope" viewBox="0 0 8 8">
        <path d="M0 0v1l4 2 4-2v-1h-8zm0 2v4h8v-4l-4 2-4-2z" transform="translate(0 1)" />
      </svg>
    </a>
);

export default MailIcon;
