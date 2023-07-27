const express = require('express');
const jwt = require('jsonwebtoken');
const {accessSecretKey, refreshSecretKey} = require('../Config/secretKey')

const refreshToken = async (req, res, next) => {
    const refreshToken = req.body.token;
  
    if (!refreshToken) {
      return res.status(403).json({ message: 'Refresh token not provided' });
    }
  
    try {
      const decodedToken = jwt.verify(refreshToken, refreshSecretKey);
      const currentTimestamp = Math.floor(Date.now() / 1000);
  
      if (decodedToken.exp < currentTimestamp) {
        return res.status(401).json({ message: 'Refresh token has expired' });
      }
  
      req.decodedRefreshToken = decodedToken;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
  };

module.exports = refreshToken;