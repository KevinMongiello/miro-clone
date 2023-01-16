import React, { useState } from 'react'
import MenuItem from './MenuItem'
import '../home.css'

const Dropdown = () => {
  const menuItems = [
    {
      url: '',
      title: 'Share',
      favicon: null
    },

    {
      url: '',
      title: 'Copy board link',
      favicon: null
    },

    {
      url: '',
      title: 'Duplicate',
      favicon: null
    },

    {
      url: '',
      title: 'Rename',
      favicon: null
    },

    {
      url: '',
      title: 'Change thumbnail',
      favicon: null
    },

    {
      url: '',
      title: 'Board details',
      favicon: null
    },

    {
      url: '',
      title: 'Open in new tab',
      favicon: null
    },

    {
      url: '',
      title: 'Make board private',
      favicon: null
    },

    {
      url: '',
      title: 'Delete',
      favicon: null
    },
  ].map((item, idx) => ({ ...item, id: idx + 1 }));

  return (
    <ul className="dropdown list">
      <MenuItem { ...menuItems[0]} />
      <MenuItem {...menuItems[1]} />
      <hr className='break'></hr>
      {
        ...menuItems.slice(2, 8)
          .map(menuItemProps => <MenuItem { ...menuItemProps } />)
      }
      <hr className='break'></hr>
      <MenuItem {...menuItems[8]} />
    </ul>
  )
};

export default Dropdown
