import { getResolvedContext } from '@moquerie/core'

export default defineEventHandler(async () => {
  const ctx = await getResolvedContext()
  const actions = ctx.fieldActions.allActions.map(fa => ({
    resourceName: fa.resourceName,
    fieldName: fa.fieldName,
    file: fa.file,
  }))

  const result: Record<string, number> = {}

  for (const key in ctx.schema.types) {
    result[key] = 0
  }

  for (const action of actions) {
    result[action.resourceName]++
  }

  return result
})