import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validateInput from "./validateInput";
import { set_PersonalDetails } from "../redux_utils/actions";
import InputField from "./Input_Field/InputField";

const PersonalDetails = () => {
	// Redux state for pre-filled data
	const personalDetails = useSelector(state => state.personalDetails);
	const dispatch = useDispatch();

	// Component state for form data, validation, and errors
	const [formData, setFormData] = useState({ address: personalDetails.formData.address || "", city: personalDetails.formData.city || "" });
	const [validInputs, setValidInputs] = useState({
		address: false,
		city: false,
	});
	const [errors, setErrors] = useState({ address: false, city: false });

	// Handle input changes, validate, and update state
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const isValid = validateInput(name, value.trim());
		setFormData((prev) => ({ ...prev, [name]: value.trim() }));
		setValidInputs((prev) => ({ ...prev, [name]: isValid }));
		setErrors((prev) => ({ ...prev, [name]: !isValid }));
	};

	// Update Redux store whenever form data or validation changes
	useEffect(() => {
		const isValid = validInputs.address && validInputs.city;
		dispatch(set_PersonalDetails({ formData: formData, isValid: isValid }));
	}, [formData, validInputs, dispatch])

	// Input configuration for rendering dynamically
	const inputsData = [
		{
			type: "text",
			inputName: "address",
			inputTitle: "Address",
			value: formData.address,
		},
		{
			type: "text",
			inputName: "city",
			inputTitle: "City",
			value: formData.city,
		},
	];
	return <form aria-labelledby="personal-details-title">
		{inputsData.map((input, i) => (
				<InputField
					key={i}
					type={input.type}
					inputName={input.inputName}
					inputTitle={input.inputTitle}
					value={input.value}
					onChange={handleInputChange}
					showError={errors[input.inputName]}
					formData={formData}
				/>
			))}
	</form>;;
};

export default PersonalDetails;
