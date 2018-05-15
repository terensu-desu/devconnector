import React from "react";

import Aux from "../../hoc/Aux";

const notFound = props => (
	<Aux>
		<h1 className="display-4 text-center">Page Not Found</h1>
		<p className="text-center">Sorry, this page does not exist.</p>
	</Aux>
);

export default notFound;