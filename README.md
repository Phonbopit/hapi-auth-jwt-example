# hapi-auth-jwt-example
Example how to implement JWT in Hapi.js

## Usage

```
npm install
npm start
```

## Example


```
curl -i http://localhost:5000/

curl -i -H "authorization: <TOKEN> http://localhost:5000/me"
```