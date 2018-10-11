export const openChat = iduser => ({
  type: "OPEN_CHAT_P2P",
  iduser
});


export const closeChat = () => ({
  type: "CLOSE_CHAT_P2P"
});