// MATERIAL
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
// import colors from "./bases/colors";

const customLinearIndeterminate = {
    root: {
      backgroundColor: 'red'
    },
};

const CustomLinearIndeterminate = withStyles(customLinearIndeterminate)(LinearProgress);
export default CustomLinearIndeterminate;