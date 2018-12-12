import React from 'react'
import PropTypes from 'prop-types'
import style from './style.css'

//UTILS
import i18n from "./../../../utils/i18n.js"
import { convertISO8601 } from "./../../../utils/numbers.js"

//REDUX
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { chatDetailsSetter } from "./../redux/p2pAction"

//FUNCTIONS
import { getChatBundle } from "./functions"

class Rooms extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  loading = (loading) => this.setState({loading})

  handleJoinRoom = (room) => {
    this.loading(true)

    const { chatDetailsSetter, chatDetails } = this.props
    chatDetailsSetter({
      buyer: {
        id: room.userId,
        name: room.title
      },
      currentRoom: room.roomHashId
    })
    let { seller, currentOrder } = chatDetails
    let { id: adOwnerId } = seller
    let { id: adId } = currentOrder
    getChatBundle({adOwnerId, buyerId: room.userId, adId})
  }

  loadRender = () => {
    return <p className={style.defaultWhiteText}>{i18n.t("P2P_CHAT_ROOM_LOADING")}</p>
  }

  emptyRender = () => {
    return <p className={style.defaultWhiteText}>{i18n.t("P2P_CHAT_NOBODY_WAS_INSTERESTED_YET")}</p>
  }
  render() {
    let { rooms } = this.props
    let lastMessage;

    if (this.state.loading) return this.loadRender()
    if (!rooms || (rooms && rooms.length < 1)) return this.emptyRender()

    return(
      <div className={style.roomsWrapper}>
        {rooms.map((room, key) => {
          lastMessage = convertISO8601(room.lastMessage)
          lastMessage = lastMessage ? lastMessage.hour : '??:??'
          return (
            <div className={style.room} key={key} onClick={() => { this.handleJoinRoom(room) }}>
              <div className={style.imageWrapper}>
                <img src={room.profilePicture || room.photo || "images/lunio/lunio-user@100x100.jpg"}/>
              </div>
              <div className={style.messageWrapper}>
                <div className={style.name}>{room.name}</div>
                <div className={style.message}>{i18n.t("P2P_CHAT_STATIC_BUYER_MESSAGE")}</div>
              </div>
              <div className={style.timeWrapper}>
                <div className={style.time}>{lastMessage}</div>
              </div>
            </div>
            )
        })}
      </div>
    )
  }
}

Rooms.propTypes = {
  rooms: PropTypes.array.isRequired,
  chatDetailsSetter: PropTypes.func.isRequired,
  chatDetails: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  chatDetails: state.p2p.chatDetails
})
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    chatDetailsSetter
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Rooms)
