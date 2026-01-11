module.exports = {
    Admin: {
        canAccessAll: true
    },
    BaseCommander: {
        canPurchase: false,
        canTransfer: false,
        canAccessBaseOnly: true
    },
    LogisticsOfficer: {
        canPurchase: true,
        canTransfer: true,
        canAccessBaseOnly: false
    }
};
