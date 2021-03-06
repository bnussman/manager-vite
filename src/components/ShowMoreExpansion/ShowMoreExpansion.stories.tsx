import * as React from 'react';
import Typography from 'src/components/core/Typography';
import ShowMoreExpansion from './ShowMoreExpansion';

export default {
  title: 'UI Elements/Accordion/ShowMoreExpansion',
};

export const Default = () => (
  <ShowMoreExpansion name="Show Older Images" defaultExpanded={false}>
    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Typography>
  </ShowMoreExpansion>
);

Default.story = {
  name: 'default',
};

export const DefaultExpanded = () => (
  <ShowMoreExpansion name="Show Expanded" defaultExpanded={true}>
    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Typography>
  </ShowMoreExpansion>
);

DefaultExpanded.story = {
  name: 'default expanded',
};
