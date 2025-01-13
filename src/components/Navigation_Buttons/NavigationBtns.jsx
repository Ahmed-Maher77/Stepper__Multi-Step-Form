import React from "react";
import "./NavigationBtns.css"

const NavigationBtns = ({ activeStep, lastStep, handlePrevious, handleNext }) => {
	return (
		<div className="Navigation-Btns">
			{/* Previous Button */}
			<button className="prev-btn" type="button" onClick={handlePrevious} disabled={activeStep === 0}>Previous</button>
			{/* Next/Finish Button */}
			<button className="next-btn" type="button" onClick={handleNext}>{lastStep? "Finish" : "Next"}</button>
		</div>
	);
};

export default NavigationBtns;
