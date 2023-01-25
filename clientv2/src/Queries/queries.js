import { gql } from '@apollo/client';

const getBooksQuery = gql`
  {
    books{
      name
      genre
      id
    }
  }
`

const getAuthorsQuery = gql`
  {
    authors{
      name
      id
    }
  }
`

//Added Type (String, ID) ad variable names (with preceding $ sign) below to pass dynamic values to the mutation. 
//Added ! to ensure that only non-null values are passed

//In addBook params, we specify the aforementioned variables as values
const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            genre
            id
        }
    }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation };