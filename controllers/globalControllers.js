const paginatedResults = (model) => {
  return async (req, res, next) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    try {
      results.results = model.find().limit(limit).skip(startIndex).exec();
      next();
    } catch (err) {
      res.json({ message: err.message });
    }
  };
};

module.exports = {
  paginatedResults,
};
