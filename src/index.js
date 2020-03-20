import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { shuffle, sample } from 'underscore';
import { BrowserRouter, Route } from 'react-router-dom';

import AddAuthorForm from './AddAuthorForm';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSorce: 'Wikimedia Commons',
        books: [
            'The Adventures of Huckeberry Finn',
            'Life on The Mississipi',
            'Roughing it'
        ]
    },
    {
        name: 'J.K. Rowling',
        imageUrl: 'images/authors/jkrowling.jpg',
        imageSorce: 'Wikimedia Commons',
        books: ['Harry Potter and the Sorcerer\'s Stone']
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/josephconrad.jpg',
        imageSorce: 'Wikimedia Commons',
        books: ['Heart of Darkness']
    },
    {
        name: 'Stephen King',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSorce: 'Wikimedia Commons',
        books: ['The Shining', 'IT']
    },
    {
        name: 'Wiliam Shakespeare',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSorce: 'Wikimedia Commons',
        books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSorce: 'Wikimedia Commons',
        books: ['David Copperfield', 'A Tale of Two Cities']
    },
]

function getTurnData(authors) {
    //selecting all books from all authors and concatenating in one object
    const allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books)
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);

    //find author whose answer was selected
    return {
        books: fourRandomBooks,
        author: authors.find((author) =>
            author.books.some((title) =>
                title === answer))
    }
}

//----- REDUX IMPLEMENTATION

//our reducer will define the initial state 
//it will also define our actions that will go into the store
//actions will alter the state, based on the action selected. They MUST return a new object.
function reducer(state = {
    authors,
    turnData: getTurnData(authors),
    highlight: ''
}, action) {
    switch (action.type) {
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
            return Object.assign({},
                state,
                {
                    highlight: isCorrect ? 'correct' : 'wrong'
                }
            );
        case 'CONTINUE':
            return Object.assign({}, state, {
                highlight: '',
                turnData: getTurnData(state.authors)
            });
        case 'ADD_AUTHOR':
            return Object.assign({}, state, {
                authors: state.authors.concat([action.author])
            });
        default: return state;
    }
}

let store = Redux.createStore(reducer);
//----- REDUX IMPLEMENTATION


//normally you would pass the state as a prop to AuthorQuiz ({...state})
//But we will connect the state as a prop in the AuthorQuiz component with the react-redux connect function.
//This way, the component will have access to the state, without having it passed as a prop!
ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <>
                <Route exact path="/" component={AuthorQuiz} />
                <Route path="/add" component={AddAuthorForm} />
            </>
        </ReactRedux.Provider>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
