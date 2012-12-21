curl -XGET 'http://localhost:9200/hack2012/place/_search' -d '
{ "from" : 0, "size" : 25, "query" : { "query_string" : {"query" : "thea*"} }, "filter" : { "or": [ { "term": { "type":"*" } }, { "geo_distance" : { "distance" : "10km", "pin" : { "lat":   47.365464, "lon" : -1.177491 } } } ] } }
'
