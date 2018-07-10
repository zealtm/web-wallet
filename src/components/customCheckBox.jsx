// MATERIAL
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

const checkBoxStyles = {
  root: {
    color: "#f2f2f2",
    "&$checked": {
      color: "#4CD566"
    }
  },
  checked: {}
};

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);
export default CustomCheckbox;
