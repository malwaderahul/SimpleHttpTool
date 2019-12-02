# SimpleHttpTool

This is a simple Http Tool which can be used to add delayes or error codes to incoming http request. This can be used to perform simple chaos Testing.

With postman tool, simple chaos-header can be injected and request can be made.

An example of http request with chaos-header can be:

    url : http://localhost:3000
    chaos-header : { "responseTime" : 3000, "status" : 404, "likelihood" : 0.7 }
    
      where likelihood is % number of requests that should do chaos.


# Install: 
  > npm install package.json

# Run: 
  > node index.js
    
