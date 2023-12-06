import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const PORT = 8080;
const productManager = new ProductManager(); // Usa un nombre de variable diferente




app.get("/api/products", async (req, res)=>{
    try {
        const { limit } = req.query;
        let products = await productManager.getProducts();
                // -------------------------------------- Muestra los productos
                if (!limit){
                    res.status(200).send({
                    success:true,
                    data:products,
                });
            }
            // ----------------------------------------------------------- Da los porductos con un limit
            products = products.filter(product => product.id <= limit)

            res.status(200).send({
                success:true,
                data:products,
            })
            // ---------------------------------------------------------- Si tiene algun error (si se elimina algun producto puede salir)
        }catch(error) {
            console.log("Error");
            res.status(400).send({
                success: "false",
            })
        };
});


app.get("/api/products/:pid", async (req, res)=>{
    try{
        const { pid } =req.params;
        if(isNaN(pid)){
            throw new Error("ID no es un numero")
        }
        const product = productManager.getProductById(pid)
        if (!product){
            throw new Error("ID no corresponde")
        }

        res.status(200).send({
            success:true,
            data:products,
        });


        }catch(error) {
            console.log("Error");
            res.status(400).send({
            success: "false",
        })
    };
});





app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});