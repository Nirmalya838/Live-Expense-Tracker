const loginBtn = document.getElementById('submit');

loginBtn.addEventListener('click', function loginUser(event) {
  event.preventDefault();
  console.log(event.target.name);

  const loginDetails = {
    email : event.target.email.value,
    password : event.target.password.value
  }

  console.log(loginDetails);
  if()
})