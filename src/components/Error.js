import React from "react";
import PropTypes from "prop-types";

function Error({ msn }) {
	return <p className="my-3 p-4 text-center alert alert-danger">{msn}</p>;
}

Error.propTypes = {
	msn: PropTypes.string.isRequired,
};

export default Error;
