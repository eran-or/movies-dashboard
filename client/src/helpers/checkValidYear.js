import moment from 'moment'

const isValidYear = (value) => {
  const year = moment(value.trim(), "YYYY", true)
  const isNotFuture = year.isBefore(moment())
  const isAfter1924 = year.isAfter(moment(1924, "YYYY", true))
  if (!isNotFuture || !isAfter1924) {
    return false
  }
  return true
}

export default isValidYear