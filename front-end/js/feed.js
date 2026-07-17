const textoPost = document.getElementById("textoPost");

const imagemPost = document.getElementById("imagemPost");

const publicar = document.getElementById("publicar");

const feed = document.getElementById("feed");

const sair = document.getElementById("sair");



let posts = JSON.parse(
    localStorage.getItem("posts")
) || [];



mostrarPosts();




publicar.addEventListener("click",()=>{


    const texto = textoPost.value;


    const arquivo = imagemPost.files[0];



    if(!texto && !arquivo){

        alert("Digite algo ou escolha uma imagem");

        return;

    }




    if(arquivo){


        const leitor = new FileReader();



        leitor.onload=function(event){


            criarPost(
                texto,
                event.target.result
            );


        }



        leitor.readAsDataURL(arquivo);


    }

    else{


        criarPost(texto,"");


    }



});





function criarPost(texto,imagem){


    const novoPost={

        id:Date.now(),

        usuario:"Usuário",

        texto:texto,

        imagem:imagem,

        curtidas:0

    };



    posts.unshift(novoPost);



    salvarPosts();


    mostrarPosts();



    textoPost.value="";

    imagemPost.value="";



}






function mostrarPosts(){


    feed.innerHTML="";



    posts.forEach(post=>{



        const div=document.createElement("div");


        div.className="post";



        div.innerHTML=`

        <h3>
        ${post.usuario}
        </h3>


        <p>
        ${post.texto}
        </p>


        ${
            post.imagem ?

            `<img src="${post.imagem}">`

            :

            ""

        }


        <button onclick="curtir(${post.id})">

        ❤️ ${post.curtidas}

        </button>



        <button onclick="deletar(${post.id})">

        🗑 Excluir

        </button>


        `;



        feed.appendChild(div);



    });



}





function curtir(id){


    const post = posts.find(
        p=>p.id===id
    );


    post.curtidas++;


    salvarPosts();


    mostrarPosts();


}






function deletar(id){


    posts = posts.filter(
        p=>p.id!==id
    );


    salvarPosts();


    mostrarPosts();


}






function salvarPosts(){


    localStorage.setItem(

        "posts",

        JSON.stringify(posts)

    );


}





sair.addEventListener("click",()=>{


    localStorage.clear();


    window.location.href="index.html";


});