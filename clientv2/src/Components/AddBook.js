import { gql, useQuery } from '@apollo/client';

const getAuthorsQuery = gql`
  {
    authors{
      name
      id
    }
  }
`

function AddBook(props) {

    const { loading, error, data } = useQuery(getAuthorsQuery);

    
    if (loading) return <option disabled>Loading authors...</option>;
    if (error) return <option disabled>Error :(</option>;

    function displayAuthors(){
        return data.authors.map(author =>{
            return <option key={author.id} value={author.id}>{author.name}</option>
        })
    }

    return (
        <form id="add-book">

            <div className="field">
                <label>Book name:</label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Author:</label>
                <select>
                    <option>Select Author</option>
                    {displayAuthors()}
                </select>
            </div>

            <button>Add</button>

        </form>
    )
}

export default AddBook