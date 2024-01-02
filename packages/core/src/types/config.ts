export interface Config {
  /**
   * Options for the API server
   */
  server?: {
    /**
     * Port to listen on
     * You can also use the PORT environment variable
     */
    port?: number
  }

  /**
   * Enable GraphQL support
   */
  graphql?: {
    /**
     * GraphQL schema
     */
    schema: {
      /**
       * Live URL to the GraphQL server
       */
      url: string
    } | {
      /**
       * Introspection result JSON file
       */
      jsonFile: string
    } | {
      /**
       * `.graphql` files to load, can be a path to a single file or a glob pattern
       */
      graphqlFiles: string
    } | {
      /**
       * Glob pattern of files to scan for `gql` tags
       */
      scanCodeFiles: string
    }
  }
}