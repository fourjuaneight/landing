import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Title from './title';
import {
  Content,
  ExternalLink,
  Meta,
  MetaWrap,
  Permalink,
} from './util/styleEl';

const createMarkup = content => ({ __html: content });

const Article = ({
  appearance,
  code,
  date,
  html,
  index,
  list,
  slug,
  tag,
  title,
}) => {
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
      {/* eslint-disable-next-line no-nested-ternary */}
      {list && appearance ? (
        <ExternalLink href={slug} target="_blank" rel="noopener noreferrer">
          <h2>
            {title}
            <span aria-hidden="true">{String.fromCharCode(8594)}</span>
          </h2>
        </ExternalLink>
      ) : list && !appearance ? (
        <Permalink to={slug}>
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
        <Content justify={list.toString()}>
          {/* eslint-disable react/no-danger */}
          <p dangerouslySetInnerHTML={createMarkup(html)} />
        </Content>
      ) : (
        <Content>
          <MDXRenderer>{html}</MDXRenderer>
        </Content>
      )}
    </article>
  );
};

Article.propTypes = {
  appearance: PropTypes.bool.isRequired,
  code: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
  index: PropTypes.number,
  list: PropTypes.bool,
  slug: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

Article.defaultProps = {
  index: 0,
  list: false,
};

export default Article;
