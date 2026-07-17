// Pegando o botão de login no HTML

const btnLogin = document.getElementById("btnLogin");


// Quando clicar no botão

btnLogin.addEventListener("click", entrarFeed);



// Função para ir para o feed

function entrarFeed(){

    window.location.href = "feed.html";

}