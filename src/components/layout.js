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

    const makeNoise = async (data, size) => {
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
        makeNoise(evt.data.result, baseSize)
          .then(value => URL.createObjectURL(value))
          .then(blob => setNoise(blob));
      };
    }
  }, []);

  const fontFace = `
    if ('fonts' in document) {
      const regular = new FontFace(
        'Rubik',
        "url(/fonts/Rubik-Regular.woff2) format('woff2'), url(/fonts/Rubik-Regular.woff) format('woff')"
      );
      const bold = new FontFace(
        'Rubik',
        "url(/fonts/Rubik-Bold.woff2) format('woff2'), url(/fonts/Rubik-Bold.woff) format('woff')",
        { weight: '700' }
      );
      Promise.all([bold.load(), regular.load()]).then(fonts => {
        for (const font of fonts) {
          document.fonts.add(font);
        }
      });
    }
  `;

  const baseURL = typeof location.origin !== 'undefined' ? location.origin : '';

  return (
    <>
      <Helmet>
        <html lang={language} />
        {code && (
          <link rel="stylesheet" href={`${baseURL}/syntax.css`} media="all" />
        )}
        <script type="text/javascript">{fontFace}</script>
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
