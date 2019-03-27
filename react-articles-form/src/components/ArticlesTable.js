import React from 'react';


const ArticleRow = ({id, title, content, onDelete}) => (
    <tr>
        <td>{title}</td>
        <td>{content}</td>
        <td>
            <button onClick={() => onDelete(id)}>elimina</button>
        </td>
    </tr>
);

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
                {articles.map((art) => <ArticleRow {...art} key={art.id} onDelete={onDelete}/>)}
            </tbody>
        </table>
    )
}

export default ArticlesTable;