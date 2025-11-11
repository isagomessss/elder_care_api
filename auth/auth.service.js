"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = require("../../firebase.config");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const firestore_1 = require("firebase-admin/firestore");
let AuthService = class AuthService {
    jwtService;
    usuariosCollection = firebase_config_1.firestore.collection('usuários');
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async register(dto) {
        const userExists = await this.usuariosCollection.where('email', '==', dto.email).get();
        if (!userExists.empty)
            throw new common_1.BadRequestException('E-mail já cadastrado.');
        const hashedPassword = await bcrypt.hash(dto.senha, 10);
        const userData = {
            ...dto,
            senha: hashedPassword,
            dataCadastro: firestore_1.Timestamp.now(),
        };
        const userRef = await this.usuariosCollection.add(userData);
        const payload = { id: userRef.id, email: dto.email, tipo: dto.tipo };
        const token = this.jwtService.sign(payload);
        return { token, usuario: { id: userRef.id, ...dto, senha: undefined } };
    }
    async login(dto) {
        const snapshot = await this.usuariosCollection.where('email', '==', dto.email).get();
        if (snapshot.empty)
            throw new common_1.UnauthorizedException('Credenciais inválidas.');
        const userDoc = snapshot.docs[0];
        const user = userDoc.data();
        const senhaCorreta = await bcrypt.compare(dto.senha, user.senha);
        if (!senhaCorreta)
            throw new common_1.UnauthorizedException('Credenciais inválidas.');
        const payload = { id: userDoc.id, email: user.email, tipo: user.tipo };
        const token = this.jwtService.sign(payload);
        return { token, usuario: { id: userDoc.id, ...user, senha: undefined } };
    }
    async validateUser(userId) {
        const doc = await this.usuariosCollection.doc(userId).get();
        if (!doc.exists)
            return null;
        return { id: doc.id, ...doc.data() };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map