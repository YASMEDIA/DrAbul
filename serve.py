import os
import http.server
import socketserver

os.chdir("/Users/mac/Desktop/Dr Abdulaziz Abal")

PORT = 8765
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()
