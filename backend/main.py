import os
import time
import re
import dotenv
import requests
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from action_router import ActionRouter, ActionType

# Load env
dotenv.load_dotenv()
API_KEY = os.getenv("OPENROUTER_API_KEY")
BASE_URL = os.getenv("OPENROUTER_BASE_URL")
MODEL = os.getenv("MODEL")

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AgentCommand(BaseModel):
    prompt: str

def get_site_from_model(prompt: str):
    url = f"{BASE_URL}/chat/completions"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",  # optional
        "X-Title": "AI Agent Dev",                # optional
    }

    body = {
        "model": MODEL,
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post(url, headers=headers, json=body)
    response.raise_for_status()

    data = response.json()
    reply = data["choices"][0]["message"]["content"]
    return reply

def extract_url(text):
    match = re.search(r'(https?://[^\s]+)', text)
    return match.group(0) if match else None

def open_in_browser(url):
    chrome_options = Options()
    chrome_options.add_argument("--start-maximized")

    driver = webdriver.Chrome(service=Service(), options=chrome_options)
    driver.get(url)
    time.sleep(5)  # Let the site load
    return True

action_router = ActionRouter()

@app.post("/run-agent")
async def run_agent(command: AgentCommand):
    try:
        # Determine action type and parameters
        action_type, params = action_router.parse_action(command.prompt)

        if action_type == ActionType.BROWSER:
            url = action_router.format_browser_url(params)
            success = open_in_browser(url)
            if success:
                return {
                    "status": "success",
                    "message": f"Performed browser action: {params['action']} {params['target']}",
                    "url": url
                }
            else:
                return {"status": "error", "message": "Failed to perform browser action"}
        else:
            # Handle as a regular query to OpenRouter
            response = get_site_from_model(command.prompt)
            return {
                "status": "success",
                "message": response,
                "type": "query"
            }
    except Exception as e:
        return {"status": "error", "message": str(e)}
