const notFoundMiddleware = (req, res) =>
  res.status(404).send(`No route match ${req.path}`);

export default notFoundMiddleware;
