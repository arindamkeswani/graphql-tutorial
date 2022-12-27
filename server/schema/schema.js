const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql; //Required to define a new "type" or a schema

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },

    })
});

//"fields" property is a function to establish linkage between different Types, allowing us to refer to one type from another
// fields is going to return the object that is defined within it 
// For each field, define its type such as String (e.g. GraphQLString), Integer, etc.

// A Schema is used to:
// 1. Define a Type
// 2. Define a relationship between Types
// 3. Define Root Queries (The point at which we enter the graph)

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parent, args){
                //code to get data from DB or some other source
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})