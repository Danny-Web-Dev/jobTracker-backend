export const DB_TABLES = {
    APPLICATION_CARDS: 'application_cards',
    EMAIL_VALIDATION_SHORT_CODES: 'email_validation_short_codes',
    STEPS: 'steps',
    USERS: 'users',
}

export const DB_COLUMNS = {
    GENERAL : {
        ID: 'id',
        NAME: 'name',
        EMAIL: 'email',
        PASSWORD: 'password',
        CREATION_DATE: 'creation_date',
        IS_ACTIVE: 'is_active',
        USER_ID: 'user_id',
    },
    APPLICATION_CARDS: {
        IS_EMAIL_VALIDATED: 'is_email_validated',
    },
    EMAIL_VALIDATION_SHORT_CODES: {
        SHORT_CODE: 'short_code'
    }
} as const;

export const DATE_FORMATS = {
    ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
    ISO_DATE: "yyyy-MM-dd",
    ISO_TIME: "HH:mm:ss",
    FULL_DATE_TIME: "EEEE, MMMM d, yyyy h:mm a",
    COMPACT_DATE_TIME: "yyyyMMdd_HHmmss",
    SQL_DATETIME: "yyyy-MM-dd HH:mm:ss",
    SQL_DATE: "yyyy-MM-dd",
    SQL_TIME: "HH:mm:ss",
    US_DATE: "MM/dd/yyyy",
    EU_DATE: "dd/MM/yyyy",
    FILE_SAFE_DATE: "yyyy-MM-dd_HH-mm-ss",
    SHORT_DATE: "MM/dd/yy",
    SHORT_TIME: "h:mm a",
    RFC_2822: "EEE, dd MMM yyyy HH:mm:ss xx",
    TIMESTAMP: "T",
};