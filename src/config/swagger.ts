import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";
import { env } from "../modules/common/env";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "StellarStay API",
      version: "1.0.0",
      description: "API documentation for StellarStay backend",
    },
    servers: [{ url: `http://localhost:${env.APP_PORT}`, description: "Local server" }],
  },
  apis: [path.join(__dirname, "../modules/**/*.swagger.ts")], // only swagger files
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}