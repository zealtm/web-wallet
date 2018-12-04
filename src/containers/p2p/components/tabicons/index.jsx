import React from "react";
import PropTypes from "prop-types";

// STYLE
import style from "./style.css";

class TabIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    };
  }

  handleIcon = key => {
    const { handle } = this.props;
    this.setState({
      active: key
    });
    handle(key);
  };

  render() {
    const { content } = this.props;
    const { active } = this.state;

    return (
      <div className={style.baseTab}>
        {content.map((val, key) => {
          let open;
          let icon_img;
          if( key == active) {

           open = style.itemTabActive;
            icon_img = val;
            
          } else{
           open = style.itemTab;
           icon_img = val + "-purple";
          }

          return (
            <div
              key={key}
              onClick={() => this.handleIcon(key)}
              className={open}
            >
              <img src={`images/icons/p2p/${icon_img}.png`} />
            </div>
          );
        })}
      </div>
    );
  }
}

TabIcons.propTypes = {
  content: PropTypes.array.isRequired,
  handle: PropTypes.func.isRequired
};

export default TabIcons;
