import { useRef } from 'react'
import { useAppDispatch } from 'hooks/useRedux'
import { graphql, useStaticQuery } from 'gatsby'
import { GraphQLAllDataType } from 'consts/graphQL'
import { setRoutes } from './routesReducer'
import { createHierarchicalRoutes, createFlatRoutes } from 'utils/routes'

const query = graphql`
  query AllRoutesQuery {
    allMdx(
      sort: { frontmatter: { order: ASC } }
      filter: {
        frontmatter: { title: { ne: "404" } }
        fields: { slug: { ne: "/404/" } }
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            order
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export const RoutesInit = () => {
  const dispatch = useAppDispatch()
  const data = useStaticQuery<GraphQLAllDataType>(query)
  const routesHasBeenSet = useRef(false)

  if (routesHasBeenSet.current) return null

  routesHasBeenSet.current = true
  dispatch(
    setRoutes({
      hierarchical: createHierarchicalRoutes(data),
      flat: createFlatRoutes(data)
    })
  )

  return null
}
