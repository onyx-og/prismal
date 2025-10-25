import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
const path = require('path');

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Prismal',
  tagline: 'Full-spectrum design system',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://onyx-og.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/prismal/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'onyx-og', // Usually your GitHub org/user name.
  projectName: 'prismal', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  plugins: [
    path.resolve(__dirname, 'plugins/webpack-aliases.ts'),
      'docusaurus-plugin-sass',
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'react',
        entryPoints: ['../react/src/index.ts'],
        tsconfig: '../react/tsconfig.json',
        out: 'docs/react',
      },
    ],
    // [
    //   'docusaurus-plugin-typedoc',
    //   {
    //     id: 'native',
    //     entryPoints: ['../react-native/src/index.ts'],
    //     tsconfig: '../react-native/tsconfig.json',
    //     out: 'docs/native',
    //   },
    // ],
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/onyx-og/prismal/tree/main/packages/website/',
        },
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ['rss', 'atom'],
        //     xslt: true,
        //   },
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/onyx-og/prismal/tree/main/packages/website/',
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: 'warn',
        //   onInlineAuthors: 'warn',
        //   onUntruncatedBlogPosts: 'warn',
        // },
        gtag: {
          trackingID: 'G-E5KWBPH17H',
          anonymizeIP: false,
        },
        theme: {
          customCss: ['./src/styles/custom.scss', '../react/src/styles/theme.scss'],
        },
      } satisfies Preset.Options,
    ],
  ],

  // themes: [
  //   '@prismal/docs-theme'
  // ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    // Replace with your project's social card
    image: 'img/prismal-social-card.jpg',
    navbar: {
      title: 'Prismal',
      logo: {
        alt: 'Logo 3D',
        src: 'img/logo_3d.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'dropdown',
          label: 'Framework',
          position: 'left',
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'react',
              label: 'React',
            },
            {
              type: 'docSidebar',
              sidebarId: 'native',
              label: 'React Native',
            },
          ],
        },
        {
          label: "Wordpress",
          href: 'https://onyx.ac'
        },
        {
          type: 'docSidebar',
          sidebarId: 'components',
          position: 'left',
          label: 'Components'
        },
        {
          type: 'dropdown',
          label: 'Showcase',
          position: 'right',
          items: [
            {href: 'pathname:///showcase/index.html', label: 'React'},
            {href: 'pathname:///showcase-native/index.html', label: 'React Native'},
          ],
        },
        {
          href: 'https://github.com/onyx-og/prismal',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Intro',
              to: '/docs/get-started/intro',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Porfolio',
              href: 'https://onyx.ac',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/onyx-og/',
            },
            {
              label: 'X',
              href: 'https://x.com/onyxOG_',
            },
          ],
        },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/onyx-og/prismal',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Onyx AC, LLC`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
