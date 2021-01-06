import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: 'Slicks Slices',
    siteUrl: 'https://gatsby.pizza',
    description: 'The best pizza place in Dublin!',
    twitter: '@walshy_c',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      // this is the name of the plugin you are adding
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '1shlxohp',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
