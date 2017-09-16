define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 事件基类：提供事件注册及派发
     */
    class EventDispatcher {
        constructor() {
            this.eventMap = {};
        }
        register(event, handler) {
            if (!this.eventMap[event]) {
                this.eventMap[event] = [];
            }
            this.eventMap[event].push(handler);
        }
        unregister(event, handler) {
            let handlers = this.eventMap[event];
            if (!handlers) {
                return;
            }
            let index = handlers.indexOf(handler);
            if (index === -1) {
                return;
            }
            handlers.splice(index, 1);
        }
        fire(event, data) {
            let handlers = this.eventMap[event];
            if (!handlers) {
                return;
            }
            // throw error when devMode is not defined, not undefined.
            if (typeof devMode !== 'undefined' && devMode) {
                console.log(`%cevent: ${event}`, "color: #888888; font-style: italic");
            }
            handlers.forEach(handler => handler.call(this, data));
        }
    }
    exports.EventDispatcher = EventDispatcher;
});
//# sourceMappingURL=event.js.map