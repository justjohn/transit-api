transit-api
===========

Node.js APIs for accessing transit services.

The intent of these APIs is to convert the raw output of transit APIs into JavaScript objects.  
It includes little intelligence about what the data should look like.

## Included APIs

NextBus (pass agency to constructor or use setAgency)
- agencyList()
- routeList()
- routeConfig(routeTag)
- predictions(stopId)
- predictions(routeTag, stopTag)

MBTA
- subways (hard coded with list of available lines)
- subway(line)


## License

transit-api is available under a [BSD 2-Clause License][bsd-2], see the LICENSE file for more information.

[bsd-2]:        http://www.opensource.org/licenses/BSD-2-Clause