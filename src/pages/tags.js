import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, useStaticQuery } from 'gatsby';
import cx from 'classnames';

import styles from '../styles/styles.module.scss';

import Layout from '../components/layout';

const Taxonomies = ({ location }) => {
  const {
    allMarkdownRemark: { group },
  } = useStaticQuery(graphql`
    query TagsQuery {
      allMarkdownRemark {
        group(field: frontmatter___tag) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  return (
    <Layout pageTitle="Tags" location={location}>
      <ul
        className={cx(
          styles.contentBetween,
          styles.flex,
          styles.flexWrap,
          styles.w100
        )}
      >
        {group.map(({ fieldValue, totalCount }, i) => (
          <li key={i}>
            <Link to={`/tags/${fieldValue}/`} className={styles.permalink}>
              <h2 className={cx(styles.ma0, styles.list_title)}>
                {fieldValue}
              </h2>
            </Link>
            <p className={cx(styles.mra, styles.meta)}>{totalCount}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

Taxonomies.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Taxonomies;
