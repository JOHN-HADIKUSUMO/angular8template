"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserGuardService = /** @class */ (function () {
    function UserGuardService(service) {
        this.service = service;
    }
    UserGuardService.prototype.canActivate = function (route, state) {
        return this.service.isLoggedIn() && !this.service.isManager();
    };
    return UserGuardService;
}());
exports.UserGuardService = UserGuardService;
//# sourceMappingURL=userguard.service.js.map