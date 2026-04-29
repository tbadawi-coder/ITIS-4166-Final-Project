import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import authorRoutes from "./routes/authorRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

//middleware
app.use(express.json());

const swaggerDocument = YAML.load("./src/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/loans", loanRoutes);

//start server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});