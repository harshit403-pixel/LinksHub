import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/index.routes.js";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(
  import.meta.url
);

const __dirname = path.dirname(
  __filename
);

app.use(
  cors({
    origin:
      process.env.NODE_ENV ===
      "production"
        ? true
        : "http://localhost:5173",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(
      path.join(
        __dirname,
        "../../Client/dist"
      )
    )
  );

  app.use((req, res) => {
    res.sendFile(
      path.join(
        __dirname,
        "../../Client/dist/index.html"
      )
    );
  });
}



export default app;