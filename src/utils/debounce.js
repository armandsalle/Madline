export default function debounce(callback, delay) {
  let timer
  return () => {
    const args = arguments
    const context = this
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback.apply(context, args)
    }, delay)
  }
}
