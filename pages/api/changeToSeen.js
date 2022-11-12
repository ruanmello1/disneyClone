import {GraphQLClient} from 'graphql-request'

const changeSeen = async ({body}, res) => {
    const graphcms = new GraphQLClient(process.env.ENDPOINT, {
        headers: { "Authorization": process.env.GRAPH_CMS_TOKEN}
    })

        await graphcms.request(
            `
            mutation {
                updateVideo(where: 
                  { slug: "${body.slug}" }, 
                  data: {seen: true}
                ) {
                  id,
                  title,
                  seen
                }
              }
            `
        )

        await graphcms.request(
            `mutation publishVideo {
                publishVideo(where: {slug: "${body.slug}"}, to: PUBLISHED) {
                    slug
                }
            }`
        )

        res.status(201).json({slug: body.slug});
}

export default changeSeen;