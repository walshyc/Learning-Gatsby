import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

const SEO = ({ children, location, description, title, image }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitter
        }
      }
    }
  `);
  console.log(site);
  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      {/* Favicons */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="alternate icon" href="/favicon.ico" />

      {/* Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      <meta name="description" content={site.siteMetadata.description} />

      {/* Open Graph */}
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={image || '/logo.svg'} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta
        property="og:site_name"
        content={site.siteMetadata.title}
        key="ogsitename"
      />
      <meta property="og:description" content={description} />

      {children}
    </Helmet>
  );
};

export default SEO;
