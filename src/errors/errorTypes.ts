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
        message: 'Unauthorized user',
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
    },
    MISSING_PARAMETERS: {
        id: 7,
        httpCode: 604,
        message: 'Missing one or more parameters',
        isShowStackTrace: false,
    },
    INVALID_PARAMETERS: {
        id: 8,
        httpCode: 605,
        message: 'Invalid Parameters',
        isShowStackTrace: false,
    },
    TOKEN_EXPIRED: {
        id: 9,
        httpCode: 402,
        message: 'Token expired',
        isShowStackTrace: false,
    }
};

export default ErrorType;
