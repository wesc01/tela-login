require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");


const app = express();


// ===============================
// MIDDLEWARES
// ===============================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));


// ===============================
// FRONTEND
// ===============================

// Caminho da pasta frontend
const frontendPath = path.join(__dirname, "../front-end");


// Servir arquivos HTML, CSS e JS
app.use(express.static(frontendPath));


// ===============================
// BANCO DE DADOS
// ===============================

mongoose.connect(process.env.MONGO_URI)

.then(()=>{

    console.log("✅ Banco conectado!");

})

.catch((erro)=>{

    console.log("❌ Erro no banco:");
    console.log(erro);

});


// ===============================
// ROTAS DA API
// ===============================

const usuariosRoutes = require("./routes/usuariosRoutes");


app.use("/usuarios", usuariosRoutes);



// ===============================
// ROTA PRINCIPAL
// ===============================

app.get("/", (req,res)=>{

    res.sendFile(
        path.join(frontendPath,"index.html")
    );

});



// ===============================
// SERVIDOR
// ===============================

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{

    console.log(
        `🚀 Servidor rodando em http://localhost:${PORT}`
    );

});