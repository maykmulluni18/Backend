import ModelsNeaEntradas from "../models/ModelsNeaEntradas.js";
import ModelsAdministrdores from "../models/Models.js";
import ModelsBienes from "../models/ModelsBienes.js"
import ModelsSedes from "../models/ModelsSedes.js";
import ModelsNeaBien from "../models/ModelsNeaBien.js";
export const getNeaEntradas = async (req, res) => {
    try {
        const modelsentradas = await ModelsNeaEntradas.findAll({
            include: [ModelsAdministrdores, ModelsSedes, ModelsBienes],
        })
        res.json(modelsentradas)
    }catch (error) {
        res.json({message: error.message})
    }
}

export const getNeaEntradasId = async (req, res) => {
    try {
        const NeasEntradas = await ModelsNeaEntradas.findAll({
            where: {id: req.params.id},
            include: [ModelsAdministrdores,  ModelsSedes, ModelsBienes]
        })
        res.json(NeasEntradas[0])
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createNeasEntradas = async (req, res) => {
    try {
        const NeasEntradas = await ModelsNeaEntradas.create(req.body)
        res.json({'message':'Neas Entradas creado con exito'})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateNeasEntradas = async (req, res) => {
    try {
        const NeasEntradas = await ModelsNeaEntradas.update(req.body,{
            where: {id: req.params.id}
        })
        res.json({'message':'Neas Entradas Actualizado creado con exito'})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteNeasEntradas = async (req, res) => {
    try {
        const NeasEntradas = await ModelsNeaEntradas.destroy({
            where: {id: req.params.id}
        })
        res.json({'message': 'Neas Entradas Eliminado con exito'})
    } catch (error) {
        res.json({message: error.message})
    }
}