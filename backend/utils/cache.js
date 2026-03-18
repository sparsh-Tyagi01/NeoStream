const redis = require('redis');

let client;

async function connectRedis() {
  if (!process.env.REDIS_URL) {
    console.log('Redis URL not configured, caching disabled');
    return null;
  }
  
  try {
    client = redis.createClient({
      url: process.env.REDIS_URL
    });
    
    client.on('error', (err) => console.log('Redis Client Error', err));
    
    await client.connect();
    console.log('Redis connected successfully');
    return client;
  } catch (error) {
    console.log('Redis connection failed:', error.message);
    return null;
  }
}

async function getCache(key) {
  if (!client || !client.isOpen) return null;
  
  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log('Cache get error:', error);
    return null;
  }
}

async function setCache(key, data, expiry = 300) {
  if (!client || !client.isOpen) return;
  
  try {
    await client.setEx(key, expiry, JSON.stringify(data));
  } catch (error) {
    console.log('Cache set error:', error);
  }
}

async function deleteCache(key) {
  if (!client || !client.isOpen) return;
  
  try {
    await client.del(key);
  } catch (error) {
    console.log('Cache delete error:', error);
  }
}

module.exports = { connectRedis, getCache, setCache, deleteCache };