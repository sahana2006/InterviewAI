import requests

class OllamaLLM:
    def __init__(self, model='mistral', url='http://localhost:11434/api/generate'):
        self.model = model
        self.url = url

    def complete(self, prompt, **kwargs):
        response = requests.post(self.url, json={
            "model": self.model,
            "prompt": prompt,
            "stream": False
        })
        return response.json()['response']
