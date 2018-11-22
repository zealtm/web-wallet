export const getChatBundle = (data = {}) => {
  let { componentId, namespace, adId, adOwnerId, buyerId } = data
  let bundlesWrapperEL = document.querySelector('.bundlesWrapper')
  let bundleEL = document.createElement('script')
  namespace = namespace ? namespace : 'p2p'
  componentId = componentId ? componentId : 'chatTarget'
  adId = adId ? adId : '1'
  adOwnerId = adOwnerId ? adOwnerId : '1'
  buyerId = buyerId ? buyerId : '78'
  bundleEL.src = `http://localhost:6005/serve/chat?root=${componentId}&namespace=${namespace}&adId=${adId}&adOwnerId=${adOwnerId}&buyerId=${buyerId}`
  bundleEL.type = "text/javascript"
  bundlesWrapperEL.appendChild(bundleEL)
}
