
export class Ajax {

    static request(method, url, data, headers) {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open(method, url);

            if (headers) {
                for (let k in headers) {
                    xhr.setRequestHeader(k, headers[k]);
                }
            }

            xhr.onload = function () {
                resolve(this.responseText);
            };

            xhr.onerror = function () {
                reject(`Fehler! Request Status: ${this.statusText}`);
            };

            xhr.onabort = function () {
                reject('Vorgang abgebrochen.');
            };

            xhr.send(data || null);

        });
    }

    static async post(url, data, headers) {
        try {
            let response = await Ajax.request('POST', url, data, headers);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async get(url, headers) {
        try {
            let response = await Ajax.request('GET', url, null, headers);
            return response;
        } catch (error) {
            throw error;
        }
    }
}