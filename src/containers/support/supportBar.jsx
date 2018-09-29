import React from "react";
// STYLE
import style from "./style.css";
// MATERIAL UI
import { Grid, Hidden } from "@material-ui/core";
// COMPONENTS
import Select from "../../components/select";
import Modal from "../../components/modal";

import SemTicketModal from "./modal/semTicketModal";

class SupportBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topico: "",
            origem: "",
            sistema: "",
            isOpen: false,
            listTopicos: []
        };
        this.handleTopicos = this.handleOperadora.bind(this);
        this.handleMeusTicket = this.handleMeusTicket.bind(this);
        this.handleModal = this.handleModal.bind(this);
    }
    handleOperadora = (value, title) => {
        this.setDefaultState();
    }
    handleMeusTicket = (event) => {
        this.handleModal();
    }
    handleModal = () => this.setState({ isOpen: !this.state.isOpen });
    setDefaultState = () => {
        const values = {
            topico: "",
            origem: "",
            sistema: "",
            isOpen: false,
            listTopicos: {
                value: undefined,
                title: null,
                img: ""
            },
        };
        this.setState(values);
    }
    render() {
        const { listTopicos,isOpen } = this.state;
        return (
            <div className={style.topBar}>
                <Grid container direction="row" justify={"center"}>
                    <Grid container direction="row" justify="center" >
                        <Hidden mdUp>
                            <button className={style.buttonBorderGreen}>{'Seus Tikets'}</button>
                        </Hidden>
                        <Select
                            list={listTopicos}
                            title={'Mudar Tópico'}
                            selectItem={this.handleOperadora}
                        />
                        <Select
                            list={listTopicos}
                            className={style.textGreen}
                            title={'Origem do acesso'}
                            selectItem={this.handleOperadora}
                        />
                        <Select
                            list={listTopicos}
                            title={'Sistema Operacional'}
                            selectItem={this.handleOperadora}
                        />
                        <Hidden mdDown>
                            <button className={style.buttonBorderGreen} onClick={this.handleMeusTicket}>{'Seus Tikets'}</button>
                        </Hidden>
                    </Grid>

                </Grid>
                <Modal
                    content={<SemTicketModal />}
                    show={isOpen}
                    close={() => this.handleModal()}
                />

            </div>
        );
    }
}
export default SupportBar;