import React from 'react';

const SubMenu = ({ items, path }) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.slug}>
          <a href={`${path}/${item.slug}`}>{item.title}</a>
          {item.children && item.children.length > 0 && (
            <SubMenu items={item.children} path={path} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;
