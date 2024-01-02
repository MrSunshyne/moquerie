import { getResolvedContext } from '@moquerie/core'

export default defineEventHandler(async () => {
  const ctx = await getResolvedContext()
  return ctx.schema
})