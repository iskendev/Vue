import axios from 'axios'

export const axiosClockify = axios.create({
  baseURL: 'https://api.clockify.me/api/v1',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': process.env.VUE_APP_CLOCKIFY_KEY
  }
});