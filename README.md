## Quadyster cManager User Management API

### Create User
```bash
curl -X POST https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/todos --data '{ "user_name": "Foo Bar", "user_email": "foo@bar.com" }'

#example:
curl -X POST https://r72p6t7n79.execute-api.us-east-1.amazonaws.com/dev/users --data '{ "user_name": "Foo Bar", "user_email": "foo@bar.com" }'
```

## Commands
https://serverless.com/

```
# Install serverless globally
# npm (node) should be available
$ npm install serverless -g

# Login to your Serverless account or
#    store AWS credentials in ~/.aws/credentials
$ serverless login

# Create a serverless function
$ serverless create --template aws-nodejs --path my-service

# Change into the newly created directory
$ cd my-service

# Deploy the Service
$ serverless deploy -v

# Invoke the Function
$ serverless invoke -f hello -l

# Fetch the Function Logs
$ serverless logs -f hello -t

# Run your code locally by emulating the AWS Lambda environment
$ serverless invoke local --function hello

# Cleanup
$ serverless remove

# Install MySql
$ npm install mysql --save
```
