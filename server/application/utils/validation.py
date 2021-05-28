import re
from .serverMessage import serverMessage

regex = {
    "email": "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$",
    "password": "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$", 
    "notEmpty": "^(?!\s*$).+"
}

# [email, username, password, password2]
def isValid(toValidate):
    email, username, password, password2 = toValidate
    if not re.match(regex["email"], email):
        return False, serverMessage["emailNotValid"]
    if not re.match(regex["notEmpty"], username):
        return False, serverMessage["usernameNotValid"]
    if not re.match(regex["password"], password):
        return False, serverMessage["passwordNotValid"]
    if not password == password2:
        return False, serverMessage["password2NotValid"]
    return True, ""
