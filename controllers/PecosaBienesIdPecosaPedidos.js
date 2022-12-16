import ModelsPecosaBienes from "../models/ModelsPecosaBienes.js";
import ModelsPecosaPedidos from "../models/ModelsPecosaPedidos.js";
import ModelsInvenInicial from "../models/ModelsInvenInicial.js";

export const getPecosaBienesPeidosId = async (req, res) => {
    try {
        const pecosabienpedidos = await ModelsPecosaBienes.findAll({
            where: {pecosaPedidoId: req.params.id},
            include: [ModelsInvenInicial, ModelsPecosaPedidos]
        })
        res.json(pecosabienpedidos)
    } catch (error) {
        res.json({message: error.message})
    }
}



