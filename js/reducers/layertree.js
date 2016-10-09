/**
 * Copyright 2016, Sourcepole AG.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {TOGGLE_LAYERTREE} = require('../actions/layertree');
const assign = require('object-assign');

function toggleLayertree(state = {expanded: true}, action) {
    switch (action.type) {
        case TOGGLE_LAYERTREE:
            return assign({}, state, {
                expanded: action.expanded
            });
        default:
            return state;
    }
}

module.exports = toggleLayertree;
