import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

const DropdownComponent = () => {
  return (
    <div className='menu fade-in'>
      <Menu
        menuButton={<MenuButton><div className='menu-btn-container'><i className="fa-solid fa-ellipsis" /></div></MenuButton>}
        transition>
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
    icon: <i className="fa-solid fa-share-from-square"></i>,
    favicon: null
  },

  {
    url: '',
    title: 'Copy board link',
    icon: <i className="fa-solid fa-copy"></i>,
    favicon: null
  },

  null,

  {
    url: '',
    title: 'Duplicate',
    icon: <i className="fa-regular fa-clone"></i>,
    favicon: null
  },

  {
    url: '',
    title: 'Rename',
    icon: <i className="fa-solid fa-pen-to-square"></i>,
    favicon: null
  },

  {
    url: '',
    title: 'Change thumbnail',
    icon: <i className="fa-solid fa-image"></i>,
    favicon: null
  },

  {
    url: '',
    title: 'Board details',
    icon: <i className="fa-solid fa-circle-info"></i>,
    favicon: null
  },

  {
    url: '',
    title: 'Open in new tab',
    icon: <i className="fa-solid fa-arrow-up-from-bracket"></i>,
    favicon: null
  },

  {
    url: '',
    title: 'Make board private',
    icon: <i className="fa-solid fa-lock"></i>,
    favicon: null
  },

  null,

  {
    url: '',
    title: 'Delete',
    icon: <i className="fa-solid fa-lock"></i>,
    favicon: null
  },
].map((item, idx) => item ? ({ ...item, id: idx + 1 }) : null);

const menuItems = menuItemsData.map((item) => (
  item ? <MenuItem className='menu-item' id={`item-${item.id}`}>{item.icon}<span>{item.title}</span></MenuItem> : <hr/>
));