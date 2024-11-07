import { faker } from '@faker-js/faker'
import { CharityStruct, SupportStruct } from './type.dt'

const iamges = [
  "https://plus.unsplash.com/premium_photo-1679523690085-d29db6e9ff08?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1542715234-bd0adb4249b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1663127588537-96aacaef7b13?q=80&w=2054&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661429232503-bdeb4b34a808?q=80&w=2974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1692224749776-c5d7cc9ef7d8?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1690089867621-df05f2dc506c?q=80&w=2035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1663127442778-3b635cc838d3?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1667485721724-352b910795af?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710322928695-c7fb49886cb1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1709788938371-f2cf46060eee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

export const generateCharities = (count: number): CharityStruct[] => {
  const charities: CharityStruct[] = []

  for (let i = 0; i < count; i++) {
    const charity: CharityStruct = {
      id: i + 1,
      fullname: faker.word.words(2),
      name: faker.word.words(5),
      profile: faker.internet.url(),
      image: iamges[i],
      description: faker.lorem.paragraph(),
      timestamp: faker.date.past().getTime(),
      deleted: false,
      banned: false,
      donations: faker.number.int({ min: 1, max: 100 }),
      raised: faker.number.float({ min: 10, max: 15 }),
      amount: faker.number.float({ min: 10, max: 20 }),
      owner: faker.string.hexadecimal({
        length: { min: 42, max: 42 },
        prefix: '0x',
      }),
    }
    charities.push(charity)
  }

  return charities
}

export const generateSupports = (count: number): SupportStruct[] => {
  const supports: SupportStruct[] = []

  for (let i = 0; i < count; i++) {
    const support: SupportStruct = {
      id: i + 1,
      cid: faker.number.int({ min: 1, max: 100 }),
      fullname: faker.person.firstName(),
      comment: faker.lorem.paragraph(),
      timestamp: faker.date.past().getTime(),
      amount: faker.number.float({ min: 0.01, max: 4 }),
      supporter: faker.string.hexadecimal({
        length: { min: 42, max: 42 },
        prefix: '0x',
      }),
    }
    supports.push(support)
  }

  return supports
}
