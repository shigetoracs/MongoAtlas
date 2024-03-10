import { Router } from "express";
import cartModel from "../models/cart.js";


const cartRouter = Router()

cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.id
        const cart = await cartModel.findById(cartId)
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carrito: ${error}`)
    }
})

cartRouter.post('/cid/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const { quantity } = req.body
        const cart = await cartModel.findById(cartId)
        const indice = cart.products.findIndex(product=> product.id == productId)

        if (indice != -1) {
            cart.products[indice].quantity += quantity
        } else {
            cart.products.push ({id: productId, quantity: quantity})
        }
        const mensaje = await cartModel.findByIdAndUpdate(cartId, cart.products)
        res.status(200).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear producto: ${error}`)
    }
})

export default cartRouter