# 🚀 Kubernetes Queue-Based Scalable Node.js System

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22-green?logo=node.js" />
  <img src="https://img.shields.io/badge/Kubernetes-Minukube-blue?logo=kubernetes" />
  <img src="https://img.shields.io/badge/Docker-Containerized-blue?logo=docker" />
  <img src="https://img.shields.io/badge/RabbitMQ-Queue-orange?logo=rabbitmq" />
  <img src="https://img.shields.io/badge/Scalability-KEDA-red" />
</p>

---

## 📌 Overview

This project demonstrates how to design and build a **production-grade scalable backend system** using:

* Node.js (API + Worker)
* Kubernetes (Minikube)
* RabbitMQ (Queue)
* KEDA (Autoscaling)

It walks through the evolution:

```text
Simple API → Scaled API → Distributed System → Production Architecture
```

---

## 🏗️ Architecture Diagram

<p align="center">
  <img src="https://raw.githubusercontent.com/kubernetes/website/main/static/images/docs/kubernetes-cluster-architecture.svg" width="600"/>
</p>

### 🔁 Final Flow

```text
Client
   ↓
Ingress (NGINX)
   ↓
API Pods (Node.js - Producer)
   ↓
RabbitMQ (Queue)
   ↓
Worker Pods (Consumer)
   ↓
Processing Layer
```

---

## 📸 Screenshots / Results

### ⚡ Load Testing (Autocannon)

```bash
autocannon -c 5000 -d 30 http://<minikube-ip>
```

#### Results:

* 🚀 ~4K–5K requests/sec
* ⚡ ~10–20 ms median latency
* 📦 Queue absorbs traffic spikes
* 🔁 Workers process asynchronously

---

## 🎯 Key Achievements

* ✅ Built scalable Node.js microservices
* ✅ Implemented Kubernetes deployments
* ✅ Added Horizontal Pod Autoscaling (HPA)
* ✅ Integrated KEDA for event-driven scaling
* ✅ Introduced RabbitMQ queue architecture
* ✅ Achieved high throughput & low latency
* ✅ Understood real-world bottlenecks

---

## 🧠 Key Learnings

* Scaling pods ≠ solving scalability
* CPU is not always a good scaling metric
* Queue-based architecture is critical
* Autoscaling is reactive (not instant)
* Decoupling systems improves resilience

---

## 📁 Project Structure

```
ip-api-project/
│
├── api/                     # API (Producer)
│   ├── index.js
│   ├── package.json
│   ├── Dockerfile
│
├── worker/                  # Worker (Consumer)
│   ├── worker.js
│   ├── package.json
│   ├── Dockerfile
│
├── k8s/                     # Kubernetes configs
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── rabbitmq.yaml
│   ├── worker-deployment.yaml
│   ├── keda.yaml
│
├── README.md
└── .gitignore
```

---

## ⚙️ Setup & Run (Local)

### 🧱 Start Kubernetes

```bash
minikube start --cpus=4 --memory=8192
eval $(minikube docker-env)
```

---

### 🐳 Build Images

```bash
docker build -t ip-api ./api
docker build -t ip-worker ./worker
```

---

### ☸️ Deploy to Kubernetes

```bash
kubectl apply -f k8s/rabbitmq.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/worker-deployment.yaml
kubectl apply -f k8s/ingress.yaml
```

---

### 🔍 Verify

```bash
kubectl get pods
kubectl logs -l app=ip-api
kubectl logs -l app=worker
```

---

### 🌐 Access API

```bash
minikube ip
curl http://<minikube-ip>
```

---

## ⚡ Load Testing

```bash
npm install -g autocannon
autocannon -c 5000 -d 30 http://<minikube-ip>
```

---

## 🧰 Tech Stack

| Layer         | Technology        |
| ------------- | ----------------- |
| Backend       | Node.js (Express) |
| Container     | Docker            |
| Orchestration | Kubernetes        |
| Messaging     | RabbitMQ          |
| Scaling       | HPA, KEDA         |
| Testing       | Autocannon        |

---

## 🚧 Improvements / Roadmap

* 🔥 KEDA scaling based on queue length
* 🚦 Rate limiting middleware
* ⚡ Redis caching layer
* 🌍 Multi-region deployment
* 📊 Observability (Prometheus + Grafana)
* 🔐 Authentication & security layer

---

## ☁️ Deploy to Cloud

### Kubernetes

* AWS → EKS
* Azure → AKS
* GCP → GKE

---

### Steps

1. Push images to registry:

```bash
docker tag ip-api <registry>/ip-api
docker push <registry>/ip-api
```

2. Update deployment YAML:

```yaml
image: <registry>/ip-api
```

3. Use LoadBalancer:

```yaml
type: LoadBalancer
```

---

### Recommended Cloud Services

* RabbitMQ → AWS MQ / CloudAMQP
* Redis → Elasticache / Azure Cache
* Monitoring → Prometheus / Cloud Monitoring

---

## 🔥 Real-World Use Cases

This architecture is used in:

* 🚗 Uber (ride processing)
* 🎬 Netflix (event streaming)
* 🍔 Swiggy/Zomato (order pipelines)

---

## 🎉 Conclusion

This project demonstrates:

```text
From basic API → to real distributed scalable system
```

👉 A complete journey into **modern backend system design**

---

## 🙌 Contribution

Feel free to fork, improve, and experiment!

---

## 📬 Contact

Open an issue or contribute directly 🚀
