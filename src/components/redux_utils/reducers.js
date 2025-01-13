// Stepper Data and Validators:
const validators_initialState = { 
    accountInfo: {formData: {username: "", email: ""}, isValid: false}, 
    personalDetails: {formData: {address: "", city: ""}, isValid: false}, 
    paymentInfo: {formData: {creditNumber: "", creditExpiry: ""}, isValid: false}, 
};

export const stepperReducer = (state = validators_initialState, action) => {
	switch (action.type) {
		case "ACCOUNT_INFO":
			return { ...state, accountInfo: action.payload };
        case "PERSONAL_DETAILS":
			return { ...state, personalDetails: action.payload };
        case "PAYMENT_INFO":
			return { ...state, paymentInfo: action.payload };
		default:
			return state;
	}
};
