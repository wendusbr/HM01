$('#formLogin').on('submit', function(event){
    event.preventDefault();

    if(document.getElementById('login').value=='wendell@gmail.com' && document.getElementById('password').value=='secreto')
        window.location.href = 'index.html';
    else
        alert('Login ou senha incorretos!');
})