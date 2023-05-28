# Architecture Overview

# Technical Implementation

The Ubiquitous Objects server is built around the excellent Microsoft .NET Core framework. This framework is extremely performant, reliable, and in heavy use by many companies.

Several open-source technologies are added to the .NET core runtime:

Entity Framework is used for data access. This allows UO Server to support the following backend databases, including full replication between different database technologies:

- SQLite
- PostgreSQL
- MySQL
- MariaDB
- Microsoft SQL Server
- In-Memory

(App Metrics)[https://www.app-metrics.io/] is used for measuring relevant metrics, which supports pushing metrics to Grafana, InfluxDB, Graphite, Prometheus, etc.

## Authentication / Authorization

Identity Server 4 is used for identity, both for replication between server peers and between clients and servers.

### Authentication / Connection Lifecycle

A refresh token is issued against the authorization backend. This token is good for x days (30 by default). It is usable for creating access tokens.
An expiration is assigned to every token and it is checked on every request for expiration. If it is within 5 minutes of expiring, the server will respond with a PendingExpiration property set. If this property is returned, the client should terminate their connection ASAP, and acquire a new token using the refresh token.

TODO: default to authorization required.

## Rate Limiting

## Anti-Herd

## Replication

Replication to clients and replication between servers functions the same from a technical perspective.

### Streaming Replication

Ubiquitous Objects uses ASP.NET Core SignalR which operates over WebSockets. It uses async enumerables and RxJS observables to support bi-directional streaming of all state changes. See: https://docs.microsoft.com/en-us/aspnet/core/signalr/streaming?view=aspnetcore-3.1 for more information.

### Required Schema

Objects heirarchies are required to be directed acyclic graphs. The reasons for this limitation are discussed further here: TODO. This is so that topological sorting can be performed on the schema and nested types can be synchronized in a consistent way. Alternatively we could relax this constraint if every change was in a commit changeset, so that deep changes in the object graph were specified at once instead of on each object. It would still not allow cycles though so I'm not sure this is better from a constraint standpoint, but it would avoid the data getting into an inconsistent state if the change state of a graph was partially synced (eg. changing the phone and address objects tied to a user at the same time, there could be a situation where the phone was changed but the address was not).

## Change Tracking

Changes to objects are allowed to operate in several modes. The most basic, and default mode, is local. This means that as soon as the local system approves a write, it is considered applied. The levels are as follows:

- local
- remote (write acknowledged by a single server, fastest real-time change but does not work in offline mode)
- remote-quorum (write must be acknowledged by a quorum)
- remote-consensus

## Future

TODO: Metrics such as # of requests per second, average response time, etc. will be written to AppMetrics
TODO: guide for hooking Grafana up to AppMetrics for dashboard
