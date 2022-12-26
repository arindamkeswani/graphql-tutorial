const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString} = graphql; //Required to define a new "type" or a schema

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