const ErrorType = {
    GENERAL_ERROR: {
        id: 1,
        httpCode: 600,
        message: 'A general error ....',
        isShowStackTrace: true,
    },
    USER_ALREADY_EXIST: {
        id: 2,
        httpCode: 601,
        message: 'User already exist',
        isShowStackTrace: false,
    },
    UNAUTHORIZED: {
        id: 3,
        httpCode: 401,
        message: 'Login failed, invalid user name or password',
        isShowStackTrace: false,
    },
    USER_DOES_NOT_EXIST: {
        id: 4,
        httpCode: 601,
        message: 'User Does Not Exist',
        isShowStackTrace: true,
    },
    FAILED_TO_ADD_USER: {
        id: 5,
        httpCode: 602,
        message: 'Failed to add user',
        isShowStackTrace: false,
    },
    FAILED_TO_SEND_EMAIL: {
        id: 6,
        httpCode: 603,
        message: 'Failed to send email',
        isShowStackTrace: false,
    }
};

export default ErrorType;
