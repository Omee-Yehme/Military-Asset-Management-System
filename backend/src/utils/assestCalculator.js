exports.calculateNetMovement = ({
  purchases = 0,
  transferIn = 0,
  transferOut = 0
}) => {
  return purchases + transferIn - transferOut
}
