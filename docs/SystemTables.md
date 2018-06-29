# System Tables

## Cluster
-  [cluser_config][1] stores the authentication key for the cluster.
```
$ r.db("rethinkdb").table("cluser_config")
{
  id: "heartbeat",
  heartbeat_timeout_secs: <NUMBER>
}
```
- [stats][2] statistics about cluster read/write throughput.
```
$ r.db("rethinkdb").table("stats").get(["cluster"])
{
  id: ["cluster"],
  query_engine: {
    queries_per_sec: <NUMBER>,
    read_docs_per_sec: <NUMBER>,
    written_docs_per_sec: <NUMBER>
  }
}
```

## Servers
- [server_config][1] stores server names and tags.
```
$ r.db("rethinkdb").table("server_config")
{
  id: <STRING>,
  name: <STRING>
  cache_size_mb: <NUMBER> || "auto",
  tags: [<STRING>]
}
```

- [server_status][1] status and configuration of tables.
```
$ r.db("rethinkdb").table("server_status")
{
  id: <UUID>,
  name: <STRING>,
  hostname: <STRING>,
  network: {
    canonical_addresses: [
      {
        host:  <STRING>,
        port: <NUMBER>
      }
    ],
    cluster_port: <NUMBER>,
    connected_to: { 
  
    }, 
    http_admin_port: <NUMEBR>,
    reql_port: <NUMBER>,
    time_connected: <DATE>
  },
  process: {
   argv: [
    "rethinkdb"
   ],
   cache_size_mb: <NUMBER>,
   pid: <NUMEBR>,
   time_started: <DATE>,
   version: "rethinkdb 2.3.6~0xenial (GCC 5.3.1)"
  }
}
```
 
- [stats][2]  statistics about server read/write throughput, client connections, and memory usage.
```
$ r.db("rethinkdb").table("stats").get(["server", "31c92680-f70c-4a4b-a49e-b238eb12c023"])
{
  id: ["server", <UUID>],
  server: <UUID> or <STRING>,
  query_engine: {
    queries_per_sec: <NUMBER>,
    queries_total: <NUMBER>,
    read_docs_per_sec: <NUMBER>,
    read_docs_total: <NUMBER>,
    written_docs_per_sec: <NUMBER>,
    written_docs_total: <NUMBER>,
    client_connections: <NUMBER>
  }
}
```

## DB
-  [db_config][1] stores database UUIDs and name
```
$ r.db("rethinkdb").table("db_config").get(["table", "31c92680-f70c-4a4b-a49e-b238eb12c023"])
{
  "id":  <UUID>,
  "name": <STRING>
}
```    


### Tables
- [table_config][1] stores table configurations, including sharding and replication.
```
$ r.db("rethinkdb").table("table_config")
{
  id: <STRING>, 
  name: <STRING>, 
  db: <STRING>, 
  durability: <STRING>, 
  primary_key: <STRING>
  indexs [<STRING>],
  shards: [
    {
      primary_replica: <STRING>(db name),
      replicas: [<STRING>(db name)],
    }
  ]
}
```

- [table_status][1] status and configuration of tables.    
```
$ r.db("rethinkdb").table("table_status")
{
  id: <STRING>, 
  name: <STRING>, 
  db: <STRING>
  shards: [
    primary_replica: [<STRING>(db name)],
    replicas: [<STRING>(db name)]
  ]
}
```
   
- [stats][2] statistics about server read/write throughput, client connections, and memory usage.
```
$ r.db("rethinkdb").table("stats").get(["table", "31c92680-f70c-4a4b-a49e-b238eb12c023"])
{
  id: ["table", <UUID>],
  table: <UUID> or <STRING>,
  db: <UUID> or <STRING>,
  query_engine: {
    read_docs_per_sec: <NUMBER>,
    written_docs_per_sec: <NUMBER>
  }
}
```
```
$ r.db("rethinkdb").table("stats").get(["table_server", "31c92680-f70c-4a4b-a49e-b238eb12c023", "de8b75d1-3184-48f0-b1ef-99a9c04e2be5"]).run(conn, callback);
{
  id: ["table_server", <UUID>, <UUID>]  // table_id, server_id
  server: <UUID> or <STRING>,
  table: <UUID> or <STRING>,
  db: <UUID> or <STRING>,
  query_engine: {
    read_docs_per_sec: <NUMBER>,
    read_docs_total: <NUMBER>,
    written_docs_per_sec: <NUMBER>,
    written_docs_total: <NUMBER>
  },
  storage_engine: {
      cache: {
        in_use_bytes: <NUMBER>
      },
      disk: {
        read_bytes_per_sec: <NUMBER>,
        read_bytes_total: <NUMBER>,
        written_bytes_per_sec: <NUMBER>,
        written_bytes_total: <NUMBER>,
        space_usage: {
          metadata_bytes: <NUMBER>,
          data_bytes: <NUMBER>,
          garbage_bytes: <NUMBER>,
          preallocated_bytes: <NUMBER>
        }
      }
   }
}
```
    

[1]: https://rethinkdb.com/docs/system-tables/
[2]: https://rethinkdb.com/docs/system-stats/