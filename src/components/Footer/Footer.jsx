import React from "react";
import "./Footer.css";

const Footer = () => {
	return (
		<footer>
			<p>
				Copyright &copy; <span>{new Date().getFullYear()}</span>{" "}
				Developed By{" "}
				<a href="https://ahmedmaher-portfolio.vercel.app/" rel="noreferrer" title="About Developer" target="_blank">Ahmed Maher</a>
			</p>
			<span>All Rights Reserved</span>
		</footer>
	);
};

export default Footer;
