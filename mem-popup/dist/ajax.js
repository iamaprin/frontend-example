define(["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Ajax {
        request(url, data, method = AjaxMethod.GET) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: url,
                    data: data,
                    method: method
                }).done((resp) => {
                    if (resp.code) {
                        return;
                    }
                    resolve(resp.data);
                }).fail(() => {
                    reject();
                });
            });
        }
        get(url, data) {
            return this.request(url, data);
        }
        post(url, data) {
            return this.request(url, data, AjaxMethod.POST);
        }
    }
    exports.Ajax = Ajax;
    var AjaxMethod;
    (function (AjaxMethod) {
        AjaxMethod["POST"] = "post";
        AjaxMethod["GET"] = "get";
    })(AjaxMethod = exports.AjaxMethod || (exports.AjaxMethod = {}));
});
//# sourceMappingURL=ajax.js.map