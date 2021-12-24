import login from './functions/login.js'
import isLogin from './functions/isLogin.js'

const loginBtn = document.getElementById('loginBtn')
const createDealBtn = document.getElementById('createDealBtn')

isLogin()

loginBtn.onclick = () => {
  let email, password, token, userId
  email = document.getElementById('loginEmail')
  password = document.getElementById('loginPassword')

  let data = {
    email: email.value,
    password: password.value
  }

  async function fetchTo() {
    const responce = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    let candidateData = await responce.json()

    if (candidateData) login(candidateData)

    return await responce.json()
  }

  fetchTo()
}

singupBtn.onclick = () => {
  let email, password
  email = document.getElementById('singupEmail')
  password = document.getElementById('singupPassword')

  let data = {
    email: email.value,
    password: password.value
  }

  async function fetchTo() {
    const responce = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    let candidateData = await responce.json()

    if (candidateData) login(candidateData)

    return await responce.json()
  }

  fetchTo()
}

createDealBtn.onclick = () => {
  let countDeal = document.getElementById('countDeal')

  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  let data = {
    id: userId,
    price: countDeal.value
  }

  async function fetchTo() {
    const responce = await fetch('/deal/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
        'userId': userId
      },
      body: JSON.stringify(data)
    })

    const res = await responce.json()
    const downloadHelper = document.createElement('a')
    downloadHelper.target = '_blank'
    downloadHelper.href = ('href', 'http://localhost:80/deal/:' + res.hash)
    downloadHelper.click()
  }

  fetchTo()
}

const logoutBtn = document.getElementById('logoutHeader')

logoutBtn.onclick = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')

  isLogin()
}