import { useState } from "react";
import "./Stepper.css";
import AccountInfo from "../components/Form_Steps_Pages/AccountInfo";
import PersonalDetails from "../components/Form_Steps_Pages/PersonalDetails";
import Payment from "../components/Form_Steps_Pages/Payment";
import Complete from "../components/Form_Steps_Pages/Complete";
import NavigationBtns from "../components/Navigation_Buttons/NavigationBtns";
import PagesNumbers from "../components/Pages_Numbers/PagesNumbers";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
	set_AccountInfo,
	set_Payment,
	set_PersonalDetails,
} from "../components/redux_utils/actions";

// Steps data with components
const steps = [
	{ name: "Account Information", content: <AccountInfo /> },
	{ name: "Personal Details", content: <PersonalDetails /> },
	{ name: "Payment", content: <Payment /> },
	{ name: "Complete", content: <Complete /> },
];

function Stepper() {
	// State for step navigation and registration status
	const [registered, setRegistered] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	// Redux state and dispatch
	const accountInfo = useSelector((state) => state.accountInfo);
	const personalDetails = useSelector((state) => state.personalDetails);
	const paymentInfo = useSelector((state) => state.paymentInfo);
	const dispatch = useDispatch();

	// Validate all steps
	const checkStepsValidation = () => {
		const areStepsValid =
			accountInfo.isValid && personalDetails.isValid && paymentInfo.isValid;
		return areStepsValid;
	};

	// Validate current step
	const validateCurrentStep = () => {
		if (activeStep === 0) {
			return accountInfo.isValid;
		} else if (activeStep === 1) {
			return personalDetails.isValid;
		} else if (activeStep === 2) {
			return paymentInfo.isValid;
		}
		return true; // For "Complete" step
	};

	// Navigate to the next step
	const handleNext = () => {
		if (validateCurrentStep()) {
			if (activeStep < steps.length - 1) {
				setActiveStep((prev) => prev + 1);
			} else {
				// Final validation for all steps
				const areStepsValid = checkStepsValidation();
				if (areStepsValid) {
					Swal.fire({
						title: "Success!",
						text: "Your response sent successfully!",
						icon: "success",
					}).then(() => {
						setRegistered(true);
						console.log(
							"Registered Data\n",
							accountInfo,
							personalDetails,
							paymentInfo
						);
						// Reset form data
						dispatch(
							set_AccountInfo({
								formData: { username: "", email: "" },
								isValid: false,
							})
						);
						dispatch(
							set_PersonalDetails({
								formData: { address: "", city: "" },
								isValid: false,
							})
						);
						dispatch(
							set_Payment({
								formData: { creditNumber: "", creditExpiry: "" },
								isValid: false,
							})
						);
					});
				} else {
					Swal.fire({
						title: "Something went wrong!",
						text: "You need to fill all Input Fields before submitting!",
						icon: "error",
					});
				}
			}
		} else {
			Swal.fire({
				title: "Validation Error!",
				text: "Please complete this step before proceeding.",
				icon: "error",
			});
		}
	};

	// Navigate to the previous step
	const handlePrevious = () =>
		setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));

	return registered ? (
		<section className="registered">
			<p>Thank You For Registering</p>
			<button
				type="button"
				onClick={() => {
					setRegistered(false);
					setActiveStep(0);
				}}
			>
				Register Again
			</button>
		</section>
	) : (
		<div className="Stepper-Page">
			{/* step numbers */}
			<PagesNumbers steps={steps} activeStep={activeStep} />

			{/* active step content */}
			<main>{steps[activeStep].content}</main>

			{/* Render navigation buttons */}
			<NavigationBtns
				activeStep={activeStep}
				lastStep={activeStep >= steps.length - 1}
				handlePrevious={handlePrevious}
				handleNext={handleNext}
			/>
		</div>
	);
}

export default Stepper;
