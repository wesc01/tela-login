// Pegando elementos do HTML

const email = document.getElementById("email");

const senha = document.getElementById("senha");

const btnLogin = document.getElementById("btnLogin");

const mensagemErro = document.getElementById("mensagemErro");



// Quando clicar no botão

btnLogin.addEventListener("click", fazerLogin);



// Função responsável pelo login

async function fazerLogin(){


    const dadosLogin = {

        email: email.value,

        senha: senha.value

    };


    try{


        const resposta = await fetch(
            "http://localhost:3000/usuarios/login",
            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify(dadosLogin)

            }
        );



        const dados = await resposta.json();



        if(!resposta.ok){


            mensagemErro.innerText = dados.mensagem;

            return;

        }



        // Guardar token

        localStorage.setItem(
            "token",
            dados.token
        );



        // Guardar usuário

        localStorage.setItem(
            "usuario",
            JSON.stringify(dados.usuario)
        );



        // Entrar no feed

        window.location.href = "feed.html";


    }
    catch(erro){


        console.log(erro);


        mensagemErro.innerText =
        "Erro ao conectar com servidor";


    }


}