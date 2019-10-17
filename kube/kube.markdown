                                # KUBERNETES
**Container Orcherstration**: Managing the lifecycles of containers especially in large dynamic environments.
    1. Provisioning and deployment of containers.
    2. Redundancy and availability of containers.
    3. Scaling up or removing containers to spread application load evenly across infrastructure.
    4. Movement of containers from one host to another if there is a shortage of resources in a host, or if a host dies.
    5. Allocation of resources between containers
    6. External exposure of services running in a container with the outside world.
    7. Health monitoring of containers.
    8. Configuration of an application in relation to the containers running it.

Container orchestration tools include
    * docker swarm
    * apache mesos
    * kubernetes

The main components in kubernetes include:
1. ***cluster***: A set of nodes with at least one master node and several worker nodes (virtual machines or physical machines)
2. ***kubernetes master***: The master manages the scheduling and deployment of application instances across nodes.
3. ***kublet***: Each kubernetes node runs an agent process called kublet that's responsible for managing the state of the node
                starting, stoping and maintaining
4. ***pods***: Basic scheduling unit which consists of one or more containers guaranteed to be colocated on the host machine and able
                to share resources. Each pod has a unique virtual ip within the cluster, allowing the apps to use ports without port conflicts.
5. ***deployements***: replicas and replicasets***: defines the pods and the number of container instances called replicas, for each pod. Blue green deployement and canary deployements.
6. ***configmap***: defines configurable variables that can be used accross pods.
7. ***job***: The job defines processes that are meant to run once and then die. In a Django context this is where migrations,
              collectstatic and other similar commands fit in.
8. ***service***: how the rest of the kubernetes will see the pods and groups them so they will be seen as single objects.
9. ***ingres***: maps services to exposed endpoint.
10. ***replication controllers***: helps manage and distinguish between replicated pods (replicas).
11. ***replication sets***: improved version of replication controllers. Difference is they are able to use the new set based label selectors.
