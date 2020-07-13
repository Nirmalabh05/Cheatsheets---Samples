
const http = new XMLHttpRequest()

http.open("GET", "https://api.lyrics.ovh/v1/toto/africa")
http.send()

http.onload = () => console.log(http.responseText)
