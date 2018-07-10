'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const mysql = require('mysql');
const middy = require('middy');
const { cors } = require('middy/middlewares');

const handler = (event, context, callback) => {  
  const connection = mysql.createConnection({
    host: 'opportunitycluster-1.cluster-cgyejm3yqryp.us-east-2.rds.amazonaws.com',
    user: 'opportunityadmin',
    password: 'Quad#52722',
    database: 'opportunitydb',
    port: 3281
  });
  const data = JSON.parse(event.body);
  console.log(data);
  const queryStr = `INSERT INTO SEC_USER (USER_ID, USER_CD, USER_FIRST_NM, USER_LAST_NM, USER_EMAIL, USER_PHONE) VALUES (${data.userId}, '${data.userCode}', '${data.firstName}', '${data.lastName}', '${data.email}', '${data.phone}')`;
  console.log(`Query String: ${queryStr}`);

  connection.query(queryStr, function (error, results, fields) {
      if (error) {
          connection.destroy();
          throw error;
      } else {
          console.log(results);
          const response = {
            statusCode: 200,
            body: JSON.stringify(results),
          };
      
          callback(error, response);
          connection.end(function (err) { callback(err, response);});
      }
  });
};

const create = middy(handler).use(cors()); // Adds CORS HTTP headers to responses
module.exports = { create };
