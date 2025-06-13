export interface IResponse<T = any> {
  event: string
  status: string
  message: string
  data: T
  errors: null
}
