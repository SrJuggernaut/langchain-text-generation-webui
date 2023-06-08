# langchain-text-generation-webui

This package still in development and maybe not ready for production use, use it at your own risk.

## Overview

This is a [oobabooga/text-generation-webui](https://github.com/oobabooga/text-generation-webui) integration for [hwchase17/langchainjs ](https://github.com/hwchase17/langchainjs) to generate text from the text-generation-webui api.

## Installation

```bash
npm install langchain-text-generation-webui langchain
```

## Usage

```javascript
import { TextGenerationWebUi } from 'langchain-text-generation-webui';

const textGenerationWebUi = new TextGenerationWebUi({
  url: 'http://localhost:5005',
});

const prompt = 'Hello, my name is'

 const res = await textGenerationWebUi.call(prompt, {
  temperature: 0.5
 })

 console.log(res) // John Doe...
```


