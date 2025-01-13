const validateInput = (type, value) => {
    let isValid = false;
    switch (type) {
        case "username":
            // Validate username: 5-20 characters, starts with a letter
            if (/^[A-Za-z][A-Za-z0-9_]{4,19}$/.test(value)) {
                isValid = true;
            }
            break;
        case "email":
            // Validate email format
            if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
                isValid = true;
            }
            break;
        case "address":
            // Validate address: 5-200 characters
            if (/^[A-Za-z0-9À-ÖØ-öø-ÿ\s.,'-]{5,200}$/.test(value)) {
                isValid = true;
            }
            break;
        case "city":
            // Validate city name: 2-100 characters
            if (/^[A-Za-zÀ-ÖØ-öø-ÿ\s_,-]{2,100}$/.test(value)) {
                isValid = true;
            }
            break;
        case "creditNumber":
            // Validate credit card number (13-19 digits)
            if (/^\d{13,19}$|^(?:\d{4}[-\s]?){3}\d{4}$/.test(value)) {
                isValid = true;
            }
            break;
        case "creditExpiry":
            // Validate expiration date: future date in YYYY-MM-DD format
            if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                const today = new Date();
                const enteredDate = new Date(value);
                if (enteredDate > today) {
                    isValid = true;
                }
            }
            break;
        default:
            console.error("Unexpected input type");
    }
    return isValid;
};


export default validateInput;