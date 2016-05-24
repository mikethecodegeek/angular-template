var express = require('express');
var path = require('path');
var router = express.Router();
var jwt = require('jsonwebtoken');
var JWT_SECRET = process.env.JWT_SECRET || 'assasadsasadfsadf';
var request = require('request');
var qs = require('querystring');
var User = require('../models/user')

router.post('/github', (req, res) => {

    console.log(req.body)
  // var token = jwt.sign(req.body, JWT_SECRET);
   console.log(token)
  // res.status(200).send({token: token})
    var accessTokenUrl = 'https://github.com/login/oauth/access_token';
    var userApiUrl = 'https://api.github.com/user';

    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        client_secret: process.env.GITHUB_SECRET || 'fbe1a53a92443ac3fa94f8937b51795310024d3b'
    };

    // use code to request access token
    request.get({ url: accessTokenUrl, qs: params }, (err, response, body) => {
        if(err) return res.status(400).send(err);

        var accessToken = qs.parse(body);
        var headers = { 'User-Agent': 'satellizer' };

        //  use access token to request user profile
        request.get({ url: userApiUrl, qs: accessToken, headers: headers, json: true }, (err, response, profile) => {
            if(err) return res.status(400).send(err);

            User.findOne({ github: profile.id }, (err, existingUser) => {
                if(err) return res.status(400).send(err);

                if(existingUser) {
                    var token = existingUser.generateToken();
                    res.send({ token: token });

                } else {
                    var user = new User();
                    user.github = profile.id;

                    user.save((err, savedUser) => {
                        var token = savedUser.generateToken();
                        console.log(token)
                        res.send({ token: token });
                    });
                }
            });
        });
    });

});



module.exports = router;
