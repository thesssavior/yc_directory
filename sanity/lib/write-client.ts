import "server-only"
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, 
  token: process.env.SANITY_WRITE_TOKEN
})

// .config: retrieves the current configuration of the Sanity client
if (!writeClient.config().token) {
    throw new Error("Write token not found")
}