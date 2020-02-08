import React from 'react';
import PropTypes from 'prop-types';

import { Meta, MetaWrap } from './util/styleEl';

const MetaMain = ({ date, children }) => {
  return (
    <MetaWrap>
      <Meta>
        <time dateTime={date}>{date}</time>
      </Meta>
      <Meta>{children}</Meta>
    </MetaWrap>
  );
};

MetaMain.propTypes = {
  children: PropTypes.node.isRequired,
  date: PropTypes.string.isRequired,
};

export default MetaMain;
