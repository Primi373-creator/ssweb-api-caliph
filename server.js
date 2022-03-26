const ssweb = require('./index');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const stream = require('stream');
const uploadFileFromCaliph = require('./lib/uploadFile');
const { author } = require('./index');


// Buffer tu stream...
const createStream = (binary) => {
    return new stream.Readable({
        read() {
            this.push(binary);
            this.push(null);
        }
    });
}



app.get('/', async (req, res) => {
    res.send("<code>Hello welcome to my Rest API, I was created server for web screenshot from source code</code>")
})


app.get('/ssweb/desktop', async (req, res) => {
    var url = req.query.url,
        responsetype = req.query.responsetype

    if (!url) return res.json({ status: false, creator: "Cakrayp & Caliph", message: "please enter URL for web screenshot" })

    ssweb.desktop({ url })
        .then(async (buff) => {
            if (/^image(s|)$/.test(responsetype)) {
                createStream(buff).pipe(res)
            } else {
                uploadFileFromCaliph(buff)
                    .then(result => {
                        res.json({
                            status: 200,
                            creator: "Cakrayp & Caliph",
                            message: "You can add paramenter of 'responsetype=image' to image response",
                            result
                        })
                    })
            }
        })
})


app.get('/ssweb/handphone', async (req, res) => {
    var url = req.query.url,
        responsetype = req.query.responsetype

    if (!url) return res.json({ status: false, creator: "Cakrayp & Caliph", message: "please enter URL for web screenshot" })

    ssweb.handphone({ url })
        .then(async (buff) => {
            if (/^image(s|)$/.test(responsetype)) {
                createStream(buff).pipe(res)
            } else {
                uploadFileFromCaliph(buff)
                    .then(result => {
                        res.json({
                            status: 200,
                            creator: "Cakrayp & Caliph",
                            message: "You can add paramenter of 'responsetype=image' to image response",
                            result
                        })
                    })
            }
        })
})


app.use(async(req, res) => {
    res.send("<code>404 Not found</code>")
})


app.listen(port, () => {
    console.log('Server is running on port : ' + port)
})