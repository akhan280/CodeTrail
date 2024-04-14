def analyze_numbers(numbers):
  """
  This function analyzes a list of numbers and prints different messages based on their properties.
  """
  positive_count = 0
  negative_count = 0
  sum_of_even = 0
  has_zero = False

  for num in numbers:
    if num > 0:
      positive_count += 1
    elif num < 0:
      negative_count += 1
    else:
      has_zero = True

    if num % 2 == 0:
      sum_of_even += num

  if positive_count > negative_count:
    print("The list contains more positive numbers.")
  elif negative_count > positive_count:
    print("The list contains more negative numbers.")
  else:
    print("The list has an equal number of positive and negative numbers.")

  if has_zero:
    print("The list contains at least one zero.")

  if sum_of_even > 0:
    print("The sum of even numbers is:", sum_of_even)

# Example usage:
numbers = [1, -3, 5, 0, -2, 4]
analyze_numbers(numbers)
