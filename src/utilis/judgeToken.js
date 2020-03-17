let judge = {
  judgefn (val) {
    if (JSON.parse(window.localStorage.getItem(val))) {
      return true
    } else {
      return false
    }
  }
}
export default judge
