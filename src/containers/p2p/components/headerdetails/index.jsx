import React from "react";
import PropTypes from "prop-types";
// REDUX 
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// MATERIAL UI
import { Grid } from "@material-ui/core";

// COMPONENTS 
import Select from "../../../../components/select";

// STYLE
import style from "./style.css";

class HeaderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Lunes",
            img: "images/icons/coins/lunes.png",
            coinsExample: [
                {
                    img: "images/icons/coins/lunes.png",
                    title: "Lunes"
                },
                {
                    img: "images/icons/coins/lunes.png",
                    title: "Lunes"
                },
                {
                    img: "images/icons/coins/lunes.png",
                    title: "Lunes"
                },
            ],
        };
    }
    coinSelected = (value, title, img = undefined) => {
        this.setState({
            ...this.state,
            coin: {
                name: title,
                value,
                img
            }
        });
    };

    render() {
        const { title, img, coinsExample } = this.state;

        return (
            <div className={style.topBar} >
                <div className={style.header}>
                    <Grid container>
                        <Grid item xs={6}>
                            <div className={style.formGroup}>
                                <div className={style.textSmall}>Compra</div>
                                <div className={style.listItemCoin}>
                                    <img src={img} alt={title} />{title}
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={style.formGroup}>
                                <div className={style.textSmall}>Pagamento</div>
                                <Select
                                    list={coinsExample}
                                    title={title}
                                    titleImg={img}
                                    selectItem={this.coinSelected}
                                    error={null}
                                    width={"100%"}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <input type="text" placeholder="DESCRIÇÃO" className={style.inputDefault} />
                        </Grid>
                        <Grid item xs={12}>
                            <input type="text" placeholder="aksdlasd6asd5asd5" className={style.inputCenter} />
                        </Grid>
                        <Grid item xs={6}>
                            <button className={style.btBuy}>Vender</button>
                        </Grid>

                        <Grid item xs={6}>
                            <button className={style.btEscroow}>Escroow</button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
HeaderDetails.propTypes = {
}
const mapStateToProps = store => ({

});
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {}, dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(HeaderDetails);