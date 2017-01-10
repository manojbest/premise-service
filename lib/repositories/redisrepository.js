
const Promise = require('bluebird');
const redis = require('redis');
const config = require('config');
Promise.promisifyAll(redis.RedisClient.prototype);

class RedisRepository {

    constructor(context) {
        this._client = redis.createClient({
            host: config.redisHost,
            port: config.redisPort
        });
    }

    setData(key, value) {
        return this._client.setAsync(key, value);
    }

    getData(key) {
        return this._client.getAsync(key)
            .then((res) => {
                return res;
        });
    }
}

module.exports = RedisRepository;