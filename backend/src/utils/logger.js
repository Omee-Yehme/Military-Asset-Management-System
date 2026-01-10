const fs = require("fs")

exports.logActivity = (message) => {
  fs.appendFileSync("logs/audit.log", message + "\n")
}
