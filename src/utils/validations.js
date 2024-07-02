import { parsePhoneNumberFromString, parsePhoneNumber } from 'libphonenumber-js';
import isEmpty from 'lodash/isEmpty';
import { CLAUSE } from '~src/constants/displayTexts';

export const copy = data => JSON.parse(JSON.stringify(data));

export const isVerifyingEmail = nonFieldErrors =>
    nonFieldErrors === CLAUSE.VERIFICATION_EMAIL_SENT ||
    (nonFieldErrors?.length && nonFieldErrors[0] === CLAUSE.EMAIL_NOT_VERIFIED);

export const isValidEmail = email => {
    // eslint-disable-next-line max-len
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
export const IsValidPhoneNumber = phoneNo => {
    const pattern = '^\\+\\(?([0-9]{1,3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$';
    const condition = new RegExp(pattern, 'g');
    return condition.test(phoneNo);
};

export const hasUpperLowerCase = pass => /^(?=.*[A-Z]).*$/.test(pass);

export const hasSpecialCharacter = pass => /^(?=.*[!@#$%^&+=]).*$/.test(pass);

export const hasEightOrMoreDigits = pass => pass ? pass.length >= 8 : false;

export const IsNumericNumber = pass => /^(?=.*[0-9]).*$/.test(pass);

export const isAbsoluteUrl = url =>
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(url);

export const parseError = error => {
    if (typeof error === 'string') return [error];
    if (Array.isArray(error)) return error;

    if (typeof error === 'object' && !isEmpty(error)) {
        const errors = {};
        Object.keys(error).forEach(key => {
            errors[key] = Array.isArray(error[key]) ? error[key][0] : error[key];
        });
        return errors;
    }

    const defaultErrorText = ['Something went wrong, please try again later.'];

    if (!error.response) return defaultErrorText;
    let errors = error.response.data.non_field_errors;
    if (error.response.data.detail) {
        errors = error.response.data.detail;
    }

    if (!errors) {
        return defaultErrorText;
    }
    if (typeof errors === 'string') {
        return [errors];
    }
    if (Array.isArray(errors)) return errors;

    return defaultErrorText;
};

export const initCapital = str => str
    .toLowerCase()
    .replace(/(?:^|\s)[a-z]/g, m => m.toUpperCase());

export const convertTextToUpperCase = str => str.toUpperCase();

export const parsePhone = contact => {
    const phoneNumber = parsePhoneNumberFromString(contact);
    return phoneNumber;

};

export const validateNumber = (contact, cca2) => {
    try {
        return parsePhoneNumber(contact, cca2).isValid();
    } catch (ex) {
        return false;
    }
};

export const ValidateName = input => {
    const Regx = /^([\S]+)([a-zA-Z\s.]+)*$/;
    return Regx.test(input);
};
