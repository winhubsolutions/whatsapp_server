const Text = require("./text.js");
const WA = require("./wa.js");

WA.app.get('/instance', WA.cors, async (req, res) => {
    var access_token = req.query.access_token;
    var instance_id = req.query.instance_id;

    await WA.check_token(access_token, instance_id, false, res, async function(status){
        await WA.instance(instance_id, false, false, res, async (client) => {
            await WA.get_info(client, res);
        });
    });
});

WA.app.get('/check_instance', WA.cors, async (req, res) => {
    var access_token = req.query.access_token;
    var instance_id = req.query.instance_id;
    await WA.check_token_go(access_token, instance_id, res, async (status) => {
        await WA.check_instance(instance_id, false, res, async (client) => {});
    });
});


WA.app.get('/logout', WA.cors, async (req, res) => {
    var access_token = req.query.access_token;
    var instance_id = req.query.instance_id;
    await WA.check_token(access_token, instance_id, false, res, async function(status){
        await WA.instance(instance_id, false, false, res, function(client){
            WA.logout(instance_id, res);
        });
    });
});

WA.app.get('/get_qrcode', WA.cors, async (req, res) => {
    var access_token = req.query.access_token;
    var instance_id = req.query.instance_id;

    await WA.check_token_go(access_token, instance_id, res, async (status) => {
        await WA.instance(instance_id, true, false, res, async (client) => {
            WA.get_qrcode(instance_id, res, async (result) => {});
        });
    });
});

WA.app.get('/get_groups', WA.cors, async (req, res) => {
    var access_token = req.query.access_token;
    var instance_id = req.query.instance_id;

    await WA.check_token(access_token, instance_id, false, res, async (status) => {
        await WA.instance(instance_id, false, false, res, async (client) => {
            WA.get_groups(client, instance_id, res);
        });
    });
});

WA.app.get('/get_group_participants', WA.cors, async (req, res) => {
    var group_id = req.query.group_id;
    var access_token = req.query.access_token;
    var instance_id = req.query.instance_id;

    await WA.check_token(access_token, instance_id, false, res, async function(status){
        await WA.instance(instance_id, false, false, res, function(client){
            WA.get_group_participants(client, group_id, res);
        });
    });
});

WA.app.post('/send_message', WA.cors, async (req, res) => {
    var access_token = req.query.access_token;
    var instance_id = req.query.instance_id;

    await WA.check_token(access_token, instance_id, true, res, async function(status){
        await WA.instance(instance_id, false, false, res, function(client){
            WA.send_message(client, req, res);
        });
    });
});

WA.server.listen(8000, () => {
    console.log(Text.whatsapp_live);
});
