## Requirements, Risks, Assumptions, & Constraints:
### Requirements
- Business: The objective of the system is to be able to run a large enough LLM in a language learning application within a certain system specification that the we can afford at the time being.
- Functional: The system will run with intel i7, 8 GB of RAM and 256 GB of storage locally, or in the cloud with various specifications.

### Risks
There are risks of hardware insufficiency to run the system locally. To compensate for the insufficient hardware capabilities we are going to consider some cloud options to run the system in.

### Assumptions
We assume that running the system locally requires high RAM and computation power, bearing in mind that the more parameters the model has, the better the model performs, hence the larger model size. For now we will try running 1B and 7B parameter LLM. 

### Constraints
- The system in its current phase of development will not include authorization 

## Model Selection
The model used should contain large enough amount of parameters to ensure accuracy, but still within the capacity of our local system or the within the contraints of the free tier cloud service that we can access. We will try several LLMs, which include: 
1. Deepseek
- https://github.com/deepseek-ai/DeepSeek-LLM
2. IBM Granite
- https://www.ibm.com/granite/docs/
- https://huggingface.co/ibm-granite
3. ChatGPT
4. Mistral
5. Claude

## Monitoring and Optimization
The development of the system will be documented in the weekly journal. This includes configurations, obstacles, solutions, procedures, etc.
