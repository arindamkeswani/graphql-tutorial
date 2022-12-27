const express = require('express');
const { graphqlHTTP } = require('express-graphql'); //used to make express and graphql interact
const schema = require("./schema/schema");

const app = express();

// We can pass options in the object below
app.use('/graphql', graphqlHTTP({
    schema: schema
}))
// This route, as it is now, will give the following output:
// {"errors":[{"message":"GraphQL middleware options must contain a schema."}]}

// This is because GraphQL needs a schema (which may by represented by a graph, as our data is traversable)
// Express-graphql needs to know how our graph looks, for which is needs a Schema  

app.listen(4000, ()=>{
    console.log(`Listening on Port: 4000`);
})