let cache = {}
const TTL = 60 * 1000 // 1 minute in milliseconds

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl || req.url
    const cachedItem = cache[key]
    const currentTime = Date.now()

    if (cachedItem) {
        const age = currentTime - cachedItem.createdAt
        if (age < TTL) {
            console.log(`Cache HIT: ${key} (age: ${(age / 1000).toFixed(1)}s)`)
            res.setHeader('X-Cache', 'HIT')
            res.setHeader('X-Cache-Age-Seconds', Math.floor(age / 1000))
            return res.json(cachedItem.data)
        } else {
            console.log(`Cache EXPIRED: ${key} (older than 1 minute)`)
            delete cache[key]
        }
    }

    console.log(`Cache MISS: ${key}`)
    res.setHeader('X-Cache', 'MISS')

    const originalJson = res.json.bind(res)
    res.json = (data) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache[key] = {
                data: data,
                createdAt: Date.now()
            }
        }
        return originalJson(data)
    }

    next()
}

function invalidateCache() {
    console.log('Cache INVALIDATED - clearing all entries')
    cache = {}
}

module.exports = {
    cacheMiddleware,
    invalidateCache
}
