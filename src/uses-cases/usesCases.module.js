"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientModel = exports.ClientModel = exports.ClientRepository = void 0;
const client_repository_1 = require("../repository/client.repository");
Object.defineProperty(exports, "ClientRepository", { enumerable: true, get: function () { return client_repository_1.ClientRepository; } });
const client_model_1 = require("../models/client.model");
Object.defineProperty(exports, "ClientModel", { enumerable: true, get: function () { return client_model_1.ClientModel; } });
Object.defineProperty(exports, "UpdateClientModel", { enumerable: true, get: function () { return client_model_1.UpdateClientModel; } });
