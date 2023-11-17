// Middleware to validate request body against a given schema
export const validateSchema = (schema) => (req, res, next) => {
    try {
        // Parse the request body using the provided schema
        schema.parse(req.body);
        // Move to the next middleware or route handler if validation passes
        next();
    } catch (err) {
        // Return a 400 Bad Request with error messages if validation fails
        return res.status(400).json(err.errors.map((err) => err.message));
    }
};
