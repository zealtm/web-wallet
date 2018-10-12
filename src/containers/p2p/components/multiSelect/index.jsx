import React from "react";
import PropTypes from "prop-types";
// MATERIAL
import { Grid, Avatar } from "@material-ui/core/";

// STYLE
import style from "./style.css";

class MultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOpen: false
        };
    }

    toggleList = () => {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }));
    };

    selectListItem = (value = undefined, title = undefined, img = undefined) => {
        const { selectItem } = this.props;

        selectItem(value, title, img);
        this.toggleList();
    };

    renderItems = () => {
        const { list, width } = this.props;

        const listStyle = {
            width: width ? `calc(${width} + 17px)` : "170px"
        };

        return (
            <ul className={style.list} style={listStyle}>
                {list.map((item, id) => (
                    <li
                        className={style.listItem}
                        key={id}
                        onClick={() =>
                            this.selectListItem(item.value, item.title, item.img)
                        }
                    >
                        {item.img ? <img src={item.img} alt={item.title} /> : ""}{" "}
                        {item.title}
                    </li>
                ))}
            </ul>
        );
    };

    handleClick = ev => {
        if (this.selectMenu && !this.selectMenu.contains(ev.target)) {
            this.setState({
                ...this.state,
                listOpen: false
            });
        }
    };

    componentWillMount() {
        document.addEventListener("click", this.handleClick);
    }

    componentWillUnmount() {
        document.addEventListener("click", this.handleClick);
    }

    render() {
        const { width, error } = this.props;
        const { listOpen } = this.state;

        const wrapperStyle = {
            width: width ? width : "180px",
            borderBottom: `1px solid ${error ? "#f44336" : "#42227d"}`
        };

        return (
            <div
                className={style.wrapper}
                style={wrapperStyle}
                ref={el => (this.selectMenu = el)}
            >
                <div className={style.header} onClick={() => this.toggleList()}>
                    <div className={style.title}>
                        <Grid container>
                            <Grid item xs={2}>
                                <Avatar
                                    alt="avatar"
                                    src="images/icons/p2p/user.png"
                                    className={style.avatar}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Avatar
                                    alt="avatar"
                                    src="images/icons/p2p/user.png"
                                    className={style.avatar}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Avatar
                                    alt="avatar"
                                    src="images/icons/p2p/user.png"
                                    className={style.avatar}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Avatar
                                    alt="avatar"
                                    src="images/icons/p2p/user.png"
                                    className={style.avatar}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Avatar
                                    alt="avatar"
                                    src="images/icons/p2p/user.png"
                                    className={style.avatar}
                                />
                            </Grid>
                        </Grid>
                        <Grid  item xs={2}>
                        <div className={style.icon}>
                        {listOpen ? (
                            <img src="./images/icons/arrow/expand-less@2x.png" />
                        ) : (
                                <img src="./images/icons/arrow/expand-more@2x.png" />
                            )}
                    </div>
                        </Grid>
                    </div>                    
                </div>

                {listOpen && this.renderItems()}
            </div>
        );
    }
}

MultiSelect.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectItem: PropTypes.func.isRequired,
    width: PropTypes.string,
    height: PropTypes.string
};

export default MultiSelect;