module.exports = (req, res, next) => {
    if (req.user.role === "Admin") return next();

    if (req.user.role === "BaseCommander") {
        const requestedBaseId =
            req.body.baseId || req.params.baseId || req.query.baseId;

        if (!requestedBaseId)
            return res.status(400).json({ message: "Base ID required" });

        if (requestedBaseId.toString() !== req.user.baseId.toString())
            return res.status(403).json({ message: "Access restricted to assigned base only" });
    }

    next();
};
