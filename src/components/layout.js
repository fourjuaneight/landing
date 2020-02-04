import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
      siteMetadata: { description, social, title },
    },
  } = useStaticQuery(graphql`
    query Metadata {
      site {
        siteMetadata {
          description
          social
          title
        }
      }
    }
  `);

  const [noise, setNoise] = useState(null);

  useEffect(() => {
    const baseSize = 64;

    const makeNoise = async (data, size = baseSize) => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.putImageData(new ImageData(data, size, size), 0, 0);

      const png = await new Promise(resolve =>
        canvas.toBlob(resolve, 'image/png', 0.8)
      );

      return png;
    };

    if (window.Worker) {
      worker.noise(baseSize);

      worker.onmessage = evt => {
        if (typeof evt.data.result !== 'undefined') {
          makeNoise(evt.data.result)
            .then(value => URL.createObjectURL(value))
            .then(blob => setNoise(blob));
        }
      };
    }
  }, []);

  return (
    <>
      <SEO
        code={code}
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
  }).isRequired,
  pageDescription: PropTypes.string,
  pageTitle: PropTypes.string,
  postPublishDate: PropTypes.string,
};

Layout.defaultProps = {
  code: false,
  pageDescription: null,
  pageTitle: null,
  postPublishDate: null,
};

export default Layout;
