import app from "./app";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(process.env["PORT"] || "8080");

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});
