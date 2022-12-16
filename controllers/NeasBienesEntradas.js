import ModelsNeaBien from "../models/ModelsNeaBien.js";
import ModelsBienes from "../models/ModelsBienes.js";
import ModelsNeaEntradas from "../models/ModelsNeaEntradas.js";

export const getNeasBienesEntradasId = async (req, res) => {
    try {
        const NeasBien = await ModelsNeaBien.findAll({
            where: {neaEntradaId: req.params.id},
            include: [ModelsBienes, ModelsNeaEntradas]
        })
        res.json(NeasBien)
    } catch (error) {
        res.json({ message : error.message})
    }
}


