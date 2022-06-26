import type { Component } from 'solid-js';
import { Menu, MenuTitle } from '../../components/Menu';
import { SectionHeader } from '../../components/SectionHeader.jsx';

const Lunch: Component = () => {
  return (
    <main>
      <section>
        <SectionHeader title={<MenuTitle></MenuTitle>}></SectionHeader>
        <div class='flex flex-col gap-4 p-8'>
          <Menu title='Express Johanneberg' name='johanneberg-express'></Menu>
          <Menu title='Kårresturangen Johanneberg' name='karresturangen'></Menu>
          <Menu title='Hyllan' name='hyllan'></Menu>
          <Menu title='S.M.A.K' name='smak'></Menu>
          <Menu title='Linsen' name='linsen'></Menu>
        </div>
      </section>
    </main>
  );
};

export default Lunch;
