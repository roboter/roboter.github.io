// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Begemotik',
  tagline: 'Arduino master',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://begemotik.ee',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'roboter', // Usually your GitHub org/user name.
  projectName: 'begemotik', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: false, // Optional: disable the docs plugin
        blog: {
          routeBasePath: '/', // Serve the blog at the site's root
          /* other blog options */
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Begemotik.ee',
        logo: {
          alt: '',
          src: 'img/logo.svg',
        },
        items: [
         
          {
            href: 'https://github.com/roboter',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [        
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/users/891529/aleksei-prokopov',
              },
              // {
              //   label: 'Discord',
              //   href: 'https://discordapp.com/invite/robbyroboter#6061',
              // },
              {
                label: 'Twitter',
                href: 'https://twitter.com/robby_roboter',
              },
            ],
          },
          {
            title: 'More',
            items: [            
              {
                label: 'GitHub',
                href: 'https://github.com/roboter',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },      
    }),
};

module.exports = config;
