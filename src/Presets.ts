import { type TextGenerationWebUiCallOptions } from './types'

export const Asterism: TextGenerationWebUiCallOptions = {
  temperature: 1.68,
  top_p: 0.17,
  tfs: 0.97,
  top_a: 0.42,
  repetition_penalty: 1.02,
  top_k: 77
}

export const BigO: TextGenerationWebUiCallOptions = {
  temperature: 0.87,
  top_p: 0.99,
  typical_p: 0.68,
  tfs: 0.68,
  repetition_penalty: 1.01,
  top_k: 85
}

export const ContrastiveSearch: TextGenerationWebUiCallOptions = {
  do_sample: false,
  top_k: 4,
  penalty_alpha: 0.3
}

export const DebugDeterministic: TextGenerationWebUiCallOptions = {
  do_sample: false
}

export const DivineIntellect: TextGenerationWebUiCallOptions = {
  temperature: 1.31,
  top_p: 0.14,
  epsilon_cutoff: 1.49,
  eta_cutoff: 10.42,
  top_a: 0.52,
  repetition_penalty: 1.17,
  top_k: 49
}

export const KoboldGodlike: TextGenerationWebUiCallOptions = {
  temperature: 0.7,
  top_p: 0.5,
  typical_p: 0.19,
  repetition_penalty: 1.1
}

export const LLaMAPrecise: TextGenerationWebUiCallOptions = {
  temperature: 0.7,
  top_p: 0.1,
  repetition_penalty: 1.18,
  top_k: 40
}

export const MidnightEnigma: TextGenerationWebUiCallOptions = {
  temperature: 0.98,
  top_p: 0.37,
  repetition_penalty: 1.18,
  top_k: 100
}

export const Mirostat: TextGenerationWebUiCallOptions = {
  mirostat_mode: 2,
  mirostat_tau: 8
}

export const Shortwave: TextGenerationWebUiCallOptions = {
  temperature: 1.53,
  top_p: 0.64,
  top_a: 0.04,
  repetition_penalty: 1.07,
  top_k: 33
}

export const SpaceAlien: TextGenerationWebUiCallOptions = {
  temperature: 1.31,
  top_p: 0.29,
  repetition_penalty: 1.09,
  top_k: 72
}

export const StarChat: TextGenerationWebUiCallOptions = {
  temperature: 0.2,
  top_p: 0.95,
  top_k: 50
}

export const Titanic: TextGenerationWebUiCallOptions = {
  temperature: 1.01,
  top_p: 0.21,
  eta_cutoff: 10.78,
  top_a: 0.75,
  repetition_penalty: 1.21,
  encoder_repetition_penalty: 1.07,
  top_k: 91
}

export const Yara: TextGenerationWebUiCallOptions = {
  temperature: 0.82,
  top_p: 0.21,
  repetition_penalty: 1.19,
  top_k: 72
}

export const Simple1: TextGenerationWebUiCallOptions = {
  temperature: 0.7,
  top_p: 0.9,
  repetition_penalty: 1.15,
  top_k: 20
}

export const tfsWithTopA: TextGenerationWebUiCallOptions = {
  temperature: 0.7,
  tfs: 0.95,
  top_a: 0.2,
  repetition_penalty: 1.15
}
