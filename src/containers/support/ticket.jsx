import React from "react";
// STYLE
import style from "./style.css";
// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import { Input, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import colors from "../../components/bases/colors";


const customStyle = {
    inputRoot: {
        color: colors.messages.info,
        margin: "0.5rem 0",
        padding: "5px",
        width: "calc(100% - 20px)",
        "&:hover:before": {
            borderBottomColor: colors.purple.dark
        }
    },
    inputCss: {
        color: colors.messages.info,
        fontFamily: "Noto Sans, sans-serif",
        fontSize: "14px",
        letterSpacing: "0.5px",
        textAlign: "left",
        paddingLeft: "10px"
    },
    inputCssCenter: {
        fontFamily: "Noto Sans, sans-serif",
        fontSize: "16px",
        letterSpacing: "0.5px",
        textAlign: "center"
    },
    inputCssUnderline: {
        "&:before, &:after": {
            borderBottomColor: colors.purple.dark
        },
        "&:hover:not($disabled):not($error):not($focused):before": {
            borderBottomColor: `${colors.purple.dark} !important`
        }
    },
    inputCssUnderlineDisabled: {
        "&:before, &:after": {
            display: "none"
        }
    },
    disabled: {},
    error: {},
    focused: {}
};
class Ticket extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <Grid item xs={12} container>
                <div className={style.row}>
                    <Input
                        classes={{
                            root: classes.inputRoot,
                            underline: classes.inputCssUnderline,
                            input: classes.inputCss
                        }}
                        placeholder="Nome"
                        inputProps={{ maxLength: 48, required: true }}
                    />
                </div>
                <div className={style.row}>
                    <Input
                        classes={{
                            root: classes.inputRoot,
                            underline: classes.inputCssUnderline,
                            input: classes.inputCss
                        }}
                        placeholder="Assunto"
                        inputProps={{ maxLength: 48, required: true }}
                    />
                </div>
                <div>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Multiline"
                        multiline
                        rowsMax="20"
                        className={style.contentChat}
                        margin="normal"
                    />
                </div>
            </Grid>

        );
    }
}

export default (withStyles(customStyle)(Ticket));