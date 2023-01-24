import { useQuery } from '@apollo/client';
import {getAuthorsQuery} from '../Queries/queries';
import {useState} from 'react';



function AddBook(props) {

    const [details, setDetails] = useState({
        name: "",
        genre: "",
        author: ""  
    })

    const { loading, error, data } = useQuery(getAuthorsQuery);

    
    if (loading) return <option disabled>Loading authors...</option>;
    if (error) return <option disabled>Error :(</option>;

    function displayAuthors(){
        return data.authors.map(author =>{
            return <option key={author.id} value={author.id}>{author.name}</option>
        })
    }

    function updateDetails(key, value){
        setDetails({
            ...details,
            [`${key}`] : value
        })
    }

    function submitForm(e){
        e.preventDefault(); //prevent page refresh
        console.log(details);
    }

    return (
        <form id="add-book" onSubmit={submitForm.bind(this)}>

            <div className="field">
                <label>Book name:</label>
                <input type="text" name="name" value={details.name}
                onChange={ (e) => {updateDetails(e.target.name, e.target.value)} }
                />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" name="genre" value={details.genre}
                onChange={ (e) => {updateDetails(e.target.name, e.target.value)} }
                />
            </div>

            <div className="field">
                <label>Author:</label>
                <select name="author" value={details.author}
                onChange={ (e) => {updateDetails(e.target.name, e.target.value)} }
                
                >
                    <option>Select Author</option>
                    {displayAuthors()}
                </select>
            </div>

            <button>Add</button>

        </form>
    )
}

export default AddBook