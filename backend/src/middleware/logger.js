import morgan from "morgan";

const format = ":method :url :status :res[content-length]b - :response-time ms";

export const logger = morgan(format, {
  skip: (req) => req.url === "/api/health",
});

