"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ManagerGuardService = /** @class */ (function () {
    function ManagerGuardService(service) {
        this.service = service;
    }
    ManagerGuardService.prototype.canActivate = function (route, state) {
        return this.service.isLoggedIn() && this.service.isManager();
    };
    return ManagerGuardService;
}());
exports.ManagerGuardService = ManagerGuardService;
//# sourceMappingURL=managerguard.service.js.map