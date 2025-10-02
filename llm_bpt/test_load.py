import json
import tensorflow as tf
# This is the key change: we will create the optimizer from the transformers library
from transformers import GPT2Tokenizer, TFGPT2LMHeadModel, create_optimizer
tuned_model = TFGPT2LMHeadModel.from_pretrained('./fine-tuned-physio-gpt2')
tuned_tokenizer = GPT2Tokenizer.from_pretrained('./fine-tuned-physio-gpt2')

prompt = "<|startoftext|>Question: Can physiotherapy help with chronic pain?"
input_ids = tuned_tokenizer.encode(prompt, return_tensors='tf')

output_ids = tuned_model.generate(
    input_ids,
    max_length=150,
    num_beams=5,
    no_repeat_ngram_size=2,
    early_stopping=True
)

generated_text = tuned_tokenizer.decode(output_ids[0], skip_special_tokens=True)

print("\n--- Generated Response from Fine-Tuned Model ---\n")
print(generated_text)