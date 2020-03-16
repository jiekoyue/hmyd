function fandou () {
  let tiemId = null
  return (fn, time) => {
    clearTimeout(tiemId)
    tiemId = setTimeout(fn, time)
  }
}

export default fandou()
