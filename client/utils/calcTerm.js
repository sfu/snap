import moment from 'moment'
import leftPad from './leftPad'

const TERM_DATES = {
  spring: {
    start: { month: '12', day: '25' },
    end: { month: '04', day: '23' }
  },
  summer: {
    start: { month: '04', day: '24'},
    end: { month: '08', day: '24' }
  },
  fall: {
    start: { month: '08', day: '25' },
    end: { month: '12', day: '24' }
  }
}

const SPRING = '1'
const SUMMER = '4'
const FALL = '7'

// Term codes are 4 digit integers. The first 3 digits represent the year with
// an offset of 1900. The last digit represents Spring, Summer, or Fall.
// For example: 1164 stands for 2016 Summer.
export default (date = Date.now()) => {
  const $date = moment(date)
  let term

  // SUMMER
  if ($date.isBetween(
    new Date(`${$date.get('year')}-${TERM_DATES.summer.start.month}-${TERM_DATES.summer.start.day}`).getTime(),
    new Date(`${$date.get('year')}-${TERM_DATES.summer.end.month}-${TERM_DATES.summer.end.day}`).getTime(),
    null, '[]'
  )) {
    term = SUMMER

  // FALL
  } else if ($date.isBetween(
    new Date(`${$date.get('year')}-${TERM_DATES.fall.start.month}-${TERM_DATES.fall.start.day}`).getTime(),
    new Date(`${$date.get('year')}-${TERM_DATES.fall.end.month}-${TERM_DATES.fall.end.day}`).getTime(),
    null, '[]'
  )) {
    term = FALL

  // SPRING
  } else {
    term = SPRING
  }

  // if term is SPRING and we're still in December, year++
  const year = leftPad((((term === SPRING && $date.get('month') === 11) ?
    $date.get('year') + 1 :
    $date.get('year')
  ) - 1900).toString(), 3, '0')

  return `${year}${term}`
}
