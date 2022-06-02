import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { ListItem } from './index';
import { ListItemProps } from './types';
import { MyStore } from 'src/store/Provider';
import { IData } from 'src/config/types';
import { Bullet } from '../Bullet';
import userEvent from '@testing-library/user-event';


describe('test list item', () => {
  const
    data: IData = {
      camp: 'camp',
      country: 'egypt',
      lessons: 33,
      id: "1",
      month: 'jun',
      school: 'mubarak'
    },
    color = '#454545',
    icon = <Bullet />,
    onClick = (item: IData) => {
      for(const [key, val] of Object.entries(item))
        expect(val).toBe(data[key as keyof IData]);
    };

  const props: ListItemProps<IData> = {
    data,
    onClick,
    color,
    icon,
  };

  test("on click should generate correct data", async () => {
    const { container } = render(
      <MyStore>
        <ListItem {...props} />
      </MyStore>
    );

    const elms = await container.getElementsByClassName('list-item-cont') as HTMLCollectionOf<HTMLDivElement>;
    userEvent.click(elms[0]);
  });

  test("component should get correct num of lessons", async () => {
    const { container } = render(
      <MyStore>
        <ListItem {...props} />
      </MyStore>
    );

    const elmContainLessons = await container.getElementsByClassName('list-item-num');
    expect(elmContainLessons[0].textContent === data.lessons.toString()).toBeTruthy();
  });


  test("component should get correct name of school", async () => {
    const { container } = render(
      <MyStore>
        <ListItem {...props} />
      </MyStore>
    );

    const elmContainSchoolName = await container.getElementsByClassName('list-item-school');
    expect(elmContainSchoolName[0].textContent === `in ${data.school}`).toBeTruthy();
  });


  test("component shouldn't have icon element if icon doesn't being passed", async () => {
    const { container } = render(
      <MyStore>
        <ListItem {...{
          ...props,
          icon: undefined
        }} />
      </MyStore>
    );
    const iconElms = await container.getElementsByClassName('list-item-left-cont');
    expect(iconElms.length).toBe(0);
  });

});