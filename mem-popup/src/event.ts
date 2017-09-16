import * as $ from "jquery";

declare const devMode: boolean;

export interface EventCallback {
    (data: any): void
}

/**
 * 事件基类：提供事件注册及派发
 */
export class EventDispatcher {

    private eventMap: { [key: string]: EventCallback[] } = {};

    register(event: string, handler: (data: any) => void): void {
        if (!this.eventMap[event]) {
            this.eventMap[event] = [];
        }
        this.eventMap[event].push(handler);
    }

    unregister(event: string, handler: EventCallback): void {
        let handlers = this.eventMap[event];
        if (!handlers) {
            return;
        }

        let index = handlers.indexOf(handler);
        if (index === -1) {     // -1 is meaningful as index.
            return;
        }
        handlers.splice(index, 1);
    }

    fire(event: string, data?: object): void {
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


