import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

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
        name: 'J. K. Rowling',
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
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSorce: 'Wikimedia Commons',
        books: ['n']
    },
    {
        name: 'Stephen King',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSorce: 'Wikimedia Commons',
        books: ['The Shining, IT']
    },
    {
        name: 'Wiliam Shakespeare',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSorce: 'Wikimedia Commons',
        books: ['Hamlet','Macbeth','Romeo and Juliet']
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSorce: 'Wikimedia Commons',
        books: ['David Copperfield', 'A Tale of Two Cities']
    },
]

function getTurnData(authors){
    //selecting all books from all authors and concatenating in one object
    const allBooks = authors.reduce(function(p,c,i){
        return p.concat(c.books)
    }, []);
    const fourRandomBooks = shuffle(allBooks.slice(0,4));
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => 
            author.books.some((title) =>
            title === answer))
    }
}

const state = {
    turnData: getTurnData(authors),
    highlight: ''
}

function onAnswerSelected(answer){
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}

function render(){
    ReactDOM.render(<AuthorQuiz  {...state} onAnswerSelected={onAnswerSelected}/>, document.getElementById('root'));
}

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
