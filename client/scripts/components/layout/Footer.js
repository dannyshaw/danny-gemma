import React from 'react';

const Footer = ({ attendee, rsvpEmail }) => {
  const string = attendee
    ? `save the date, ${attendee.name.first.toLowerCase()}!`
    : `save the date!`
  ;
  return (
    <div className="panel footer">
      <MailIcon rsvpEmail={rsvpEmail} />
    </div>
  );
};

export default Footer;
