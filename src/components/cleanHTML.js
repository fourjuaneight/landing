import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';

const CleanHTML = ({ html }) => {
  const clean = dirty =>
    sanitizeHtml(dirty, {
      allowedAttributes: {
        a: ['href', 'rel', 'target'],
      },
      allowedTags: [
        'a',
        'b',
        'blockquote',
        'h1',
        'h2',
        'h3',
        'h4',
        'i',
        'em',
        'li',
        'ol',
        'p',
        'span',
        'strong',
        'ul',
      ],
    });

  return <>{ReactHtmlParser(clean(html))}</>;
};

CleanHTML.propTypes = {
  html: PropTypes.string.isRequired,
};
