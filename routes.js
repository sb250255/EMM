module.exports = function (app) {

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        console.log("Dirname:" + __dirname);
        res.sendFile(__dirname + '/EnahncedMonitorDashboard/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
