import { useQuery } from '@apollo/client';
// import { graphql } from '@apollo/client/react/hoc';
import { getBooksQuery } from '../Queries/queries';
import BookDetails from './BookDetails';
import { useState } from "react";



function BookList() {

  const [selectedBookID, setSelectedBookID] = useState(null);
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  function displayBooks() {
    let list = data.books.map(book => {
      return <li key={book.id} onClick={(e) => { setSelectedBookID(book.id) }}>{book.name}</li>
    })

    return list;
  }

  return (
    <div>
      <ul id="book-list">
        {displayBooks()}
      </ul>
      <BookDetails bookID={selectedBookID}/>
    </div>
  );
}

//graphql binds the query to the component, then we export it
// export default graphql(getBooksQuery)(BookList);
export default BookList;