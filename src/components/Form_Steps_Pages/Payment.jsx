import React, { useEffect, useState } from "react";
import InputField from "./Input_Field/InputField";
import { useDispatch, useSelector } from "react-redux";
import validateInput from "./validateInput";
import { set_Payment } from "../redux_utils/actions";

const Payment = () => {
	const paymentInfo = useSelector(state => state.paymentInfo)
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({ creditNumber: paymentInfo.formData.creditNumber || "", creditExpiry: paymentInfo.formData.creditExpiry || "" });
	const [validInputs, setValidInputs] = useState({
		creditNumber: validateInput("creditNumber", paymentInfo.formData.creditNumber) || false,
		creditExpiry: validateInput("creditExpiry", paymentInfo.formData.creditExpiry) || false,
	});
	// const [formSubmitLoading, setFormSubmitLoading] = useState(false);
	const [errors, setErrors] = useState({ creditNumber: false, creditExpiry: false });

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const isValid = validateInput(name, value.trim());
		setFormData((prev) => ({ ...prev, [name]: value.trim() }));
		setValidInputs((prev) => ({ ...prev, [name]: isValid }));
		setErrors((prev) => ({ ...prev, [name]: !isValid }));
		
		
	};

	useEffect(() => {
		dispatch(set_Payment({formData: formData, isValid: validInputs.creditNumber && validInputs.creditExpiry}))
	}, [formData, validInputs, dispatch])

	const inputsData = [
		{
			type: "text",
			inputName: "creditNumber",
			inputTitle: "Credit Number",
			value: formData.creditNumber,
		},
		{
			type: "date",
			inputName: "creditExpiry",
			inputTitle: "Expiration Date",
			value: formData.creditExpiry,
		},
	];

	return <form>
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
</form>;
};

export default Payment;
