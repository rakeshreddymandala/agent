from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

class BrowserService:
    def __init__(self):
        self.options = Options()
        self.options.add_argument('--start-maximized')
        self.driver = None
    
    def start_browser(self):
        if not self.driver:
            self.driver = webdriver.Chrome(service=Service(), options=self.options)
        
    def navigate_to(self, url):
        if not self.driver:
            self.start_browser()
        self.driver.get(url)
        return True

    def close_browser(self):
        if self.driver:
            self.driver.quit()
            self.driver = None
