import type { IPost } from '@/types/post'

const testDatabase: IPost[] = Array.from(Array(9).keys())
  .map(index => ({
    id: `test-${index}`,

    title: `Test ${index}`,
    description: 'This is a incredible test of an incredible blog application.',

    picture: 'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_1280.jpg',

    content: 'conteúdo',

    tags: ['nature', 'paradise'],

    createdAt: new Date(),
    updatedAt: undefined,
  }))

export function usePostsCrud () {
  function get (id: string) {
    return Promise.resolve({ ...testDatabase.find(item => item.id === id) })
  }

  function list () {
    return Promise.resolve([...testDatabase])
  }

  function create (post: IPost) {
    testDatabase.push({ ...post })
    return Promise.resolve({ ...post })
  }

  function update (id: string, updatedPost: IPost) {
    const postIndex = testDatabase.findIndex(item => item.id === id)
    testDatabase[postIndex] = { ...testDatabase[postIndex], ...updatedPost }
    return Promise.resolve({ ...testDatabase[postIndex] })
  }

  function remove (id: string) {
    const postIndex = testDatabase.findIndex(item => item.id === id)
    return Promise.resolve({ ...testDatabase.splice(postIndex, 1)[0] })
  }

  return {
    get,
    list,
    create,
    update,
    remove,
  }
}
