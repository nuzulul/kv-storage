const http = require('http')
const fs = require('fs')
var path = require('path')

const serverport =  process.env.PORT || 8080

const server = http.createServer(async(request:any,response:any)=>{

    var filePath = '.' + request.url;
    if (filePath == './'){
		const html = '<a href="test/umd.html">umd</a><br><a href="test/esm.html">esm</a>'
        response.statusCode = 200
		response.setHeader('Content-Type','text/html')
		response.end(html)
	}else{

		var extname = path.extname(filePath);
		var contentType = 'text/html';
		switch (extname) {
			case '.html':
				contentType = 'text/html';
				break;
			case '.js':
				contentType = 'text/javascript';
				break;
			case '.css':
				contentType = 'text/css';
				break;
			case '.json':
				contentType = 'application/json';
				break;
			case '.png':
				contentType = 'image/png';
				break;      
			case '.jpg':
				contentType = 'image/jpg';
				break;
			case '.wav':
				contentType = 'audio/wav';
				break;
			default:
				filePath += filePath+'.js';
				contentType = 'text/javascript';
		}

		fs.readFile(filePath, function(error:any, content:any) {
			if (error) {
				if(error.code == 'ENOENT'){
					fs.readFile('./404.html', function( content:any) {
						response.writeHead(200, { 'Content-Type': contentType });
						response.end(content, 'utf-8');
					});
				}
				else {
					response.writeHead(500);
					response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
					response.end(); 
				}
			}
			else {
				response.writeHead(200, { 'Content-Type': contentType });
				response.end(content, 'utf-8');
			}
		});
	}
	
})

server.listen(serverport,()=>{

	console.log(`Server running at ${serverport}`) 
	
})