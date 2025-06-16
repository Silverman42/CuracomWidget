let lastUrl = location.href
export const useUrlChangeHandler = (callback: Function = (currentUrl: string) => {}) => {
  const handleUrlChange = () => {
    const currentUrl = location.href

    console.log('URL changed to:', currentUrl)

    // if (currentUrl !== lastUrl) {
    //   lastUrl = currentUrl
    //   // TODO: Call your chat widget's URL update function here
    //   callback(currentUrl)
    // }
  }

  // history.pushState = (...args) => {
  //   const result = history.pushState.apply(history, args)
  //   handleUrlChange() // Check after state change
  //   return result
  // }

  history.replaceState = (...args) => {
    const result = history.replaceState.apply(history, args)
    // handleUrlChange() // Check after state change
    console.log('replaceState', result)
    return result
  }

  // patchHistoryMethod('pushState')
  // patchHistoryMethod('replaceState')

  // Also listen to popstate (back/forward browser buttons)
  window.addEventListener('popstate', handleUrlChange)

  // Optional: detect hash changes
  window.addEventListener('hashchange', handleUrlChange)
}
