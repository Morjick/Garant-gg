export default function isLogin() {
  let isLogin

  let isToken = localStorage.getItem('token')
  let isUserId = localStorage.getItem('userId')
  if( isToken && isUserId ) isLogin = true

  // function createLogoutBtn() {
  //   let div = document.createElement('div')
  //   let span = document.createElement('span')

  //   span.id = 'logoutBtn'
  //   span.innerHTML = 'exitText'
  //   div.classList.add('btn')
  //   div.classList.add('btn-border')
  //   div.classList.add('btn-login')
  //   div.classList.add('btn-modal--login')
  //   div.appendChild(span)
  // }
  

  if(isLogin) {
    const signInHeader = document.getElementById('signInHeader')
    const signUpHeader = document.getElementById('signUpHeader')
    const logoutHeader = document.getElementById('logoutHeader')


    signInHeader.style.display = 'none'
    signUpHeader.style.display = 'none'
    logoutHeader.style.display = 'block'

  } else {
    const signInHeader = document.getElementById('signInHeader')
    const signUpHeader = document.getElementById('signUpHeader')
    const logoutHeader = document.getElementById('logoutHeader')
    
    signInHeader.style.display = 'block'
    signUpHeader.style.display = 'block'
    logoutHeader.style.display = 'none'
  }

  
}