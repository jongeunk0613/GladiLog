const regExp = {
    email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    notEmpty: /^(?!\s*$).+/,
};

export const email = (maybeEmail) => {
  return regExp.email.test(maybeEmail);
};

export const password = (maybePassword) => {
  return regExp.password.test(maybePassword);
};

export const password2 = (password1, password2) => {
    return password1 === password2;
}

export const notEmpty = (maybeNotEmpty) => {
  return regExp.notEmpty.test(maybeNotEmpty);
}