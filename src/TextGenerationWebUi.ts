import { type CallbackManagerForLLMRun } from 'langchain/dist/callbacks'
import { LLM, type BaseLLMCallOptions, type BaseLLMParams } from 'langchain/llms/base'

export interface TextGenerationWebUiCallOptions extends BaseLLMCallOptions {
  /**
   * The maximum numbers of tokens to generate, ignoring the number of tokens in the prompt.
   * @type {number}
   * @default 200
   */
  max_new_tokens?: number
  /**
   * Whether or not to use sampling; use greedy decoding otherwise.
   * @type {boolean}
   * @default True
   */
  do_sample?: boolean
  /**
   * Primary factor to control randomness of outputs. 0 = deterministic (only the most likely token is used). Higher value = more randomness.
   * @type {number}
   * @default 0.7
   */
  temperature?: number
  /**
   *  If not set to 1, select tokens with probabilities adding up to less than this number. Higher value = higher range of possible random results.
   * @type {number}
   * @default 0.1
   */
  top_p?: number
  /**
   * If not set to 1, select only tokens that are at least this much more likely to appear than random tokens, given the prior text. See this paper for more details: https://arxiv.org/pdf/2202.00666.pdf
   * @type {number}
   * @default 1
   */
  typical_p?: number
  /**
   *  In units of 1e-4; a reasonable value is 3. This sets a probability floor below which tokens are excluded from being sampled. Should be used with top_p, top_k, and eta_cutoff set to 0. See this paper for more details: https://arxiv.org/abs/2210.15191
   *
   * @type {number}
   * @default 0
   */
  epsilon_cutoff?: number
  /**
   *  Eta sampling is a hybrid of locally typical sampling and epsilon sampling. If set to float strictly between 0 and 1, a token is only considered if it is greater than either eta_cutoff or sqrt(eta_cutoff) * exp(-entropy(softmax(next_token_logits))). The latter term is intuitively the expected next token probability, scaled by sqrt(eta_cutoff). In the paper, suggested values range from 3e-4 to 2e-3, depending on the size of the model. See this paper for more details: https://arxiv.org/abs/2210.15191
   */
  eta_cutoff?: number
  /**
   * Tail Free Sampling (TFS) is an algorithm that helps in sampling tokens from a probability distribution. It identifies the tail of the distribution by calculating second derivatives and using a threshold. TFS provides a way to select tokens that have a significant impact on the overall distribution while reducing variance compared to other sampling methods. See this article for more details: https://www.trentonbricken.com/Tail-Free-Sampling/
   * @type {number}
   * @default 1
   */
  tfs?: number
  /**
   * Top-a sampling is a method used in BlinkDL's RWKV language models. It sets a threshold value, top-a, to control the randomness of generated text. When top-a is set to a specific value, tokens with probabilities below that threshold are removed, while retaining the highest probability token. This method helps maintain accuracy when the AI is confident about its predictions. It has minimal impact on text creativity and can be used in combination with other techniques for desired effects. See this repo for more details: https://github.com/BlinkDL/RWKV-LM/tree/4cb363e5aa31978d801a47bc89d28e927ab6912e#the-top-a-sampling-method
   * @type {number}
   * @default 0
   */
  top_a?: number
  /**
   * Exponential penalty factor for repeating prior tokens. 1 means no penalty, higher value = less repetition, lower value = more repetition. See this paper for more details: https://arxiv.org/pdf/1909.05858.pdf
   */
  repetition_penalty?: number
  /**
   * Similar to top_p, but select instead only the top_k most likely tokens. Higher value = higher range of possible random results.
   * @type {number}
   * @default 40
   */
  top_k?: number
  /**
   * Minimum generation length in tokens.
   * @type {number}
   * @default 0
   */
  min_length?: number
  /**
   * If not set to 0, specifies the length of token sets that are completely blocked from repeating at all. Higher values = blocks larger phrases, lower values = blocks words or letters from repeating. Only 0 or high values are a good idea in most cases.
   * @type {number}
   * @default 0
   */
  no_repeat_ngram_size?: number
  /**
   *  Number of beams for beam search. 1 means no beam search. More beams use a lot of vram.
   *  @type {number}
   * @default 1
   */
  num_beams?: number
  /**
   * Contrastive Search is enabled by setting this to greater than zero and unchecking "do_sample". It should be used with a low value of top_k, for instance, top_k = 4.
   * @type {number}
   * @default 0
   */
  penalty_alpha?: number
  /**
   * Exponential penalty to the length that is used with beam-based generation. It is applied as an exponent to the sequence length, which in turn is used to divide the score of the sequence. Since the score is the log likelihood of the sequence (i.e. negative), length_penalty > 0.0 promotes longer sequences, while length_penalty < 0.0 encourages shorter sequences.
   * @type {number}
   * @default 1
   */
  length_penalty?: number
  /**
   * Controls the stopping condition for beam-based methods, like beam-search. It accepts the following values: True, where the generation stops as soon as there are num_beams complete candidates; False, where an heuristic is applied and the generation stops when is it very unlikely to find better candidates; "never", where the beam search procedure only stops when there cannot be better candidates (canonical beam search algorithm).
   * @type {boolean}
   * @default false
   */
  early_stopping?: boolean
  /**
   * Mirostat Mode for llama cpp (I don't know what this does, it's not documented in the llama cpp docs, if you know please tell me in the issues section of the github repo)
   * @type {number}
   * @default 0
   */
  mirostat_mode?: number
  /**
   * Mirostat Tau for llama cpp (I don't know what this does, it's not documented in the llama cpp docs, if you know please tell me in the issues section of the github repo)
   * @type {number}
   * @default 5
   */
  mirostat_tau?: number
  /**
   * Mirostat Eta for llama cpp (I don't know what this does, it's not documented in the llama cpp docs, if you know please tell me in the issues section of the github repo)
   * @type {number}
   * @default 0.1
   */
  mirostat_eta?: number
  /**
   * An integer representing the seed for generating random numbers, use -1 for a random seed.
   * @type {number}
   * @default -1
   */
  seed?: number
  /**
   * Disabling this can make the replies more creative.
   * @type {boolean}
   * @default true
   */
  add_bos_token?: boolean
  /**
   * The leftmost tokens are removed if the prompt exceeds this length. Most models require this to be at most 2048.
   * @type {number}
   * @default 2048
   */
  truncation_length?: number
  /**
   * Forces the model to never end the generation prematurely.
   * @type {boolean}
   * @default false
   */
  ban_eos_token?: boolean
  /**
   * Some specific models need this unset.
   * @type {boolean}
   * @default true
   */
  skip_special_tokens?: boolean
}

export interface TextGenerationWebUiParams extends BaseLLMParams {
  /**
   * Api url for the text generation webui.
   * @type {string}
   * @example "http://127.0.0.1:5000/api"
   */
  apiUrl: string
  /**
   * Options for the text generation webui.
   * @type {TextGenerationWebUiCallOptions}
   * @default defaultCallOptions
   */
  CallOptions?: TextGenerationWebUiCallOptions
}

export interface TextGenerationWebUiResponse {
  results: Array<{
    text: string
  }>
}

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
  repetition_penalty: 1,
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
