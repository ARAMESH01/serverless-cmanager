"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies
const mysql = require("mysql");
const middy = require("middy");
const { cors } = require("middy/middlewares");

const handler = (event, context, callback) => {
  const connection = mysql.createConnection({
    host:
      "opportunitycluster-1.cluster-cgyejm3yqryp.us-east-2.rds.amazonaws.com",
    user: "opportunityadmin",
    password: "Quad#52722",
    database: "opportunitydb",
    port: 3281
  });

  const queryStr =
    "SELECT USER_ID, USER_CD, USER_FIRST_NM, USER_LAST_NM, USER_EMAIL, USER_PHONE, USER_ROLE, USER_PW FROM SEC_USER";
  console.log(`Query String: ${queryStr}`);

  connection.query(queryStr, function(error, results, fields) {
    if (error) {
      connection.destroy();
      throw error;
    } else {
      console.log(results);
      console.log(fields);
      const response = {
        statusCode: 200,
        body: JSON.stringify(results)
      };

      callback(error, response);
      connection.end(function(err) {
        callback(err, response);
      });
    }
  });
};

const get = middy(handler).use(cors()); // Adds CORS HTTP headers to responses
module.exports = { get };
