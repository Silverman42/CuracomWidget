export const GetToken = () => {
  let token: string = 'QdiR8tnXeZSbP2TIYCZNxzJi2ocKERdc'

  if (import.meta.env.MODE === 'production') {
    const widgetScript = document.querySelector(
      `#${import.meta.env.VITE_WIDGET_ID}`,
    ) as HTMLScriptElement

    const url = new URL(widgetScript?.src || '')

    token = url.searchParams.get('id') || ''
  }

  return token
}
