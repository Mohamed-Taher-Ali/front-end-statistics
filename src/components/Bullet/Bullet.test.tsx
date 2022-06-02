import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Bullet } from './index';
import { BulletProps } from './types';
import { MyStore } from 'src/store/Provider';


describe('test bullet', () => {

  const props: BulletProps = {
    color: "#545454",
    size: 10
  };
  const div1Border = `2px solid ${props.color}`;
  const div2backgroundColor = `2px solid ${props.color}`;
  const div2Styles = {
    width: `${props.size}px`,
    height: `${props.size}px`,
  };

  const { container } = render(
    <MyStore>
      <Bullet {...props} />
    </MyStore>
  );

  test("test bullet props inversion", async () => {
    const elms: HTMLCollectionOf<HTMLDivElement> = await container.getElementsByTagName('div') ;
    
    const div1 = elms[0];
    const div2 = elms[1];
    
    expect(div1.style.border).toBe(div1Border);
    expect(div2).toHaveStyle({'backgroundColor': div2backgroundColor});
    for(const [key, val] of Object.entries(div2Styles))
      expect(div2.style[key as keyof CSSStyleDeclaration]).toBe(val);
  });

});