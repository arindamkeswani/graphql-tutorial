const graphql = require('graphql');
const _ = require("lodash");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql; //Required to define a new "type" or a schema

//GraphQLID can search for an ID whether it is a String or not

// Dummy Data
var books = [
    { name: "Atomic Habits", genre: 'Self-help', id: "1", authorId: "4" },
    { name: "Star Wars: The Empire Strikes Back", genre: 'Sci-Fi', id: "2", authorId: "2" },
    { name: "Rich Dad Poor Dad", genre: 'Self-help', id: "3", authorId: "3" },
    { name: "Cash Flow", genre: 'Self-help', id: "4", authorId: "3" },
    { name: "The 80/20 Principle", genre: 'Self-help', id: "5", authorId: "3" },
    { name: "Atomic Habits 2", genre: 'Self-help', id: "6", authorId: "4" },

]

var authors = [
    { name: "Naval Ravikant", age: 48, id: '1' },
    { name: "George Lucas", age: 78, id: '2' },
    { name: "Robert Kiyosaki", age: 75, id: '3' },
    { name: "James Clear", age: 75, id: '4' },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args) { 
                return _.find(authors, { id: parent.authorId })
            }
        }

    })
});

//"fields" property is a function to establish linkage between different Types, allowing us to refer to one type from another
// fields is going to return the object that is defined within it 
// For each field, define its type such as String (e.g. GraphQLString), Integer, etc.

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorId: parent.id})
            }
        }

    })
});

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
            resolve(parent, args) {
                //code to get data from DB or some other source
                // console.log(typeof(args.id))
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //code to get data from DB or some other source
                // console.log(typeof(args.id))
                return _.find(authors, { id: args.id })
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})