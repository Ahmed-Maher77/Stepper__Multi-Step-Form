import React, { useEffect, useState } from "react";
import InputField from "./Input_Field/InputField";
import validateInput from "./validateInput.js";
import { useDispatch, useSelector } from "react-redux";
import { set_AccountInfo } from "../redux_utils/actions.js";

const AccountInfo = () => {
	// Get account info from Redux store
	const accountInfo = useSelector(state => state.accountInfo)
	const dispatch = useDispatch();

	// Initialize state for form data, validation, and errors
	const [formData, setFormData] = useState({ username: accountInfo.formData.username || "", email: accountInfo.formData.email || "" });
	const [validInputs, setValidInputs] = useState({
		username: validateInput("username", accountInfo.formData.username) || false,
		email: validateInput("email", accountInfo.formData.email) || false,
	});
	const [errors, setErrors] = useState({ username: false, email: false });

	// Update state and validation on input change
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const isValid = validateInput(name, value.trim());
		setFormData((prev) => ({ ...prev, [name]: value.trim() }));
		setValidInputs((prev) => ({ ...prev, [name]: isValid }));
		setErrors((prev) => ({ ...prev, [name]: !isValid }));
	};

	// Update Redux store with form data and validation state
	useEffect(() => {
		dispatch(set_AccountInfo({formData: formData, isValid: validInputs.username && validInputs.email}))
	}, [formData, validInputs, dispatch])

	// Input field configuration
	const AccountInfo_Inputs = [
		{
			type: "text",
			inputName: "username",
			inputTitle: "Username",
			value: formData.username,
		},
		{
			type: "email",
			inputName: "email",
			inputTitle: "Email",
			value: formData.email,
		},
	];

	return (
		<form id="AccountInfo-form" aria-labelledby="account-information-title">
			{AccountInfo_Inputs.map((inputData, i) => (
				<InputField
					key={i}
					type={inputData.type}
					inputName={inputData.inputName}
					inputTitle={inputData.inputTitle}
					value={inputData.value}
					onChange={handleInputChange}
					showError={errors[inputData.inputName]}
					formData={formData}
				/>
			))}
		</form>
	);
};

export default AccountInfo;
