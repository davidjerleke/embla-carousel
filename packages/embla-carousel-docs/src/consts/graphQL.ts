export type GraphQLAllDataType = {
  allMdx: {
    edges: GraphQLEdgeType[]
  }
}

export type GraphQLEdgeType = {
  node: GraphQLNodeType
}

export type GraphQLNodeType = {
  id: string
  fields: {
    slug: string
  }
  frontmatter: {
    title?: string
    order?: number
    description?: string
    date?: string
  }
  internal: {
    contentFilePath: string
  }
}
