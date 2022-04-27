from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import json

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html')
    table= page.inner_html('table')
    soup=BeautifulSoup(table,'html.parser')
    rows = soup.find_all('tr')
    
    headers = {0:'no',1:'razon_social',2:'pais',3:'datos_inscripcion',4:'vigencia_hasta',5:'datos_ultima_actualizacion',6:'estado'}
    
    data = []
    for row in rows:
        cells = row.find_all("td")
        if cells:
    
            items = {}
            for index in headers:
                items[headers[index]] = cells[index].text
    
            data.append(items)
    with open('data.json', 'w') as f:
        f.write(json.dumps(data))
