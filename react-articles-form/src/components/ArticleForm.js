import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ArticleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange({target: {name, value}}) {
        this.setState({[name]: value});
    }

    resetForm() {
        const cleanState = {};
        let key;
        for(key in this.state) {
            cleanState[key] = '';
        }
        this.setState(cleanState);
    }

    onSubmit(e) {
        e.preventDefault();
        const result = this.props.onSubmit(this.state);
        console.log(result);
        if(result) this.resetForm();
    }

    render() {
        const {title, content} = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Titolo:</label>
                    <input name="title" value={title} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Contenuto:</label>
                    <input name="content" value={content} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <input type="submit" value="Inserisci articolo"/>
                </div>
            </form>
        );
    }

}

ArticleForm.propTypes = {
    onSubmit: Function
}

export default ArticleForm;