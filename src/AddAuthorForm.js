import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import "./AddAuthorForm.css";

class AuthorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageUrl: "",
            books: [],
            bookTemp: ""
        }
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
    }

    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }

    handleAddBook(event){
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="AddAuthorForm__input">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}></input>
                </div>
                <div className="AddAuthorForm__input">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange}></input>
                </div>
                <div className="AddAuthorForm__input">
                    <label htmlFor="bookTemp">Book</label>
                    {this.state.books.map((book) => <p key={book}>{book}</p>)}
                    <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}></input>
                    <input type="button" value="+" onClick={this.handleAddBook}></input>
                </div>
                <input type="submit" value="Add"></input>
            </form>);
    }
}


function AddAuthorForm({ match, onAddAuthor }) {
    return (
        <div className="AddAuthorForm">
            <h1>Add Author</h1>
            <AuthorForm onAddAuthor={onAddAuthor} />
        </div>);
}

//props will be provided by withRouter
function mapDispatchToProps(dispatch,props){
    return {
        onAddAuthor: (author) => {
            dispatch({ type: "ADD_AUTHOR", author});
            props.history.push('/');
        }
    };
}

//Our AddAuthorForm doesn't need any state props from its parent (AuthorQuiz), so it can be an empty function
//we Wrap the function with "withRouter", so that AddAuthorForm gets its history prop and we are able to redirect
//the user to the initial page
export default withRouter(connect(()=> {},mapDispatchToProps)(AddAuthorForm));