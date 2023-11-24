var aws = require('aws-sdk')
var dynamoDB = new aws.DynamoDB()

// import AWS from '/var/runtime/node_modules/aws-sdk/lib/aws.js';
// const AWS = require('/var/runtime/node_modules/aws-sdk/lib/aws.js');
// const { DynamoDB } = AWS;

// const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let date = new Date()
    if (event.request.userAttributes.sub) {
        let params = {
            Item: {
                'id': {S: event.request.userAttributes.sub},
                '__typename': {S: 'User'},
                'username': {S: event.userName},
                'email': {S: event.request.userAttributes.email},
                'createdAt': {S: date.toISOString()},
                'updatedAt': {S: date.toISOString()},
            },
            // TableName: process.env.USERTABLE
            TableName: "User-g7ab4itrhbcmdlwi4hva42epbm-dev"
        }

        try {
            await dynamoDB.putItem(params).promise()
            console.log("Success")
        } catch (err) {
            console.log("Error", err)
        }

        // Add entries to the board table
        for (let i = 1; i <= 3; i++) {
          let boardParams = {
              Item: {
                  'id': {S: `${event.request.userAttributes.sub}-board${i}`},
                  'name': {S: `${i}`},
                  'user': {S: event.request.userAttributes.sub},
              },
              TableName: process.env.BOARDTABLE
          }

          try {
              await dynamoDB.putItem(boardParams).promise()
              console.log(`Board ${i} created`)
          } catch (err) {
              console.log("Error", err)
          }
      }


        console.log("Success: Everything executed correctly")
        return null

    } else {
        console.log("Error: Nothing was written to DynamoDB")
        return null
    }
};