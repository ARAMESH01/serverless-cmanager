'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const middy = require('middy');
const { cors } = require('middy/middlewares');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const handler = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  console.log(data);

  // if (typeof data.text !== 'string') {
  //   console.error('Validation Failed');
  //   callback(null, {
  //     statusCode: 400,
  //     headers: { 'Content-Type': 'text/plain' },
  //     body: 'Couldn\'t create the todo item.',
  //   });
  //   return;
  // }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      user_id: data.userId,
      first_name: data.firstName,
      last_name: data.lastName,
      user_email: data.email,
      user_phone: data.phone,
      created_ts: timestamp,
      updated_ts: timestamp,
    },
  };

  // write the todo to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        // headers: { 
        //   'Content-Type': 'text/plain' ,
        //   'Access-Control-Allow-Origin': '*',
        //   'Access-Control-Allow-Credentials': true,
        // },
        body: 'Couldn\'t create item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Credentials': true,
      // },
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};

const create = middy(handler).use(cors()); // Adds CORS HTTP headers to responses
module.exports = { create };
