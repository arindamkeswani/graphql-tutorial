import { gql, useQuery } from '@apollo/client';
// import { graphql } from '@apollo/client/react/hoc';


const getBooksQuery = gql`
  {
    books{
      name
      genre
      id
    }
  }
`

function BookList() {

  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  function displayBooks() {
    let list = data.books.map(book => {
      return <li key={book.id}>{book.name}</li>
    })

    return list;
  }

  return (
    <div>
      <ul id="book-list">
        {displayBooks()}
      </ul>
    </div>
  );
}

//graphql binds the query to the component, then we export it
// export default graphql(getBooksQuery)(BookList);
export default BookList;