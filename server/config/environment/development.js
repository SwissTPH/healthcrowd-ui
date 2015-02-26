'use strict';

// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://localhost/tphprices-dev',
        options: {
            user: 'tph-prices',
            pass: 'tph-prices1'
        }
    },

    seedDB: true
};
