import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';


const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`

function BookList(props) {

  console.log(props);

  return (
    <div>
      <ul id="book-list">
        <li>Book name</li>
      </ul>
    </div>
  );
}

//graphql binds the query to the component, then we export it
export default graphql(getBooksQuery)(BookList);
