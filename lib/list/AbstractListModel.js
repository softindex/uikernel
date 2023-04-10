"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractListModel {
    read(_search) {
        return Promise.resolve([]);
    }
    getLabel(_id) {
        return Promise.resolve('');
    }
}
exports.default = AbstractListModel;
//# sourceMappingURL=AbstractListModel.js.map