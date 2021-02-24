
import axios from 'axios'

const login = (data) =>{
   return axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/token/',
        data: {
          username: data.username,
          password: data.password
        }
      })
}


const fetchProducts = () =>{
  const url = 'http://127.0.0.1:8000/api/product'
  return axios.get(url).then((res) => { console.log(res); return res.data})
}


const signUp = (user) =>{
  const url = 'http://127.0.0.1:8000/api/signup/'
  return axios({
    method: 'post',
    url: url,
    data: {
      first_name : user.first_name,
      last_name : user.last_name,
      email : user.email,
      password : user.password,
      username : user.username
    }
  })
} 

const search= (query) =>{
  const url = `http://127.0.0.1:8000/api/product/?search=${query}`
  return axios.get(url)
}

export {fetchProducts , login , signUp ,search}