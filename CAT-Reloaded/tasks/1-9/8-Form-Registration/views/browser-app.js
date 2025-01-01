const formDOM = document.querySelector('.form')
const usernameInputDOM = document.querySelector('.username-input')
const passwordInputDOM = document.querySelector('.password-input')
const emailInputDOM = document.querySelector('.email-input')
const passwordConfirmInputDOM = document.querySelector('.passwordConfirm-input')
const birthDateInputDOM = document.querySelector('.date-input')

const formAlertDOM = document.querySelector('.form-alert')
const resultDOM = document.querySelector('.result')
const btnDOM = document.querySelector('#data')
const tokenDOM = document.querySelector('.token')

formDOM.addEventListener('submit', async (e) => {
  formAlertDOM.classList.remove('text-success')

  e.preventDefault()
  const username = usernameInputDOM.value
  const password = passwordInputDOM.value
  const email = emailInputDOM.value
  const passwordConfirm = passwordConfirmInputDOM.value
  const birthDate = birthDateInputDOM.value

  const response = await fetch('/api/v1/submit', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password, email, passwordConfirm, birthDate })
  })
  if (!response.ok) {
    const errors = await response.json();
    tokenDOM.classList.remove('text-success')
    tokenDOM.textContent = `Failed!`
    resultDOM.innerHTML = ``
    let i = 0
    errors.forEach(element => {
      resultDOM.innerHTML += `<p>(${++i})- ${element.msg}</p> `

    });
    throw new Error(errors);
  }
  tokenDOM.classList.add('text-success')
  tokenDOM.textContent = `Successful Sign Up!!`
  resultDOM.innerHTML = `No Errors`
  console.log(`Successful Sign Up!!`);
})