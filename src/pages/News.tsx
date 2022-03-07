import type { Component } from 'solid-js';
import { NewsList } from '../NewsList';

const News: Component = () => {
  return (
    <div class='p-8 flex flex-col gap-4'>
      <NewsList></NewsList>
    </div>
  );
};

export default News;
