document.querySelector('#signup-submit').onclick = function(event){
    event.preventDefault();
    console.log('work');

    var email = document.getElementById('signup-email').value;
    var login = document.getElementById('signup-login').value;
    var psw = document.getElementById('signup-psw').value;
    var psw_repeat = document.getElementById('signup-psw-repeat').value;

    if (email === "" || login === "" || psw === "") {
        alert('Заполните все поля');
        return;
    }

    if (psw != psw_repeat) {
        alert('Неправильный пароль');
        return;
    }

    var users = JSON.parse(localStorage.getItem('user')) || [];

    var existingUser = users.find(function(user) {
        return users.username === username;
    });

    if(existingUser) {
        alert('Это имя уже занято');
        return;
    }

    users.push({
        email: email,
        login: login,
        psw: psw
    });

    console.log(users);

    localStorage.setItem('users', JSON.stringify(users));

    alert('Успешно')
}