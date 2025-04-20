from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

options = Options()
driver = webdriver.Chrome(service=Service(), options=options)

driver.get("https://www.google.com")
