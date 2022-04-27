const express = require("express");
const app = express();
const {chromium} = require('playwright')
const fs = require("fs");

app.get('/', (req,res)=>{
	;(async ()=>{
		const browser = await chromium.launch()
		const page = await browser.newPage()
		await page.goto('https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html')
	    
		const data = await page.$$eval('tbody tr',(rows)=>{    
		    const colums=['no','razon_social','pais','datos_inscripcion','vigencia_hasta','datos_ultima_actualizacion','estado']
	    
		    return rows.map(row=>{
			const cells = row.querySelectorAll('td')
			let cellsArray = Array.from(cells);
	    
			const result = {}
			
			for (let i = 0; i < cellsArray.length; i++) {
			    const element = cellsArray[i];
			    const column = colums[i]
			    result[column]=element.textContent
			}
			return result
			
		    })
		})
	    
		var jsonData = JSON.stringify(data);
	    	res.send(jsonData)

		/* fs.writeFile("data.json", jsonData, "utf8", (error) => {
		    error ? console.log(error):console.log("Write complete");
		  }); */
		await browser.close()
	    })()
})

app.listen(3000,()=>{
	console.log("Server running on port")
})