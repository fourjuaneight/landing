import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

import { BgNoise, Main } from './util/styleEl';

import Footer from './footer';
import Header from './header';
import SEO from './seo';

// Noise
import Noise from './noise.worker';
const worker = typeof window === 'object' && new Noise();

const Layout = ({
  children,
  code,
  location,
  pageDescription,
  pageTitle,
  postPublishDate,
}) => {
  const {
    site: {
      siteMetadata: { description, language, social, title },
    },
  } = useStaticQuery(graphql`
    query Metadata {
      site {
        siteMetadata {
          description
          language
          social
          title
        }
      }
    }
  `);

  const [noise, setNoise] = useState(null);

  useEffect(() => {
    const baseSize = 64;

    const makeNoise = async (data, size) =>
      new Promise(resolve => {
        const tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = size;
        tmpCanvas.height = size;

        const ctx = tmpCanvas.getContext('2d');
        ctx.putImageData(new ImageData(data, size, size), 0, 0);

        tmpCanvas.toBlob(resolve, 'image/png', 0.8);
      });

    if (window.Worker) {
      worker.noise(baseSize);

      worker.onmessage = evt => {
        makeNoise(evt.data.result, baseSize)
          .then(value => URL.createObjectURL(value))
          .then(blob => setNoise(blob));
      };
    }
  }, []);

  return (
    <>
      <Helmet>
        <html lang={language} />
        {code && (
          <link
            rel="stylesheet"
            href={`${location.origin}/syntax.css`}
            media="all"
          />
        )}
      </Helmet>
      <SEO
        pageDescription={pageDescription}
        pageTitle={pageTitle}
        location={location}
        postPublishDate={postPublishDate}
      />
      <Header title={title} />
      <Main>{children}</Main>
      <Footer description={description} social={social} />
      <BgNoise bg={noise} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  code: PropTypes.bool,
  location: PropTypes.shape({
    origin: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }),
  pageDescription: PropTypes.string,
  pageTitle: PropTypes.string,
  postPublishDate: PropTypes.string,
};

Layout.defaultProps = {
  location: {
    pathname: '',
  },
};

export default Layout;
