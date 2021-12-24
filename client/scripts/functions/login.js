export default function login(data) {
  let token = data.token
  let userId = data.userId

  localStorage.setItem('token', token)
  localStorage.setItem('userId', userId)

}