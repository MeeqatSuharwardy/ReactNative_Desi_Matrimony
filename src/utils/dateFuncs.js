/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

export const getDateInUTCWithoutHours
    = date =>
        new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));

export const convertDateToUTC
    = date =>
        new Date(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds()
        );

export const getDateInUTC
    = date => {
        const now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
            date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        return new Date(now_utc);
    };

export const convertDateToString
    = date => {
        const _date = `${`0${date.getDate()}`.slice(-2)}-${`0${date.getMonth() + 1}`.slice(-2)}-${date.getFullYear()}`;
        return _date;
    };

export const convertDateTimeToString
    = date => {
        const _date = `
    ${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)} 
    ${`0${date.getHours()}`.slice(-2)}:${`0${date.getMinutes()}`.slice(-2)}
    `;
        return _date;
    };

export const convertTimeToString = date => {
    const _date = `${`0${date.getHours()}`.slice(-2)}:${`0${date.getMinutes()}`.slice(-2)}`;
    return _date;
};


export const convertDateToStringEuropeanFormat = date => {
    const _date = `${`0${date.getDate()}`.slice(-2)}/${`0${date.getMonth() + 1}`.slice(-2)}/${date.getFullYear()}`;
    return _date;
};



export const convertTimeToStringEuropeanFormat = date => {
    // eslint-disable-next-line max-len
    // const _date = `${`0${date.getHours()}`.slice(-2)}:${`0${date.getMinutes()}`.slice(-2)}:${`0${date.getSeconds()}`.slice(-2)}`;
    // eslint-disable-next-line max-len
    const _date = `${`0${date.getHours()}`.slice(-2)}:${`0${date.getMinutes()}`.slice(-2)}`;
    return _date;
};

export const convertIsoStringToDate = isoString => {

    // Split the string into an array based on the digit groups.
    const dateParts = isoString.split(/\D+/);

    // Set up a date object with the current time.
    const returnDate = new Date();

    // Manually parse the parts of the string and set each part for the
    // date. Note: Using the UTC versions of these functions is necessary
    // because we're manually adjusting for time zones stored in the
    // string.
    returnDate.setUTCFullYear(parseInt(dateParts[0], 10));

    // The month numbers are one "off" from what normal humans would expect
    // because January == 0.
    returnDate.setUTCMonth(parseInt(dateParts[1] - 1, 10));
    returnDate.setUTCDate(parseInt(dateParts[2], 10));

    // Set the time parts of the date object.
    returnDate.setUTCHours(parseInt(dateParts[3], 10));
    returnDate.setUTCMinutes(parseInt(dateParts[4], 10));
    returnDate.setUTCSeconds(parseInt(dateParts[5], 10));
    returnDate.setUTCMilliseconds(parseInt(dateParts[6], 10));

    // Track the number of hours we need to adjust the date by based
    // on the timezone.
    let timezoneOffsetHours = 0;

    // If there's a value for either the hours or minutes offset.
    if (dateParts[7] || dateParts[8]) {

        // Track the number of minutes we need to adjust the date by
        // based on the timezone.
        let timezoneOffsetMinutes = 0;

        // If there's a value for the minutes offset.
        if (dateParts[8]) {

            // Convert the minutes value into an hours value.
            timezoneOffsetMinutes = parseInt(dateParts[8], 10) / 60;
        }

        // Add the hours and minutes values to get the total offset in
        // hours.
        timezoneOffsetHours = parseInt(dateParts[7], 10) + timezoneOffsetMinutes;

        // If the sign for the timezone is a plus to indicate the
        // timezone is ahead of UTC time.
        if (isoString.substr(-6, 1) === '+') {

            // Make the offset negative since the hours will need to be
            // subtracted from the date.
            timezoneOffsetHours *= -1;
        }
    }

    // Get the current hours for the date and add the offset to get the
    // correct time adjusted for timezone.
    returnDate.setHours(returnDate.getHours() + timezoneOffsetHours);

    // Return the Date object calculated from the string.
    return returnDate;
};

export const getAge = dateString => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

export const getTimeDifferenceInSeconds
    = (startDate = new Date(), endDate = new Date()) => {
        const seconds = (endDate.getTime() - startDate.getTime()) / 1000;
        return seconds;
    };

export const getGreetingTextFromTime = () => {
    const today = new Date();
    const curHr = today.getHours();
    let greetingText = '';
    if (curHr < 12) {
        greetingText = 'Good Morning';
    } else if (curHr < 18) {
        greetingText = 'Good Afternoon';
    } else {
        greetingText = 'Good Evening';
    }
    return greetingText;
};
