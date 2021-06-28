"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const firebase_1 = __importDefault(require("firebase"));
const useConfig = () => {
    const [config, setConfig] = react_1.useState(null);
    react_1.useEffect(() => {
        fetch('/api/config').then((result) => __awaiter(void 0, void 0, void 0, function* () {
            const config = yield result.json();
            console.log('useConfig', { config, result });
            firebase_1.default.initializeApp(config);
            setConfig(config);
        }));
    }, []);
    return config;
};
exports.default = useConfig;
//# sourceMappingURL=useConfig.js.map