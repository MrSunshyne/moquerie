import type { FactoryData } from '@/components/factory/formTypes.js'
import { getFactoryStorage } from '@moquerie/core'
import { nanoid } from 'nanoid'
import SuperJSON from 'superjson'

export default defineEventHandler<{ body: FactoryData }>(async (event) => {
  const { factoryId } = getRouterParams(event, {
    decode: true,
  })
  const body = await readBody(event)
  const mq = getMq()
  const storage = await getFactoryStorage(mq)

  const factory = await storage.findById(factoryId)
  if (!factory) {
    throw new Error(`Factory ${factoryId} not found`)
  }

  if (body.location === 'local') {
    if (factory.location !== body.location) {
      await storage.remove(factory.id)
      // Override id with random one
      factory.id = `${body.resourceName ?? factory.resourceName}-${nanoid()}`
    }
  }
  else if (body.location === 'repository') {
    // Use name as id
    const name = body.name ?? factory.name
    if (await storage.findById(name, 'repository')) {
      throw new Error(`Factory with name "${name}" already exists in repository`)
    }
    await storage.remove(factory.id)
    factory.id = `${body.resourceName ?? factory.resourceName}-${name}`
  }
  Object.assign(factory, body)
  await storage.save(factory, factory.location)
  return SuperJSON.stringify({
    ...factory,
    ast: undefined,
  })
})
