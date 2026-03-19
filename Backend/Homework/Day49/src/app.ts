import express from "express";
import dotenv from 'dotenv'
import productRoutes from './routes/product.route'
import attributeRoutes from './routes/attribute.route'

// Load biến môi trường
dotenv.config()

const PORT: number = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/products", productRoutes);
app.use('/attributes', attributeRoutes)

app.listen(PORT, () => {
  console.log(`Start server: http://localhost:${PORT}`);
});
