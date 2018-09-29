import React from "react";
// STYLE
import style from "./style.css";
// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import { Input, InputLabel } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
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
        paddingLeft: "10px",
        width:"80%"
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
    textGreen:{
        color: '#68f285',
        width: '85%',
    },
    control:{
        width: "calc(100% - 20px)",
        
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
                    <FormControl className={classes.control}>
                        <InputLabel htmlFor="nome" className={classes.textGreen}>Name</InputLabel>
                        <Input
                            classes={{
                                root: classes.inputRoot,
                                underline: classes.inputCssUnderline,
                                input: classes.inputCss
                            }}               
                            id="nome"      
                            placeholder="Nome"       
                            fullWidth
                            inputProps={{ maxLength: 48, required: true }}
                        />
                    </FormControl>
                </div>
                <div className={style.row}>
                <FormControl className={classes.control}>
                <InputLabel htmlFor="assunto" className={classes.textGreen}>Assunto</InputLabel>
                    <Input
                        classes={{
                            root: classes.inputRoot,
                            underline: classes.inputCssUnderline,
                            input: classes.inputCss
                        }}
                        fullWidth
                        id="assunto"
                        inputProps={{ maxLength: 48, required: true }}
                    />
                    </FormControl>
                </div>
                <div className={style.contentChat}>
                    <Input
                        id="chat"
                        placeholder="Escreva aqui..."
                        multiline
                        rowsMax="10"
                        rows="1"
                        fullWidth
                        className={style.inputChat}
                    />

                </div>
            </Grid>

        );
    }
}

export default (withStyles(customStyle)(Ticket));