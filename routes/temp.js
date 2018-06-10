/* Post songs by length */
router.get('/lengthForm', (req, res) => {
    res.render('lengthForm');
});

router.post('/lengthForm', (req, res) => {
    const minutes = req.body.mins,
        seconds = req.body.secs,
        millisecs = (parseInt(minutes) * 60 + parseInt(seconds)) * 1000,
        query = `SELECT Name, Milliseconds FROM Track WHERE Milliseconds > ${millisecs} LIMIT 1000`;
        console.log(query)
    db.run(query, (err, tracks) => {
        if (err) throw err;
        else {
            res.redirect(303, '/length');
            router.get('/length', (req, res) => {
                let tracksArray = [];
                db.each(query, (err, tracks) => {
                    if (err) throw err;
                    // turns milliseconds back to mins and secs
                    const min = Math.floor(tracks.Milliseconds / 60000);
                    const sec = ((tracks.Milliseconds % 60000) / 1000).toFixed(0);
                    tracks.Milliseconds = `${min}:${sec}`;
                    //
                    tracksArray.push(tracks);
                });
                res.render('length', {results: tracksArray});
            });
        }
    });
});