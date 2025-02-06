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