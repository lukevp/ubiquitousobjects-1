# Ubiquitous Objects Client Specification

## Object Storage

`add(obj)` - Adds an object

## Login

## Logout

- authUrl = endpoint to perform authentication against

## Sync

Real-time sync is a core feature of Ubiquitous Objects.  
`sync(opts)` = Sync to

Opts:

- remoteUrl =
- refreshToken

## Callbacks

## Search

exact property matches

## Usage

The flow of usage is typically

- create a local data store
- set up search index configuration (optional)
-
- if you already have a refresh token, resume sync
-
