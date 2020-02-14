import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import cx from 'classnames';

import base from '../styles/base.module.css';
import main from '../styles/main.module.css';

const Archive = ({ link }) => {
  return (
    <div
      className={cx(base.flex, base.justifyEnd, base.w100, main.archiveLink)}
    >
      <Link to={link}>
        <h3 className={base.pa0}>
          Archive
          <span className={base.dib} aria-hidden="true">
            {String.fromCharCode(8594)}
          </span>
        </h3>
      </Link>
    </div>
  );
};

Archive.propTypes = {
  link: PropTypes.string.isRequired,
};

export default Archive;
