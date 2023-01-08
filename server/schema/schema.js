const graphql = require('graphql');
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

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
                return Author.findById(parent.authorId)
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
                return Book.find({
                    authorId: parent.id
                })
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
                return Book.findById(args.id)
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
                return Author.findById(args.id)
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({})
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({})
            }
        }
    }
})

//Mutations need to be specifically defined in GraphQL. These are used to Add, Edit, & Delete data from the DB
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor : {
            type: AuthorType,
            args: {
                name: {
                    type: GraphQLString
                },
                age: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                }) //Same Author as the one imported above

                return author.save();
            }
        },
        addBook : {
            type: BookType,
            args: {
                name: {
                    type: GraphQLString
                },
                genre: {
                    type: GraphQLString
                },
                authorId:{
                    type: GraphQLID
                }
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                }) //Same Author as the one imported above

                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})