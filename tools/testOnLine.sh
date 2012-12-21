curl -XGET 'http://hack2012.logisima.com/hack2012/_search' -d '
{ "from" : 0, "size" : 25, "query" :  { "query_string" : {"query" : "*" } }, "filter" : {  "and" : [ {  "geo_distance" : { "distance" : "50", "pin" : { "lat":47.274344, "lon":-1.619405 } } }, { "term" : {  "theme": "tourisme" } }, { "term" : {  "type": "restaurant" } } ]  }, "sort" : [ { "_geo_distance" : { "pin" : { "lat": 47.274344, "lon" : -1.619405  }, "order" : "asc", "unit" : "km" } } ] } 
'
