import type { Component } from 'solid-js';
import { NewsList } from '../NewsList';

const News: Component = () => {
  return (
    <div class='flex flex-col gap-4 p-8'>
      <NewsList></NewsList>
    </div>
  );
};

export default News;
