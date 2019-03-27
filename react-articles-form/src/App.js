import React, { Component } from 'react';

import ArticleForm from './components/ArticleForm.js';
import ArticlesTable from './components/ArticlesTable.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      error: null
    };

    this.addArticle = this.addArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  generateArticleId() {
    //TODO: check unity
    return Math.random().toString(36).substr(2, 16);
  }

  addArticle(article) {
    let res = true;
    this.setState(state => {
      const {articles} = state;
      const exists = articles.findIndex((art) => art.title === article.title);
      if(exists !== -1) {
        res = false;
        return {
          error: 'Non è possibile inserire due articoli con lo stesso titolo'
        }
      }
      article.id = this.generateArticleId();
      return {
        articles: [...articles, article],
        error: null 
      }
    });

    return res;
  }

  deleteArticle(id) {
    this.setState(state => {
      const {articles} = state;
      return {
        articles: [...articles.filter(art => art.id !== id)]
      }
    });
  }

  render() {
    const {articles, error} = this.state;
    return (
      <>
        <ArticlesTable articles={articles} onDelete={this.deleteArticle}/>
        <ArticleForm onSubmit={this.addArticle}/>
        <p className="error">{error}</p>
      </>
    );
  
  }
}

export default App;
