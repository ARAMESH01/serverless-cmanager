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
  const data = JSON.parse(event.body);
  console.log(data);
  let user_pw = new Buffer(data.password).toString("base64");
  const queryStr = `UPDATE SEC_USER SET USER_CD = '${
    data.userCode
  }', USER_FIRST_NM = '${data.firstName}', USER_LAST_NM = '${
    data.lastName
  }', USER_EMAIL = '${data.email}', USER_PHONE = '${
    data.phone
  }', USER_ROLE = '${data.role}', USER_PW = '${user_pw}' WHERE USER_ID = ${
    data.userId
  }`;
  console.log(`Query String: ${queryStr}`);

  connection.query(queryStr, function(error, results, fields) {
    if (error) {
      connection.destroy();
      throw error;
    } else {
      console.log(results);
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

const update = middy(handler).use(cors()); // Adds CORS HTTP headers to responses
module.exports = { update };
