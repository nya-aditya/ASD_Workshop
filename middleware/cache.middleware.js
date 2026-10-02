let cache = {}
const TTL = 60 * 1000 // 1 minute ka time to live (ms me)

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl || req.url
    const cachedItem = cache[key]
    const currentTime = Date.now()

    // agar cache me pehle se data pada hua hai
    if (cachedItem) {
        const age = currentTime - cachedItem.createdAt

        // check karo ki data 1 minute se kam purana hai ya nahi
        if (age < TTL) {
            console.log(`Cache HIT: ${key} (age: ${(age / 1000).toFixed(1)}s)`)
            res.setHeader('X-Cache', 'HIT')
            res.setHeader('X-Cache-Age-Seconds', Math.floor(age / 1000))
            return res.json(cachedItem.data)
        } else {
            console.log(`Cache EXPIRED: ${key} (1 minute se purana ho gaya)`)
            delete cache[key] // expire ho gaya toh delete kar do
        }
    }

    // agar cache me nahi mila ya expire ho gaya (MISS)
    console.log(`Cache MISS: ${key}`)
    res.setHeader('X-Cache', 'MISS')

    // res.json ko intercept karo taaki controller jab response bheje toh hum use cache me save kar le
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

// jab bhi koi POST, PUT, PATCH, DELETE request aaye toh pura cache saaf kar do
function invalidateCache() {
    console.log('Cache INVALIDATED - pura purana cache clear kar diya')
    cache = {}
}

module.exports = {
    cacheMiddleware,
    invalidateCache
}
