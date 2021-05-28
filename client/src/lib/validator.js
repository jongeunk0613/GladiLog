const regExp = {
    email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i, // must contain @ and . 
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, // letters, numbers, special characters, min length 8
    notEmpty: /^(?!\s*$).+/,  // No empty or whitespace
};

export const isEmail = (maybeEmail) => {
  return regExp.email.test(maybeEmail);
};

export const isPassword = (maybePassword) => {
  return regExp.password.test(maybePassword);
};

export const isCheckPassword = (password1, password2) => {
    return password1 === password2;
}

export const isNotEmpty = (maybeNotEmpty) => {
  return regExp.notEmpty.test(maybeNotEmpty);
}