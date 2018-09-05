import React from "react";
import PropTypes from "prop-types";
import MaskFormat from 'react-number-format';

class InputMask extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { inputRef, onChange, ...other } = props;

    return (
      <MaskFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value,
            },
          });
        }}
      />
    );
  }
}

InputMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputMask;
