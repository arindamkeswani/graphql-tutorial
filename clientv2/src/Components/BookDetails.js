import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../Queries/queries';

function BookDetails(props) {

    const { loading, error, data } = useQuery(getBookQuery, {
        variables: {
            id: props.bookID
        }
    });

    function displayBookDetails(){
        let {book}=data ? data : {} ;
        console.log(book)
        
        if(book){
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>Other books by this author:</p>
                    <ul className="other-books">
                        {
                            book.author.books.filter( row => {return row.name!=book.name} )
                            .map( item=> { 
                                return <li key={item.id}>{item.name}</li>
                             })
                        }
                    </ul>
                </div>
            )
        }
        else{
            return (
                <div>No book selected</div>
            )
        }
    }

return (
    <div id="book-details">
       {displayBookDetails()}
    </div>
)
}

export default BookDetails;