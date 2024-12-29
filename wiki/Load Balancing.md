Load balancing is the **practice of distributing computational workloads between two or more computers**.
On the Internet, load balancing is often employed to divide network traffic among several servers.
This reduces the strain on each server and makes the servers more efficient, speeding up performance and reducing latency.

## How does load balancing work?
Load balancing is handled by a tool or application called a load balancer.
A load balancer can be either hardware-based or software-based.
Hardware load balancers require the installation of a dedicated load balancing device; software-based load balancers can run on a server, on a virtual machine, or in the cloud.

## Server Monitoring
Dynamic load balancers must be aware of server health: their current status, how well they are performing, etc.
Dynamic load balancers monitor servers by performing regular server **health check**s.
If a server or group of servers is performing slowly, the load balancer distributes less traffic to it.
If a server or group of servers fails completely, the load balancer reroutes traffic to another group of servers, a process known as **failover**.

*Also read [[CDN]]*