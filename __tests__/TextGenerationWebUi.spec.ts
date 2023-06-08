import fetchMock from 'jest-fetch-mock'
import TextGenerationWebUi from '../src/TextGenerationWebUi'

describe('TextGenerationWebUi', () => {
  const apiUrl = 'https://example.com/api'
  const prompt = 'Et sea et est voluptua'
  const prompt1 = 'Lorem delenit molestie'

  const defaultCallOptions = {
    length: 10,
    temperature: 0.5
  }

  const response = {
    results: [
      {
        text: 'Lorem ipsum dolor sit amet.'
      }
    ]
  }

  const response1 = {
    results: [
      {
        text: 'Gubergren erat voluptua accumsan.'
      }
    ]
  }

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('should call the API with the correct parameters on call method', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(response))

    const textGenerationWebUi = new TextGenerationWebUi({ apiUrl })
    await textGenerationWebUi.call(prompt, defaultCallOptions)

    expect(fetchMock).toBeCalledTimes(1)
    expect(fetchMock).toBeCalledWith(
      `${apiUrl}/v1/generate`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          prompt,
          ...defaultCallOptions
        })
      })
    )
  })

  it('should return the correct response on call', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(response))

    const textGenerationWebUi = new TextGenerationWebUi({ apiUrl })
    const result = await textGenerationWebUi.call(prompt, defaultCallOptions)

    expect(result).toBe(response.results[0].text)
  })

  it('should call the API one time for each prompt on generate method', async () => {
    fetchMock.mockResponse(JSON.stringify(response))

    const textGenerationWebUi = new TextGenerationWebUi({ apiUrl, CallOptions: defaultCallOptions })
    await textGenerationWebUi.generate([prompt, prompt])

    expect(fetchMock).toBeCalledTimes(2)
  })

  it('should call the API with the correct parameters every time on generate method', async () => {
    fetchMock.mockResponse(JSON.stringify(response))

    const textGenerationWebUi = new TextGenerationWebUi({ apiUrl })
    await textGenerationWebUi.generate([prompt, prompt1], defaultCallOptions)

    expect(fetchMock).toBeCalledTimes(2)
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      `${apiUrl}/v1/generate`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          prompt,
          ...defaultCallOptions
        })
      })
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      `${apiUrl}/v1/generate`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          prompt: prompt1,
          ...defaultCallOptions
        })
      })
    )
  })

  it('should return the correct responses on the right order on generate method', async () => {
    fetchMock.mockResponses(JSON.stringify(response), JSON.stringify(response1))

    const textGenerationWebUi = new TextGenerationWebUi({ apiUrl })
    const result = await textGenerationWebUi.generate([prompt, prompt1])

    expect(result).toEqual({
      generations: [
        [
          { text: response.results[0].text }
        ],
        [
          { text: response1.results[0].text }
        ]
      ]
    })
  })
})
