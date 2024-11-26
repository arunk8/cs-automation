
class logger {
    async info(message) {
        var msg = await this.getTimeStamp() + " [INFO] : " + message;
        console.log(msg);
    }

    async error(message) {
        var msg = await this.getTimeStamp() + " [ERROR] : " + message;
        console.log(msg);
    }

    async warn(message) {
        var msg = await this.getTimeStamp() + " [WARN] : " + message;
        console.log(msg);
    }

    async getTimeStamp() {
        var today = new Date();
        var date = today.getFullYear() + "" + (today.getMonth() + 1) + "" + today.getDate();
        var time = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds() + "" + today.getMilliseconds();
        var timestamp = date + time;
        return timestamp;
    }
}
exports.logger = logger;