import React from 'react'
import { Menu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faShare, faClone, faPen, faImage, faCircleInfo, faArrowUpRightFromSquare, faLock, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const DropdownComponent = () => {
  return (
    <div className='menu fade-in'>
      <Menu menuButton={<i className="fa-solid fa-ellipsis" />} transition>
        {...menuItems}
      </Menu>
    </div>
  );
}

export default DropdownComponent;



const menuItemsData = [
  {
    url: '',
    title: 'Share',
    icon: <FontAwesomeIcon icon={faShare} />,
    favicon: null
  },

  {
    url: '',
    title: 'Copy board link',
    icon: <FontAwesomeIcon icon={faLink} />,
    favicon: null
  },

  null,

  {
    url: '',
    title: 'Duplicate',
    icon: <FontAwesomeIcon icon={faClone} />,
    favicon: null
  },

  {
    url: '',
    title: 'Rename',
    icon: <FontAwesomeIcon icon={faPen} />,
    favicon: null
  },

  {
    url: '',
    title: 'Change thumbnail',
    icon: <FontAwesomeIcon icon={faImage} />,
    favicon: null
  },

  {
    url: '',
    title: 'Board details',
    icon: <FontAwesomeIcon icon={faCircleInfo} />,
    favicon: null
  },

  {
    url: '',
    title: 'Open in new tab',
    icon: <FontAwesomeIcon icon={faArrowUpRightFromSquare} />,
    favicon: null
  },

  {
    url: '',
    title: 'Make board private',
    icon: <FontAwesomeIcon icon={faLock} />,
    favicon: null
  },

  null,

  {
    url: '',
    title: 'Delete',
    icon: <FontAwesomeIcon icon={faTrashCan} />,
    favicon: null
  },
].map((item, idx) => item ? ({ ...item, id: idx + 1 }) : null);

const menuItems = menuItemsData.map((item) => (
  item ? <MenuItem className='menu-item' id={`item-${item.id}`}>{item.icon}<span>{item.title}</span></MenuItem> : <hr/>
));