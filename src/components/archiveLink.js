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
      <Link className={base.tdn} data-testid="archive" to={link}>
        <span className={main.sr}>View</span>
        Archive
        <span className={base.dib} aria-hidden="true">
          &gt;
        </span>
      </Link>
    </div>
  );
};

Archive.propTypes = {
  link: PropTypes.string.isRequired,
};

export default Archive;
