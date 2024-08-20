/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const blackList = /.*git.*|.*android.*|.*__fixtures__.*|.*node_modules.*|.*react.*|.*dist.*|.*website\\node_modules.*|.heapCapture\\bundle.js|.*__tests__.*/gm

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};