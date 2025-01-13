import React from "react";
import "./InputField.css";

const InputField = ({
	type,
	inputName,
	inputTitle,
	value,
	onChange,
	showError,
	formData,
}) => {
	// Customize error messages based on input type and value
	const customizeErrorMessage = (inputName) => {
		switch (inputName) {
            case "username":
                if (formData[inputName]) {
					return "Username must be 5-20 characters and start with a letter";
				} else {
					return `${inputTitle} is required`;
				}
            case "email":
                if (formData[inputName]) {
					return "Enter a valid email address";
				} else {
					return `${inputTitle} is required`;
				}
            case "address":
                if (formData[inputName]) {
					return "Enter a valid address / location";
				} else {
					return `${inputTitle} is required`;
				}
			case "city":
				if (formData[inputName]) {
					return "Enter a valid city name";
				} else {
					return `${inputTitle} is required`;
				}
            case "creditNumber":
                if (formData[inputName]) {
					return "Enter a valid Credit Card Number";
				} else {
					return `${inputTitle} is required`;
				}
            case "creditExpiry":
                if (formData[inputName]) {
					return "Enter a valid Date [not expired]";
				} else {
					return `${inputTitle} is required`;
				}
            default:
                return false;
        }
	}

	return (
		<fieldset className={`input-field ${showError ? "activeError" : ""}`}>
			<label htmlFor={inputName}>{inputTitle}</label>
			<input
				type={type}
				id={inputName}
				name={inputName}
				value={value}
				onChange={onChange}
				placeholder={`${inputTitle === "Expiration Date"? "YY-DD-MM" : inputTitle}...`}
			/>
			{/* Display error message if showError is true */}
			{showError && (
				<div className="invalid-input">
					<span>!</span>
					<span>{customizeErrorMessage(inputName)}</span>
				</div>
			)}
		</fieldset>
	);
};

export default InputField;
