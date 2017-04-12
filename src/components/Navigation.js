import React from 'react';
import { Link } from 'react-router';

const Navigation = ({ className, buttonClassName }) => (
	<nav className={className}>
		<Link className={buttonClassName} to="/">Home</Link>
	</nav>
);

Navigation.defaultProps = {
	className: '',
	buttonClassName: 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect'
};

export default Navigation;