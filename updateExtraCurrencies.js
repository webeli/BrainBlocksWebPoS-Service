import { postUpdateID } from './postgres'
import axios from 'axios'
import config from './config'

const { DATABASE, oer } = config

axios
  .get(`${oer.latestEndpoint}?app_id=${oer.appId}&base=usd&symbols=VES`)
  .then(({ data }) => {
    console.log(data)
    return postUpdateID(DATABASE.currenciesTable, 'VES', {
      price: data.rates.VES,
      timestamp: data.timestamp
    })
  })
  .then(postId => {
    console.log(postId)
    process.exit(0)
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
