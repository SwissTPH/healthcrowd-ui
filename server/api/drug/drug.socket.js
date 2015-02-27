/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var drug = require('./drug.model');

exports.register = function (socket) {
    drug.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    drug.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
};

function onSave(socket, doc, cb) {
    socket.emit('drug:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('drug:remove', doc);
}
