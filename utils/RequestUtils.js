import axios from 'axios'

const baseUrl = 'https://pool.demoworks.ir/admin/'

const controllers = {
  Customers: 'Customers',
}
const methods = {
  startLoginRegister: 'startLoginRegister',
}
export const RequestUtils = {
  startLoginRegister: async (mobile) => {
    let response = await axios.post(
      `${baseUrl}/${controllers.Customers}/API/_${methods.startLoginRegister}`,
      {
        mobile: mobile,
      },
      {
        headers: {
          token: 'test',
        },
      }
    )
    return response.data
  },
}
