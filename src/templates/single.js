import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import cx from 'classnames';

import styles from '../styles/styles.module.scss';

import CleanHTML from '../components/cleanHTML';
import Layout from '../components/layout';

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      excerpt(format: PLAIN, truncate: false)
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        tag
        title
      }
      html
    }
  }
`;

const Single = ({ data, location }) => {
  const {
    markdownRemark: {
      excerpt,
      frontmatter: { date, tag, title },
      html,
    },
  } = data;
  const raw = new Date(date);
  const iso = raw.toISOString().substring(0, 10);

  return (
    <Layout pageDescription={excerpt} pageTitle={title} location={location}>
      <article
        className={cx(
          styles.flex,
          styles.flexColumn,
          styles.itemsFlexStart,
          styles.m_horizontal,
          styles.w100
        )}
      >
        <h1
          className={cx(
            styles.mra,
            styles.relative,
            styles.marked,
            styles.title
          )}
        >
          {title}
        </h1>
        <section>
          <time
            dateTime={iso}
            className={cx(styles.f7, styles.mra, styles.meta)}
          >
            <span aria-label="Posted on">&tau;</span>
            {date}
          </time>
          <p className={cx(styles.f7, styles.ma0, styles.mr1)}>
            <span aria-hidden="true" className={styles.meta}>
              #
            </span>
            <Link to={`/tags/${tag}`} itemprop="about" className={styles.meta}>
              {tag}
            </Link>
          </p>
        </section>
        <section>
          <CleanHTML html={html} />
        </section>
      </article>
    </Layout>
  );
};

Single.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object.isRequired,
  }),
  location: PropTypes.object.isRequired,
};

export default Single;
