const graphql = require('graphql');
const _ = require("lodash");

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID
} = graphql; //Required to define a new "type" or a schema

//GraphQLID can search for an ID whether it is a String or not

// Dummy Data
var books =[
    {name: "Atomic Habits", genre: 'Non-Fiction', id: "1"},
    {name: "Star Wars: The Prequels", genre: 'Sci-Fi', id: "2"},
    {name: "Star Trek", genre: 'Sci-Fi', id: "3"},
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        id: {
            type: GraphQLID
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
                    type: GraphQLID
                }
            },
            resolve(parent, args){
                //code to get data from DB or some other source
                console.log(typeof(args.id))
                return _.find(books, {id: args.id})
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})