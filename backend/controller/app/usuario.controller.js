const database = require('../database/connection');
const usuarioModel = require('../../model/usuario.model');
const bcrypt = require('bcrypt');


class usuarioController{
    createUsuario(req,res){
        let usuario = new usuarioModel;
        
        usuario = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(usuario.senha, salt);

        usuario.senha = hash;

        console.log(usuario);


        database.insert(usuario).table("usuario").then(data=>{
            console.log(data);
            res.json({message:"Usuario criado com sucesso!"})
        }).catch(error=>{
            res.json(error);
        });
    }

    getUsuario(req,res){
        database.select("*").table("usuario").then(data=>{
            res.json(data);
        }).catch(error=>{
            res.json(error);
        })
    }

    getUsuarioById(req,res){
        let id = req.params.id;
        database.select("*").table("usuario").where({id:id}).then(data=>{
            res.json(data);
        }).catch(error=>{
            res.json(error);
        })
    }

    updateUsuario(req,res){
        let id = req.params.id;
        let usuario = new usuarioModel;
        usuario = req.body;

        database.where({id:id}).update(usuario).table("usuario").then(data=>{
            res.json({message:"Usuario atualizado com sucesso!"})
        }).catch(error=>{
            res.error(error);
        });
    }

    deleteUsuario(req,res){
        let id = req.params.id;

        database.where({id:id}).del().table("usuario").then(data=>{
            res.json({message:"Usuario deletado com sucesso!"})
        }).catch(error=>{
            res.json(error);
        });
    }

    checkPassword(senha,senhaDB){
        return bcrypt.compareSync(senha,senhaDB);
    }
}

module.exports = new usuarioController();   