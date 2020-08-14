import moment from 'moment'

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
  // let date = new Date()
  // let a = moment.duration(value)
  // return date.parse(value)
  // if (value.length > 5) {
  //   let duration = value.replace(/PT(\d+)H(\d+)M/, "$1:$2")
  //   // if (duration.length < 4) {
  //   //   let durationArr = duration.split('')
  //   //   durationArr.splice(2, 0, '0')
  //   //   return durationArr.join('')
  //   // }
  //   return duration
  // }
  // let pattern = /\d+/g
  // return `0:${value.match(pattern)}`
}