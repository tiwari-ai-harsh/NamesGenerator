import numpy as np
import tensorflow as tf

vocab =  ['<end>', '<pad>', '<start>', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
vocab_size = 29 
embedding_dim = 256
rnn_units = 1024
char2idx = {u:i for i,u in enumerate(vocab)}
index2char = np.array(vocab)

def build_model(batch_size):
  model = tf.keras.Sequential([
                               tf.keras.layers.Embedding(vocab_size, embedding_dim, batch_input_shape=[batch_size, None]),
                               tf.keras.layers.GRU(rnn_units, return_sequences=True, stateful=True, recurrent_initializer="glorot_uniform"),
                               tf.keras.layers.Dense(vocab_size)
  ])
  model.load_weights('latest_checkpoint/')
  print("*"*10+"Model Build"+"*"*10)
  return model

# model = build_model(batch_size=1)

def generate_text(model, start_string, temperature):

  input_eval = [char2idx[s] for s in start_string]
  input_eval.insert(0, char2idx['<start>'])

  input_eval = tf.expand_dims(input_eval, 0)

  text_generated = []

  model.reset_states()
  for i in range(30):
      predictions = model(input_eval)
      predictions = tf.squeeze(predictions, 0)

      predictions = predictions / temperature
      predicted_id = tf.random.categorical(predictions, num_samples=1)[-1,0].numpy()

      input_eval = tf.expand_dims([predicted_id], 0)


      if(index2char[predicted_id] == '<end>'):
        break
      if(predicted_id == 0):
        break
      text_generated.append(index2char[predicted_id])
  
  return (start_string + ''.join(text_generated))