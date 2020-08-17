import moment from 'moment'
const momentDurationFormatSetup = require("moment-duration-format");

export function dateTime(value, format = 'date') {
 const options = {}

 if (format.includes('date')) {
   options.day = '2-digit'
   options.month = 'long'
   options.year = 'numeric'
 }

 if (format.includes('time')) {
  options.hour = '2-digit'
  options.minute  = '2-digit'
}

 return new Intl.DateTimeFormat('en-GB', options).format(new Date(value))
}

export function isoDurationToTime(value) {
  return moment.duration(value).format()
}