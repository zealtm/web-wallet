import React from "react";
import PropTypes from "prop-types";

import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import style from "./style.css";

class Dropdown extends React.Component {
	constructor(props) {
  	super(props);
    this.state = {
      listOpen: false
    }
  }

  toggleList = () => {
    console.log('open: ', !this.state.listOpen);
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  selectListItem = (value, img = undefined) => {
    const {selectItem} = this.props;

    selectItem(value, img);
    this.toggleList();
  }

  renderItems = () => {
    const {list, width} = this.props;

    const listStyle = {
      width: width ? `calc(${width} + 20px)` : '200px'
    }

    return (
      <ul className={style.list} style={listStyle}>
        <li className={style.listItem}
          onClick={() => this.selectListItem('')}
        >
          Select a coin..
        </li>
        {
          list.map((item, id) => (
            <li className={style.listItem}
              key={id}
              onClick={() => this.selectListItem(item.title, item.img)}
            >{item.img ? <img src={item.img} alt={item.title} /> : ''} {item.title}</li>
          ))
        }
      </ul>
    );
  }

  handleClick = (ev) => {
    if (!this.dropdownMenu.contains(ev.target)) {
      // If click outside, close the dropdown
      this.setState({
        ...this.state,
        listOpen: false
      });
    }
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.addEventListener('click', this.handleClick);
  }

  render() {
    const{width, title, titleImg} = this.props;
    const{listOpen} = this.state

    const wrapperStyle = {
      width: width ? width : '180px'
    }

    return(
      <div className={style.wrapper} style={wrapperStyle} ref={el => this.dropdownMenu = el}>
        <div className={style.header} onClick={() => this.toggleList()}>
          <div className={style.title}>
            {titleImg ? <img src={titleImg} alt={title} /> : ''} {title}
          </div>
          <div className={style.icon}>
            {listOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
          </div>
        </div>

        {listOpen && this.renderItems()}
      </div>
    )
  }
}

Dropdown.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  selectItem: PropTypes.func.isRequired,
  titleImg: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
}

export default Dropdown;
