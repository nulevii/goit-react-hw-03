import axios, { AxiosResponse } from 'axios'

interface DataParamsInterface {
  per_page: number
  page: number
  q: string
}
const getData = async (params: DataParamsInterface): Promise<AxiosResponse<string> | undefined> => {
  const url = 'https://pixabay.com/api/'
  const key = '27364037-494c2c1537a13aa746fb2bd48'
  const imageType = 'photo'
  const orientation = 'horizontal'
  const safesearch = true
  try {
    const data = await axios.get(url, {
      params: { key, image_type: imageType, orientation, safesearch, ...params }
    })
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
export default getData
