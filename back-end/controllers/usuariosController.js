const Usuario = require("../models/Usuarios");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

//========================
// CADASTRO
//========================

exports.cadastro = async (req, res) => {

    try {

        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {

            return res.status(400).json({
                mensagem: "Preencha todos os campos."
            });

        }

        const usuarioExiste = await Usuario.findOne({ email });

        if (usuarioExiste) {

            return res.status(400).json({
                mensagem: "Email já cadastrado."
            });

        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = new Usuario({

            nome,

            email,

            senha: senhaCriptografada

        });

        await novoUsuario.save();

        res.status(201).json({

            mensagem: "Usuário cadastrado com sucesso!"

        });

    }

    catch (erro) {

        console.log(erro);

        res.status(500).json({

            mensagem: "Erro interno."

        });

    }

};

//========================
// LOGIN
//========================

exports.login = async (req, res) => {

    try {

        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {

            return res.status(404).json({

                mensagem: "Usuário não encontrado."

            });

        }

        const senhaCorreta = await bcrypt.compare(

            senha,

            usuario.senha

        );

        if (!senhaCorreta) {

            return res.status(401).json({

                mensagem: "Senha incorreta."

            });

        }

        const token = jwt.sign(

            {

                id: usuario._id

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"

            }

        );

        res.json({

            token,

            usuario: {

                id: usuario._id,

                nome: usuario.nome,

                email: usuario.email,

                foto: usuario.foto,

                bio: usuario.bio

            }

        });

    }

    catch (erro) {

        console.log(erro);

        res.status(500).json({

            mensagem: "Erro interno."

        });

    }

};