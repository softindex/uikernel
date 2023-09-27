"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const omit_1 = __importDefault(require("lodash/omit"));
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const PORTAL_CLASS_NAME = '__portal';
class Portal extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.portal = null;
        this.onDocumentMouseDown = (event) => {
            if (this.props.onDocumentMouseDown) {
                this.props.onDocumentMouseDown(event, this.isDocumentEventOwner(event.target));
            }
        };
        this.onDocumentMouseScroll = (event) => {
            if (this.props.onDocumentMouseScroll) {
                this.props.onDocumentMouseScroll(event, this.isDocumentEventOwner(event.target));
            }
        };
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.onDocumentMouseDown, false);
        document.addEventListener('scroll', this.onDocumentMouseScroll, true);
        const portal = document.createElement('div');
        document.body.appendChild(portal);
        portal.className = PORTAL_CLASS_NAME;
        this.portal = portal;
        this.renderPortal();
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onDocumentMouseDown, false);
        document.removeEventListener('scroll', this.onDocumentMouseScroll, true);
        if (this.portal) {
            react_dom_1.default.unmountComponentAtNode(this.portal);
            document.body.removeChild(this.portal);
        }
    }
    componentDidUpdate() {
        this.renderPortal();
    }
    renderPortal() {
        react_dom_1.default.render(react_1.default.createElement("div", { ...(0, omit_1.default)(this.props, ['onDocumentMouseDown', 'onDocumentMouseScroll']) }, this.props.children), this.portal);
    }
    render() {
        return null;
    }
    isDocumentEventOwner(target) {
        return Boolean(this.portal && (target === this.portal || this.portal.contains(target)));
    }
}
exports.default = Portal;
//# sourceMappingURL=Portal.js.map