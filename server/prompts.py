

# 1) Generates commented code from raw code
def generateComments():
    prompt_text = """
    Given the code snippet below, add comments to explain the purpose of each function, variable, and control flow structure. 
    The comments should be detailed and provide a clear understanding of the code's functionality. Additionally, 
    include comments that describe the expected inputs, outputs, and any assumptions made in the code. The comments 
    should follow best practices for code documentation and be written in a clear and concise manner. Do not add anything to the given
    code besides comments. This should still be directly executable code after your comments are added.
    """

    return prompt_text

# 2) Generates mermaid code from commented code snippet
def generateMermaidCode():
    prompt_text = """
    you are an expert programmer and specialize in generating Mermaid format flowcharts from computer code. The flowchart must be top-down, and should be the most granular possible expressing all control flow divergences in the code. Format this in a JSON, and include a symbols list of dictionaries of the id name, the beginning line of relevant code, and the ending line of relevant code. Begin counting line numbers from the very first line provided, including comments and blank lines. Also comment the line numbers above each subgraph using double percent signs. Do not use any parentheses, brackets, braces, or quotes characters within id tags in the mermaid code.
    Here is an example:

    Code snippet:
    def analyze_numbers(numbers):
        #This function analyzes a list of numbers and prints different messages based on their properties.
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

        Associated output JSON:
        {
        "symbols": [
            {
            "symbol": "id1",
            "start": 1,
            "end": 8
            },
            {
            "symbol": "id2",
            "start": 9,
            "end": 10
            },
            {
            "symbol": "id3",
            "start": 11,
            "end": 14
            },
            {
            "symbol": "id4",
            "start": 15,
            "end": 15
            },
            {
            "symbol": "id5",
            "start": 16,
            "end": 23
            },
            {
            "symbol": "id6",
            "start": 16,
            "end": 23
            },
            {
            "symbol": "id7",
            "start": 16,
            "end": 23
            },
            {
            "symbol": "id8",
            "start": 16,
            "end": 23
            },
            {
            "symbol": "id9",
            "start": 16,
            "end": 23
            },
            {
            "symbol": "id10",
            "start": 16,
            "end": 23
            },
            {
            "symbol": "id11",
            "start": 16,
            "end": 23
            },
            {
            "symbol": "id12",
            "start": 24,
            "end": 27
            },
            {
            "symbol": "id13",
            "start": 24,
            "end": 27
            },
            {
            "symbol": "id14",
            "start": 24,
            "end": 27
            },
            {
            "symbol": "id15",
            "start": 28,
            "end": 28
            },
            {
            "symbol": "id16",
            "start": 29,
            "end": 36
            },
            {
            "symbol": "id17",
            "start": 29,
            "end": 36
            },
            {
            "symbol": "id18",
            "start": 29,
            "end": 36
            },
            {
            "symbol": "id19",
            "start": 29,
            "end": 36
            },
            {
            "symbol": "id20",
            "start": 29,
            "end": 36
            },
            {
            "symbol": "id21",
            "start": 29,
            "end": 36
            },
            {
            "symbol": "id22",
            "start": 29,
            "end": 36
            },
            {
            "symbol": "id23",
            "start": 29,
            "end": 36
            }
        ], 
        "graph": "
            graph TD
        %% Lines 1-8
            subgraph Start
            id1(Start) --> id2{Define function_analyze_numbers}
            end

        %% Lines 9-12
            subgraph Initialize variables
            id2 --> id3{Initialize_variables_to_0_or_False}
            end

        %% Line 13
            subgraph Loop through numbers
            id3 --> id4{For_each_number_in_the_list}
            end

        %% Lines 14-16
            subgraph Check positive or negative
            id4 -->|Positive| id5(positive_count_+=_1)
            id4 -->|Negative| id6(negative_count_+=_1)
            id4 -->|Zero| id7(has_zero_=_True)
            end

        %% Lines 17-18
            subgraph Check even
            id5 --> id8{Is_the_number_even}
            id6 --> id8
            id7 --> id8
            id8 -->|Yes| id9(sum_of_even_+=_number)
            id8 -->|No| id4 
            end

        %% Lines 19-26
            subgraph Analyze results 
            id9 --> id10{Compare_positive_and_negative_counts}
            id10 --> |More_positive| id11(Print_message)
            id10 --> |More_negative| id12(Print_message)
            id10 --> |Equal| id13(Print_message)
            id13 --> id14{Check_if_zero_exists}
            id14 -->|Yes| id15(Print_message)
            id14 -->|No| id16{Check_sum_of_even_numbers}
            id15 --> id16
            id16 -->|Greater_than_0| id17(Print_sum)
            id16 -->|Not_greater_than_0| id18(End)
            end"
        }


    Target code:
    """

    return prompt_text  

# 3) Generates mermaid metadata from mermaid code and commented code snippet
def generateMermaidMetadata():
    prompt_text = """

    You are an expert mermaid.js json creator. For the following mermaid.js code, for each node you create, provide the following metadata in json, where the node's name is the key:
    {
    Node A: [
        Contextualization: "describe how the code snippet fits into the larger application or module. Highlight any connections to other code sections or modules.",
        Parameter Documentation: "List and explain each parameter the code takes, including data types and expected values.",
        Output Description: "Detail what the code returns, including possible states or outcomes based on different inputs.",
        Dependency Identification:" Identify any external dependencies or libraries that the code relies on, including version numbers if applicable.",
        Modification Log: "At the end of your commentary, provide a concise summary of any modifications you suggest for the snippet to improve clarity, efficiency, or compatibility. For example at the end, you should group modifications if need be: 'Modifies: <variable>, <variable>, <variable> to do <action>, <action>, <action>'
    ]
    etc...
    }

    """

    return prompt_text


# ------------ Reverse Mapping -----------------
# Image/code request to mermaid + generated code


def generateCodeFromImage():
    prompt_text = """
    You are an expert software developer and machine learning engineer. From an image and an analysis task, develop the code that would perform the task.
    Ensure that each piece of the process is well documented, so that someone well-versed in the programming language could understand the code without needing to see the image.
    """

    return prompt_text  

# Use GenerateMermaidCode() + GenerateMermaidMetadata() from here