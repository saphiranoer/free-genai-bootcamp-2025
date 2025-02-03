## Requirements
- Business: The objective of the system is to be able to run a large enough LLM in a language learning application within a certain system specification that the company can afford at the time being.

- Functional: The system will run with intel ultra 7 155h, 16 GB of RAM and 256 GB of storage locally, or in the cloud with varioud specifications.


## Assumption
We will use open source LLMs, within considerations are: 
1. Deepseek
- https://github.com/deepseek-ai/DeepSeek-LLM
2. IBM Granite
- https://www.ibm.com/granite/docs/
- https://huggingface.co/ibm-granite
3. TBA..

## Constraints
The system in its current phase of development will not include authorization 

## Model Selection
The model used should contain large enough amount of parameters to ensure accuracy, but still within the capacity of our local system or the within the contraints of the free tier cloud service that we can access.
The model to be used is open source, by this we mean Open Source and not merely Open Weights, and in the end of the spetrum of openness either Modifiable openness or Radical openness.
- https://promptengineering.org/llm-open-source-vs-open-weights-vs-restricted-weights/#:~:text=Open%20Weights%201%20Definition%20and%20Access%3A%20Open%20weights,academic%20research%2C%20and%20personal%20projects.%20...%20More%20items

## Monitoring and Optimization
The development of the system will be documented in the weekly journal. This includes configurations, obstacles, solutions, procedures, etc.
