import React from "react";
import PropTypes from "prop-types";

// REDUX
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { successRequest } from "../../../errors/redux/errorAction";

// MATERIAL UI
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "./style.css";

class ItemInvite extends React.Component {
  constructor(props) {
    super(props);
  }
  copyAddress = (address) => {
    let { successRequest } = this.props;
    const element = document.createElement("textarea");
    element.value = address;
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
    successRequest(i18n.t("MODAL_RECEIVE_MESSAGE"));
  };

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={5} sm={5}>
            <div>
              <span className={style.spanTitle}>E-mail</span> <br />
              <p className={style.spanSub}>email@email.com</p>
            </div>
          </Grid>
          <Grid item xs={5} sm={5}>
            <span className={style.spanTitle}>Cupom</span> <br />
            <p className={style.spanSub}>
              f5234s3f5v4sd3fg54v3df5g43d5fg43dsf53543
            </p>
          </Grid>
          <Grid item xs={2} sm={2}>
            <img
              onClick = {() => this.copyAddress('f5234s3f5v4sd3fg54v3df5g43d5fg43dsf53543')}
              className={style.imgCopy}
              src="/images/icons/modal-receive/ic_copy@1x.png"
            />
          </Grid>
          <Grid item xs={6} sm={6} id={"hr"}>
            <hr />
          </Grid>
        </Grid>
      </div>
    );
  }
}

ItemInvite.propTypes = {
  successRequest: PropTypes.func
};
const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ successRequest }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (ItemInvite);
