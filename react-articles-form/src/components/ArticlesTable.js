import React from 'react';
import PropTypes from 'prop-types';

const ArticleRow = ({id, title, content, onDelete}) => (
    <tr>
        <td>{title}</td>
        <td>{content}</td>
        <td>
            <button onClick={() => onDelete(id)}>elimina</button>
        </td>
    </tr>
);

ArticleRow.defaultProps = {
    id: '',
    title: '',
    content: ''
}

ArticleRow.propTypes = {
    id: String,
    title: String,
    content: String,
    onDelete: Function
}

const ArticlesTable = ({articles, onDelete}) => {
    if(articles.length <= 0) return <p>Nessun articolo da mostrare</p>;
    return (
        <table>
            <thead>
                <tr>
                    <th>Titolo</th>
                    <th>Contenuto</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {articles.map(art => <ArticleRow {...art} key={art.id} onDelete={onDelete}/>)}
            </tbody>
        </table>
    )
}

ArticlesTable.defaultProps = {
    articles: []
}

ArticleRow.propTypes = {
    articles: Array,
    onDelete: Function
}

export default ArticlesTable;