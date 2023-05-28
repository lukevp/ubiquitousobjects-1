# Application Architecture

1 web worker coordinates the LokiJS and persistence, and the sync.

- It opens a SignalR connection.
  SignalR connection is made from web worker. Anytime a

# Search Architecture

## Multithreading

The index is split up into 16 separate indexes and items are added to each index at random.
This helps them be distributed randomly even if ordered data is inserted (that is why round-robin is not used).

x (where x <= 16) web workers are started and coordinate to do map/reduce for search.  
Each gets a % of indexes based on the # of workers.
for example, if there are 16 workers each one gets 1 index. If there are 4 workers then each gets 4,
if there are 3 workers then the first 2 workers get 5, and the 3rd gets 6 indexes.
One worker is always the collector and it waits for all result sets and concatenates them and re-emits them.
each worker reports a shardedResult and the final collector emits the combinedResult.
The map could be either

## Distributed indexing

During indexing, a random index ID is chosen and dispatched along with the document to be indexed.

## Distributed Querying

1 web worker coordinates the reduce on search

https://github.com/pubkey/broadcast-channel#using-the-leaderelection
