from enum import Enum
from typing import Optional, Dict, Any
import re

class ActionType(Enum):
    BROWSER = "browser"
    QUERY = "query"
    UNKNOWN = "unknown"

class ActionRouter:
    def __init__(self):
        # Action keywords that indicate browser operations
        self.browser_keywords = {
            "open": r"open\s+([a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*)",
            "go to": r"go\s+to\s+([a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*)",
            "search": r"search\s+(?:for\s+)?(.+?)(?:\s+(?:in|on|at)\s+([a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*))?$",
        }

    def parse_action(self, prompt: str) -> tuple[ActionType, Optional[Dict[str, Any]]]:
        prompt = prompt.lower().strip()
        
        # Check for browser actions
        for action, pattern in self.browser_keywords.items():
            match = re.search(pattern, prompt)
            if match:
                params = {
                    "action": action,
                    "target": match.group(1),
                }
                # Add site for search if specified
                if action == "search" and len(match.groups()) > 1:
                    params["site"] = match.group(2) or "google"
                return ActionType.BROWSER, params

        # If no specific action is found, treat as a query
        return ActionType.QUERY, {"query": prompt}

    def format_browser_url(self, params: Dict[str, Any]) -> str:
        action = params["action"]
        target = params["target"]

        if action == "search":
            site = params.get("site", "google")
            if site == "google":
                return f"https://www.google.com/search?q={target}"
            elif site == "github":
                return f"https://github.com/search?q={target}"
            else:
                return f"https://www.{site}.com/search?q={target}"
        else:
            # Handle direct navigation
            if not target.startswith(('http://', 'https://')):
                target = f"https://www.{target}.com"
            return target
