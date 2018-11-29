export const getChatBundle = (data = {}) => {
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
}
