const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {google} = require('googleapis');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const CREDS = process.env.OAUTH2_CREDS;
const TOKEN = process.env.OAUTH2_TOKEN;
const CHAT_SHEET = '1qmT9sDdBpm2OZRN2EZLdT_Iw-iEGDR5rwCj3S-8qqGE';

module.exports = async (req, res) => {
    authorize(JSON.parse(CREDS), writeToTable);

    /**
        * Create an OAuth2 client with the given credentials, and then execute the
        * given callback function.
        * @param {Object} credentials The authorization client credentials.
        * @param {function} callback The callback to call with the authorized client.
    */
    function authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

            oAuth2Client.setCredentials(JSON.parse(TOKEN));
            callback(oAuth2Client);
    }

    /**
        * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
    */
    function writeToTable(auth) {
        const sheets = google.sheets({version: 'v4', auth});

        let today = new Date()
        today = `${("0" + today.getDate()).slice(-2)}.${("0" + (today.getMonth() + 1)).slice(-2)}`

        const checkDate = {
            spreadsheetId: CHAT_SHEET,
            resource: {
                requests: [{
                    findReplace: {
                        "find": today,
                        "replacement": today,
                        "matchEntireCell": true,
                        "sheetId": 0
                    }
                }]
            }
        };

        const values = req.body
        console.log(values)

        var newRow = {
            spreadsheetId: CHAT_SHEET,
            resource: {
                requests: [{
                    appendCells: {
                        sheetId: 0,
                        fields: '*',
                        rows: [{
                            values: [{
                                userEnteredValue: { stringValue: values.name },
                            },
                            {
                                userEnteredValue: { stringValue: values.email },
                            },
                            {
                                userEnteredValue: { stringValue: values.phone }
                            },
                            {
                                userEnteredValue: { stringValue: values.social },
                                userEnteredFormat: {
                                    wrapStrategy: 'CLIP'
                                }
                            },
                            {
                                userEnteredValue: { stringValue: values.cv }
                            },
                            {
                                userEnteredValue: { stringValue: values.about },
                                userEnteredFormat: {
                                    wrapStrategy: 'CLIP'
                                }
                            },
                            {
                                userEnteredValue: { stringValue: values.hero },
                                userEnteredFormat: {
                                    wrapStrategy: 'CLIP'
                                }
                            },
                            {
                                userEnteredValue: { stringValue: values.quest },
                                userEnteredFormat: {
                                    wrapStrategy: 'CLIP'
                                }
                            },
                            {
                                userEnteredValue: { stringValue: values.grammar }
                            },
                            {
                                userEnteredValue: { stringValue: values.kot }
                            },
                            {
                                userEnteredValue: { stringValue: values.origin }
                            }],
                            
                        }],
                        
                    },
                }]
            }
        };

        sheets.spreadsheets.batchUpdate(checkDate, (err, response) => {
            if (err) {
                console.log('The API returned an error: ' + err)
                return
            } else {
                // в гуглотаблицах нет простого поиска по значению, есть только "найти и заменить", поэтому сегодняшнюю дату ищем так
                let hasTodaysDate = response.data.replies[0].findReplace.valuesChanged === 1 && typeof response.data.replies !== 'undefined'

                if (!hasTodaysDate) {
                    let dateRow = {
                        values: [{
                            userEnteredValue: { stringValue: today },
                            userEnteredFormat: {
                                backgroundColor: { red: 1, green: 0.6, blue: 0 },
                                padding: {
                                    "top": 5,
                                    "right": 10,
                                    "bottom": 5,
                                    "left": 10
                                },
                                textFormat: {
                                    "fontSize": 12,
                                },
                                wrapStrategy: 'OVERFLOW_CELL'
                            }
                        }], 
                    }

                    newRow.resource.requests[0].appendCells.rows.unshift(dateRow)
                }

                sheets.spreadsheets.batchUpdate(newRow, (err) => {
                    if (err) {
                        console.log('The API returned an error: ' + err)
                        return res.status(400).send('The API returned an error: ' + err)
                    } else {
                        console.log("Appended")
                        res.status(200).send('success');
                    }
                })
            }
        })
    }
}