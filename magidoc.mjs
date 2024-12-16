export default {
  introspection: {
    type: 'sdl',
    paths: ['./schema.gql'],
  },
  website: {
    template: 'carbon-multi-page',
    options: {
      appTitle: 'Medium Article',
      appLogo:
        'https://i.ibb.co/r6Fz52H/Screenshot-2024-12-16-at-11-41-10-AM.png',
      pages: [
        {
          title: 'UOMe Back-End',
          content: `
# UOMe
This is Graphql Documentation for UOMe back-end side project
## Where to go next?
- Star the project on [GitHub](https://github.com/magidoc-org/magidoc) 
- Read the [documentation](https://magidoc.js.org/introduction/welcome)
`,
        },
      ],
    },
  },
};
