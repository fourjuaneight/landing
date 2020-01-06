import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Title from './title';
import { Content, Meta, MetaWrap, Permalink } from './util/styleEl';

const createMarkup = content => ({ __html: content });

const Article = ({ code, date, html, index, list, slug, tag, title }) => {
  useEffect(() => {
    const copy = document.querySelectorAll('button.copy-code');

    copy.forEach(el => {
      el.addEventListener('click', () => {
        const selection = window.getSelection();
        const range = document.createRange();
        const codeBlock = el.nextSibling;
        const original = 'Copy';

        range.selectNodeContents(codeBlock);
        selection.removeAllRanges();
        selection.addRange(range);

        try {
          document.execCommand('copy');
          selection.removeAllRanges();
          el.innerHTML = 'Copied!'; // eslint-disable-line
          setTimeout(() => {
            el.innerHTML = original; // eslint-disable-line
          }, 3000);
        } catch (_unused) {
          el.innerHTML = "Can't copy, hit Ctrl+C!"; // eslint-disable-line
          setTimeout(() => {
            el.innerHTML = original; // eslint-disable-line
          }, 3000);
        }
      });
    });
  }, [code]);

  return (
    <article key={list && index}>
      {list ? (
        <Permalink to={`/posts${slug}`}>
          <h2>{title}</h2>
        </Permalink>
      ) : (
        <Title text={title} />
      )}
      {date && (
        <MetaWrap>
          <Meta>
            <time dateTime={date}>{date}</time>
          </Meta>
          <Meta>
            <span aria-hidden="true">#</span>
            <Link to={`/${tag}/`}>{tag}</Link>
          </Meta>
        </MetaWrap>
      )}
      {list ? (
        // eslint-disable react/no-danger
        <Content
          code={code}
          dangerouslySetInnerHTML={createMarkup(html)}
          list
        />
      ) : (
        // eslint-enable
        <Content code={code}>
          <MDXRenderer>{html}</MDXRenderer>
        </Content>
      )}
    </article>
  );
};

Article.propTypes = {
  code: PropTypes.bool,
  date: PropTypes.string,
  html: PropTypes.string.isRequired,
  index: PropTypes.number,
  list: PropTypes.bool,
  slug: PropTypes.string,
  tag: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Article.defaultProps = {
  code: false,
  date: null,
  index: 0,
  list: false,
  slug: null,
  tag: null,
};

export default Article;
