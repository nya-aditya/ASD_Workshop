let cache = {}
const TTL = 60 * 1000 

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl || req.url
    const cachedItem = cache[key]
    const currentTime = Date.now()

    if (cachedItem) {
        const age = currentTime - cachedItem.createdAt
        if (age < TTL) {
            console.log(`Cache HIT: ${key}`)
            res.setHeader('X-Cache', 'HIT')
            return res.json(cachedItem.data)
        } else {
            console.log(`Cache EXPIRED: ${key}`)
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
    console.log('Cache INVALIDATED')
    cache = {}
}

module.exports = {cacheMiddleware,invalidateCache}
