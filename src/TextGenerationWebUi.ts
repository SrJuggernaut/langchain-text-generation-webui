import { type CallbackManagerForLLMRun } from 'langchain/dist/callbacks'
import { LLM } from 'langchain/llms/base'
import { type TextGenerationWebUiCallOptions, type TextGenerationWebUiParams, type TextGenerationWebUiResponse } from './types'

const defaultCallOptions: TextGenerationWebUiCallOptions = {
  max_new_tokens: 200,
  do_sample: true,
  temperature: 0.7,
  top_p: 0.1,
  typical_p: 1,
  epsilon_cutoff: 0,
  eta_cutoff: 0,
  tfs: 1,
  top_a: 0,
  repetition_penalty: 1.1,
  top_k: 40,
  min_length: 0,
  no_repeat_ngram_size: 0,
  num_beams: 1,
  penalty_alpha: 0,
  length_penalty: 1,
  early_stopping: false,
  mirostat_mode: 0,
  mirostat_tau: 5,
  mirostat_eta: 0.1,
  seed: -1,
  add_bos_token: true,
  truncation_length: 2048,
  ban_eos_token: false,
  skip_special_tokens: true
}

class TextGenerationWebUi extends LLM {
  CallOptions: TextGenerationWebUiCallOptions
  apiUrl: string
  constructor ({ CallOptions, apiUrl, ...rest }: TextGenerationWebUiParams) {
    super(rest)
    this.CallOptions = {
      ...defaultCallOptions,
      ...CallOptions
    }
    apiUrl = apiUrl.replace(/\/$/, '')
    if (!/^https?:\/\//i.test(apiUrl)) {
      apiUrl = `http://${apiUrl}`
    }
    apiUrl = apiUrl.replace(/\/v1\/(generate|stream)$/, '')
    this.apiUrl = apiUrl
  }

  _llmType (): string {
    return 'text-generation-webui'
  }

  async _call (prompt: string, options: this['ParsedCallOptions'], runManager?: CallbackManagerForLLMRun | undefined): Promise<string> {
    // Remember map options.stop to stopping_strings when calling the api
    const body = {
      prompt,
      ...options,
      stopping_strings: options.stop
    }
    const response = await fetch(`${this.apiUrl}/v1/generate`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json() as TextGenerationWebUiResponse
    return json.results[0].text
  }
}

export default TextGenerationWebUi
