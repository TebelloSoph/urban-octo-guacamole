
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:8080")

    # Make moves to achieve checkmate (Fool's Mate)
    page.click('.square:has-text("f2")')
    page.click('.square:has-text("f3")')

    page.click('.square:has-text("e7")')
    page.click('.square:has-text("e5")')

    page.click('.square:has-text("g2")')
    page.click('.square:has-text("g4")')

    page.click('.square:has-text("d8")')
    page.click('.square:has-text("h4")')

    # Wait for the confetti canvas to be visible
    page.wait_for_selector("#confetti-canvas", state="visible")

    page.screenshot(path="jules-scratch/verification/confetti.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
