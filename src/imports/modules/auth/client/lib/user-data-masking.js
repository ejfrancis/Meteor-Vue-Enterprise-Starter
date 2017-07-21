const maskEmailAddress = (email) => {
  if (!email) {
    return 'your email address';
  }
  let maskedEmail = '';
  const indexOfAt = email.indexOf('@');
  for (let i = 0; i < email.length; i++) {
    // always show @
    if (email[i] === '@') {
      maskedEmail += '@';
      continue;
    }
    // show first two letters of username
    if (i < 2) {
      maskedEmail += email[i];
      continue;
    }
    if (i >= 2 && i < indexOfAt) {
      maskedEmail += '*';
      continue;
    }
    // show first two letterse of domain
    if (i > indexOfAt && i < indexOfAt + 2) {
      maskedEmail += email[i];
      continue;
    }
    if (i > indexOfAt + 2 && i < email.length - 2) {
      maskedEmail += '*';
      continue;
    }
    // show last two letters of domain
    if (i >= email.length - 2) {
      maskedEmail += email[i];
      continue;
    }
    maskedEmail += email[i];
  }
  return maskedEmail;
};

export {
  maskEmailAddress
};
