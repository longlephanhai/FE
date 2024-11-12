import React from 'react';

const SelectTree = ({ items, level = 1, parentId = "" }) => {
  const prefix = Array(level + 1).join("-- ");

  return (
    <>
      {items.map(item => (
        <React.Fragment key={item._id}>
          <option value={item._id} selected={item._id === parentId}>
            {prefix}{item.title}
          </option>
          {item.children && item.children.length > 0 && (
            <SelectTree items={item.children} level={level + 1} parentId={parentId} />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default SelectTree;
