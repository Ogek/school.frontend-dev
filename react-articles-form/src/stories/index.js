import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import ArticlesForm from '../components/ArticleForm';
import ArticlesTable from '../components/ArticlesTable';



storiesOf('Form', module).add('default', () => <ArticlesForm/>);


storiesOf('Table', module)
  .add('default', () => {
    const state = {
      articles: [{id: '349824', title: 'wewe', content: ''}]
    }
    return <ArticlesTable {...state}/>
  })
  .add('empty', () => <ArticlesTable/>)