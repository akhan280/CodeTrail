def analyze_text_complexity(text, threshold=0.5):
  """
  This function analyzes text complexity based on sentence length, word length, and vocabulary. 
  It returns a complexity score between 0 and 1, with higher values indicating greater complexity.
  """

  # Split the text into sentences based on ". " as the delimiter
  sentences = text.split(". ")  

  # Initialize variables to track word count, long word count, and unique words
  word_count = 0
  long_word_count = 0
  unique_words = set()

  # Iterate through each sentence
  for sentence in sentences:
    # Split the sentence into words
    words = sentence.split()
    # Update the word count
    word_count += len(words) 

    # Iterate through each word in the sentence
    for word in words:
      # Add the word to the set of unique words (converted to lowercase)
      unique_words.add(word.lower())  
      # Check if the word length is greater than 6, and increment the long word count if so
      if len(word) > 6:
        long_word_count += 1 

  # Calculate average sentence length
  avg_sentence_length = word_count / len(sentences)
  # Calculate the percentage of long words
  percent_long_words = long_word_count / word_count 
  # Calculate vocabulary diversity (number of unique words relative to total words)
  vocab_diversity = len(unique_words) / word_count 

  # Calculate the complexity score using a weighted average of the three metrics
  complexity_score = (avg_sentence_length * 0.3) + (percent_long_words * 0.3) + (vocab_diversity * 0.4) 

  # Print messages based on the complexity score and provide suggestions
  if complexity_score > threshold:
    print("The text is complex.")
    if avg_sentence_length > 20:
      print("Consider shortening sentence length.")
    if percent_long_words > 0.2:
      print("Consider using simpler vocabulary.")
  else:
    print("The text is easy to read.")

  # Return the calculated complexity score
  return complexity_score