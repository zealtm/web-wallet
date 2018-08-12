import React from "react";
import { Link } from "react-router-dom";

//MATERIAL UI
import Avatar from "@material-ui/core/Avatar";

//STYLE
import style from "./style.css";

class UserControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openBox: false,
      avatar: "images/icons/lunio/lunio-user@100x100.jpg"
    };
  }

  handleClick = () => {
    this.setState({ ...this.state, openBox: !this.state.openBox });
  };

  renderPopup = () => {
    const { openBox } = this.state;

    if (openBox) {
      setTimeout(() => {
        this.setState({ ...this.state, openBox: false });
      }, 10000);

      return (
        <div className={style.menuUser}>
          <div className={style.arrowUp} />
          <Link to="/" className={style.linkPopMenu}>
            <div className={style.boxIcon}>
              <img src="../../images/icons/settings/settings.png" />
            </div>
            Configurações
          </Link>
          <Link to="/" className={style.linkPopMenu}>
            <div className={style.boxIcon}>
              <img src="../../images/icons/question/question.png" />
            </div>
            Ajuda
          </Link>
          <Link to="/" className={style.linkPopMenu}>
            <div className={style.boxIcon}>
              <img src="../../images/icons/exit/exit.png" />
            </div>
            Sair
          </Link>
        </div>
      );
    }
  };

  render() {
    const { avatar } = this.state;

    return (
      <div>
        <Avatar
          alt="Avatar"
          src={avatar}
          className={style.avatarHeader}
          onClick={this.handleClick}
        />

        {this.renderPopup()}
      </div>
    );
  }
}

export default UserControl;
