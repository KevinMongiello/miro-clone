import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

interface DropdownComponentProps {
  handleDelete: () => void;
}

const DropdownComponent = (props: DropdownComponentProps) => {
  const menuItemsData = [
    {
      handler: null,
      title: 'Share',
      icon: <i className="fa-solid fa-share-from-square"></i>,
      favicon: null,
    },

    {
      handler: null,
      title: 'Copy board link',
      icon: <i className="fa-solid fa-copy"></i>,
      favicon: null,
    },

    null,

    {
      handler: null,
      title: 'Duplicate',
      icon: <i className="fa-regular fa-clone"></i>,
      favicon: null,
    },

    {
      handler: null,
      title: 'Rename',
      icon: <i className="fa-solid fa-pen-to-square"></i>,
      favicon: null,
    },

    {
      handler: null,
      title: 'Change thumbnail',
      icon: <i className="fa-solid fa-image"></i>,
      favicon: null,
    },

    {
      handler: null,
      title: 'Board details',
      icon: <i className="fa-solid fa-circle-info"></i>,
      favicon: null,
    },

    {
      handler: null,
      title: 'Open in new tab',
      icon: <i className="fa-solid fa-arrow-up-from-bracket"></i>,
      favicon: null,
    },

    {
      handler: null,
      title: 'Make board private',
      icon: <i className="fa-solid fa-lock"></i>,
      favicon: null,
    },

    null,

    {
      handler: props.handleDelete,
      title: 'Delete',
      icon: <i className="fa-solid fa-lock"></i>,
      favicon: null,
    },
  ].map((item, idx) => (item ? { ...item, id: idx + 1 } : null));

  const menuItems = menuItemsData.map((item) =>
    item ? (
      <MenuItem onClick={item.handler || (() => {})} className="menu-item" id={`item-${item.id}`}>
        {item.icon}
        <span>{item.title}</span>
      </MenuItem>
    ) : (
      <hr />
    ),
  );

  return (
    <div className="menu fade-in">
      <Menu
        menuButton={
          <MenuButton>
            <div className="menu-btn-container">
              <i className="fa-solid fa-ellipsis" />
            </div>
          </MenuButton>
        }
        transition
      >
        {...menuItems}
      </Menu>
    </div>
  );
};

export default DropdownComponent;

