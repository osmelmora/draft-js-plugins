import DefaultDivider from './components/DefaultDivider';
import DefaultButton from './components/DividerButton';

import addDivider from './modifiers/addDivider';

import dividerStyles from './dividerStyles.css';

const defaultTheme = {
  divider: dividerStyles.divider
};

const createDividerPlugin = ({
  entityType = 'divider',
  dividerComponent = DefaultDivider,
  buttonComponent = DefaultButton,
  theme = defaultTheme,
  decorator
} = {}) => {
  let Divider = dividerComponent;

  if (typeof decorator === 'function') {
    Divider = decorator(Divider);
  }

  const ThemedDivider = props => {
    return <Divider {...props} theme={theme} />
  };
  let Button = buttonComponent;
  const DecoratedButton = props => {
    return <Button {...props} entityType={entityType} addDivider={addDivider(entityType)} />
  }

  return {
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === 'atomic') {
        const contentState = getEditorState().getCurrentContent();
        const entity = block.getEntityAt(0);
        if (!entity) return null;
        const type = contentState.getEntity(entity).getType();
        if (type === entityType) {
          return {
            component: ThemedDivider,
            editable: false
          };
        }
      }

      return null;
    },
    DividerButton: DecoratedButton,
    addDivider: addDivider(entityType)
  };
};

export default createDividerPlugin;
