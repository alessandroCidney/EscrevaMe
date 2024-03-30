import moment from 'moment'

export function getFromNowDate (date: Date) {
  return moment(date).fromNow()
}
