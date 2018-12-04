import i18n from "./../../../utils/i18n"

export const getChatBundle = (data = {}) => {
  try {
    let { componentId, namespace, adId, adOwnerId, buyerId } = data
    let bundlesWrapperEL = document.querySelector('.bundlesWrapper')
    let bundleEL = document.createElement('script')
    namespace = namespace || 'p2p'
    componentId = componentId || 'chatTarget'
    adId = adId || (() => { throw new Error("adId is not defined") })()
    adOwnerId = adOwnerId || (() => { throw new Error("adOwnerId is not defined") })()
    buyerId = buyerId || (() => { throw new Error("buyerId is not defined") })()
    bundleEL.src = `http://localhost:6005/serve/chat?root=${componentId}&namespace=${namespace}&adId=${adId}&adOwnerId=${adOwnerId}&buyerId=${buyerId}`
    bundleEL.type = "text/javascript"
    bundlesWrapperEL.appendChild(bundleEL)
  } catch (err) {
    console.error(err)
    window.store.dispatch({type:"REQUEST_FAILED",message: i18n.t("P2P_CHAT_FAILED_TO_OPEN")})
  }
}
