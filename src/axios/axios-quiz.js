import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-13659-default-rtdb.firebaseio.com/'
})