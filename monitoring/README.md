# 📊 Monitoring & Observability

This directory contains the monitoring and observability configuration for the **Task Management Application** running on Kubernetes.

The monitoring stack provides:

* 📈 Application and Kubernetes metrics using **Prometheus**
* 📊 Dashboards and visualization using **Grafana**
* 📝 Centralized logs using **Loki**
* 🚀 Log collection using **Grafana Alloy**
* 🔍 Application metrics discovery using **ServiceMonitor**
* 🌐 External access using **Ingress**
* 🔐 Kubernetes ServiceAccount and RBAC
* ❤️ Application health and readiness monitoring

---

## 📁 Directory Structure

```text
monitoring/
│
├── monitoring-value.yaml
├── service-monitoring.yaml
├── ingress-monitoring.yaml
│
├── looki/
│   └── alloy-values.yaml
│
└── README.md
```

### Files

| File                      | Purpose                                         |
| ------------------------- | ----------------------------------------------- |
| `monitoring-value.yaml`   | Prometheus + Grafana configuration              |
| `service-monitoring.yaml` | ServiceMonitor for application metrics          |
| `ingress-monitoring.yaml` | Ingress configuration for monitoring services   |
| `looki/alloy-values.yaml` | Grafana Alloy configuration for collecting logs |
| `README.md`               | Monitoring documentation                        |

---

# 🏗️ Monitoring Architecture

```text
                         Internet
                            │
                            ▼
                    Load Balancer / NGINX
                            │
                            ▼
                       Kubernetes
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ▼              ▼              ▼
          Grafana       Prometheus      Application
             │              │              │
             │              │          /metrics
             │              │              │
             │         ServiceMonitor      │
             │              │              │
             │              ▼              │
             │         Metrics Data ◄──────┘
             │
             │
             ▼
            Loki
             ▲
             │
             │ Logs
             │
       Grafana Alloy
             ▲
             │
      Kubernetes Pods
```

### Main Flow

```text
Application
     │
     ├──────────► /metrics ──────► Prometheus ──────► Grafana
     │
     └──────────► Container Logs ─► Alloy ─► Loki ─► Grafana
```

---

# 🧰 Monitoring Components

| Component      | Responsibility                     |
| -------------- | ---------------------------------- |
| Prometheus     | Collects and stores metrics        |
| Grafana        | Dashboards and visualization       |
| Loki           | Stores logs                        |
| Grafana Alloy  | Collects and forwards logs to Loki |
| ServiceMonitor | Configures Prometheus scraping     |
| Ingress        | Provides external access           |
| ServiceAccount | Kubernetes identity                |
| RBAC           | Controls Kubernetes permissions    |

---

# 1. Create Monitoring Namespace

```bash
kubectl create namespace monitoring
```

Verify:

```bash
kubectl get namespace monitoring
```

If it already exists, continue with the next step.

---

# 2. Install Helm Repositories

Add Prometheus Community:

```bash
helm repo add prometheus-community \
  https://prometheus-community.github.io/helm-charts
```

Add Grafana:

```bash
helm repo add grafana \
  https://grafana.github.io/helm-charts
```

Update repositories:

```bash
helm repo update
```

Verify:

```bash
helm repo list
```

---

# 3. Install Prometheus + Grafana

The project uses the `kube-prometheus-stack`.

Install:

```bash
helm upgrade --install monitoring \
  prometheus-community/kube-prometheus-stack \
  -n monitoring \
  -f monitoring-value.yaml
```

Check Helm release:

```bash
helm list -n monitoring
```

Check pods:

```bash
kubectl get pods -n monitoring
```

Important components include:

```text
Prometheus
Grafana
Alertmanager
Prometheus Operator
Node Exporter
kube-state-metrics
```

---

# 4. Verify Prometheus

Check Prometheus:

```bash
kubectl get pods -n monitoring | grep prometheus
```

Check service:

```bash
kubectl get svc -n monitoring | grep prometheus
```

Port-forward:

```bash
kubectl port-forward \
  -n monitoring \
  svc/monitoring-kube-prometheus-prometheus \
  9090:9090
```

Open:

```text
http://localhost:9090
```

Check:

```text
Status → Targets
```

The application target should show:

```text
UP
```

---

# 5. ServiceMonitor

The `service-monitoring.yaml` file is used to tell Prometheus how to discover the Task Management backend.

Apply:

```bash
kubectl apply -f service-monitoring.yaml
```

Check:

```bash
kubectl get servicemonitor -A
```

Describe:

```bash
kubectl describe servicemonitor \
  -n monitoring \
  <SERVICE-MONITOR-NAME>
```

### ServiceMonitor Flow

```text
Backend
   │
   │ /metrics
   ▼
Kubernetes Service
   │
   ▼
ServiceMonitor
   │
   ▼
Prometheus Operator
   │
   ▼
Prometheus
```

---

# 6. Application Metrics

The backend exposes Prometheus metrics through:

```text
/metrics
```

Example:

```bash
curl http://localhost:5000/metrics
```

The application contains custom metrics such as:

```text
db_pool_total_connections
db_pool_idle_connections
db_pool_waiting_requests
db_pool_active_connections

db_queries_total
db_query_duration_seconds

login_attempts_total

tasks_created_total
tasks_completed_total
tasks_deleted_total
```

These metrics allow the application to be monitored at the business and infrastructure level.

---

# 7. Install Loki

Loki is responsible for storing logs.

Install:

```bash
helm upgrade --install loki \
  grafana/loki \
  -n monitoring
```

Check:

```bash
helm list -n monitoring
```

Check Loki pods:

```bash
kubectl get pods -n monitoring | grep loki
```

Check services:

```bash
kubectl get svc -n monitoring | grep loki
```

---

# 8. Grafana Alloy

Grafana Alloy is used as the log collector.

Unlike Promtail, this setup uses:

```text
Grafana Alloy
```

The configuration is stored in:

```text
looki/alloy-values.yaml
```

Alloy collects Kubernetes/container logs and sends them to Loki.

### Log Flow

```text
Kubernetes Pod
      │
      ▼
Container Logs
      │
      ▼
Grafana Alloy
      │
      ▼
Loki
      │
      ▼
Grafana
```

---

# 9. Install Grafana Alloy

Install Alloy using the Grafana Helm chart and the project configuration:

```bash
helm upgrade --install alloy \
  grafana/alloy \
  -n monitoring \
  -f looki/alloy-values.yaml
```

Check Helm:

```bash
helm list -n monitoring
```

Check Alloy:

```bash
kubectl get pods -n monitoring | grep alloy
```

Check Alloy DaemonSet:

```bash
kubectl get daemonset -n monitoring
```

Alloy normally runs as a **DaemonSet**, allowing log collection from Kubernetes nodes.

---

# 10. Verify Alloy

Check Alloy logs:

```bash
kubectl logs \
  -n monitoring \
  -l app.kubernetes.io/name=alloy
```

If the label is different, find the pod first:

```bash
kubectl get pods -n monitoring | grep alloy
```

Then:

```bash
kubectl logs -n monitoring <ALLOY-POD-NAME>
```

Look for successful log discovery and forwarding to Loki.

---

# 11. Grafana

Grafana is used to visualize both metrics and logs.

Check:

```bash
kubectl get pods -n monitoring | grep grafana
```

Port-forward:

```bash
kubectl port-forward \
  -n monitoring \
  svc/monitoring-grafana \
  3000:80
```

Open:

```text
http://localhost:3000
```

---

# 12. Grafana Admin Password

Find the Grafana secret:

```bash
kubectl get secret -n monitoring | grep grafana
```

Get the password:

```bash
kubectl get secret \
  -n monitoring \
  monitoring-grafana \
  -o jsonpath="{.data.admin-password}" | base64 -d
```

Default username:

```text
admin
```

> Never commit the Grafana password or other credentials to Git.

---

# 13. Grafana Data Sources

Grafana should use:

```text
Prometheus
Loki
```

### Prometheus

Find the service:

```bash
kubectl get svc -n monitoring | grep prometheus
```

Typical internal URL:

```text
http://monitoring-kube-prometheus-prometheus.monitoring.svc.cluster.local:9090
```

### Loki

Find the service:

```bash
kubectl get svc -n monitoring | grep loki
```

Use the actual Loki service name generated by the installed chart.

---

# 14. Configure Loki in Grafana

Open:

```text
Grafana
  ↓
Connections
  ↓
Data Sources
  ↓
Add new data source
  ↓
Loki
```

Enter the Loki Kubernetes service URL.

For example:

```text
http://loki-gateway.monitoring.svc.cluster.local
```

Use the actual service shown by:

```bash
kubectl get svc -n monitoring | grep loki
```

Click:

```text
Save & Test
```

The data source should report a successful connection.

---

# 15. View Logs in Grafana

Go to:

```text
Grafana
  ↓
Explore
  ↓
Select Loki
```

Example LogQL:

```logql
{namespace="task-management"}
```

Backend logs:

```logql
{namespace="task-management", container="backend"}
```

Search errors:

```logql
{namespace="task-management"} |= "error"
```

Search warnings:

```logql
{namespace="task-management"} |= "warning"
```

---

# 16. Ingress

The monitoring services can be exposed using:

```text
ingress-monitoring.yaml
```

Apply:

```bash
kubectl apply -f ingress-monitoring.yaml
```

Check:

```bash
kubectl get ingress -n monitoring
```

Detailed information:

```bash
kubectl describe ingress -n monitoring
```

### Ingress Flow

```text
Internet
   │
   ▼
AWS Load Balancer
   │
   ▼
NGINX Ingress Controller
   │
   ├──────────────► Grafana
   │
   └──────────────► Prometheus
```

This allows monitoring services to be accessed without exposing individual Kubernetes Pods directly.

---

# 17. Monitoring ServiceAccount & RBAC

Monitoring components use Kubernetes ServiceAccounts.

Check:

```bash
kubectl get serviceaccount -n monitoring
```

Check ClusterRoles:

```bash
kubectl get clusterrole | grep monitoring
```

Check ClusterRoleBindings:

```bash
kubectl get clusterrolebinding | grep monitoring
```

The basic RBAC flow is:

```text
ServiceAccount
      │
      ▼
Role / ClusterRole
      │
      ▼
RoleBinding / ClusterRoleBinding
      │
      ▼
Kubernetes API
```

This allows monitoring components to discover required Kubernetes resources.

---

# 18. Health & Readiness Monitoring

The Task Management backend should expose:

```text
/health
/ready
/metrics
```

### Health

Used by Kubernetes to determine whether the application is alive.

```text
/health
```

### Readiness

Used to determine whether the application is ready to receive traffic.

```text
/ready
```

### Metrics

Used by Prometheus.

```text
/metrics
```

Flow:

```text
             Backend
                │
      ┌─────────┼─────────┐
      ▼         ▼         ▼
   /health    /ready   /metrics
      │         │         │
      ▼         ▼         ▼
   Liveness  Readiness Prometheus
```

---

# 19. Prometheus Queries

Example CPU query:

```promql
rate(container_cpu_usage_seconds_total[5m])
```

Memory:

```promql
container_memory_working_set_bytes
```

Database queries:

```promql
rate(db_queries_total[5m])
```

Login attempts:

```promql
rate(login_attempts_total[5m])
```

Tasks created:

```promql
rate(tasks_created_total[5m])
```

Tasks completed:

```promql
rate(tasks_completed_total[5m])
```

---

# 20. Useful Kubernetes Commands

### Monitoring resources

```bash
kubectl get all -n monitoring
```

### Pods

```bash
kubectl get pods -n monitoring -o wide
```

### Services

```bash
kubectl get svc -n monitoring
```

### Ingress

```bash
kubectl get ingress -n monitoring
```

### ServiceMonitor

```bash
kubectl get servicemonitor -A
```

### PVC

```bash
kubectl get pvc -n monitoring
```

### Events

```bash
kubectl get events \
  -n monitoring \
  --sort-by=.lastTimestamp
```

---

# 21. Troubleshooting

## Prometheus Target is DOWN

Check:

```bash
kubectl get servicemonitor -A
kubectl get svc -n task-management
kubectl get endpoints -n task-management
kubectl get pods -n task-management
```

Verify that:

* ServiceMonitor selector matches the backend Service
* Backend Service has endpoints
* Backend exposes `/metrics`
* Correct port is configured
* Prometheus Operator is running

---

## Grafana is Not Accessible

Check:

```bash
kubectl get pods -n monitoring | grep grafana
kubectl get svc -n monitoring | grep grafana
kubectl get ingress -n monitoring
```

Test using port-forward:

```bash
kubectl port-forward \
  -n monitoring \
  svc/monitoring-grafana \
  3000:80
```

Then open:

```text
http://localhost:3000
```

---

## Loki is Not Receiving Logs

Check:

```bash
kubectl get pods -n monitoring | grep loki
```

Check Alloy:

```bash
kubectl get pods -n monitoring | grep alloy
```

Check Alloy logs:

```bash
kubectl logs -n monitoring <ALLOY-POD-NAME>
```

Check Loki logs:

```bash
kubectl logs -n monitoring <LOKI-POD-NAME>
```

Verify that:

```text
Alloy → Loki
```

connectivity is working.

---

# 22. Helm Management

List releases:

```bash
helm list -n monitoring
```

Get Prometheus/Grafana values:

```bash
helm get values monitoring -n monitoring
```

Get all values:

```bash
helm get values monitoring \
  -n monitoring \
  --all
```

Upgrade monitoring:

```bash
helm upgrade monitoring \
  prometheus-community/kube-prometheus-stack \
  -n monitoring \
  -f monitoring-value.yaml
```

Upgrade Alloy:

```bash
helm upgrade alloy \
  grafana/alloy \
  -n monitoring \
  -f looki/alloy-values.yaml
```

---

# 23. Complete Installation

For a fresh monitoring setup:

```bash
cd ~/Task-Mgmt-App/monitoring
```

Create namespace:

```bash
kubectl create namespace monitoring
```

Add repositories:

```bash
helm repo add prometheus-community \
  https://prometheus-community.github.io/helm-charts

helm repo add grafana \
  https://grafana.github.io/helm-charts

helm repo update
```

Install Prometheus + Grafana:

```bash
helm upgrade --install monitoring \
  prometheus-community/kube-prometheus-stack \
  -n monitoring \
  -f monitoring-value.yaml
```

Apply ServiceMonitor:

```bash
kubectl apply -f service-monitoring.yaml
```

Install Loki:

```bash
helm upgrade --install loki \
  grafana/loki \
  -n monitoring
```

Install Alloy:

```bash
helm upgrade --install alloy \
  grafana/alloy \
  -n monitoring \
  -f looki/alloy-values.yaml
```

Apply Ingress:

```bash
kubectl apply -f ingress-monitoring.yaml
```

Finally verify:

```bash
kubectl get pods -n monitoring
```

---

# 24. Final Monitoring Flow

The complete observability flow of the Task Management Application is:

```text
                         USER
                           │
                           ▼
                    AWS Load Balancer
                           │
                           ▼
                    NGINX Ingress
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
          Application                 Grafana
              │                         │
       ┌──────┴──────┐             ┌────┴────┐
       │             │             │         │
       ▼             ▼             ▼         ▼
   /metrics        Logs       Prometheus    Loki
       │             │             ▲         ▲
       ▼             ▼             │         │
  Prometheus      Alloy ───────────┘         │
       │                                     │
       └──────────────► Grafana ◄────────────┘
```

---

# 🎯 Observability Pillars

This project follows the three major observability pillars:

```text
                OBSERVABILITY
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
     Metrics        Logs        Traces
        │            │            │
        ▼            ▼            ▼
   Prometheus       Loki       Future
        │            │
        └──────┬─────┘
               ▼
            Grafana
```

### Metrics

Prometheus monitors:

* CPU
* Memory
* Kubernetes resources
* Database connections
* Database queries
* Login attempts
* Tasks created
* Tasks completed
* Application performance

### Logs

Loki + Alloy provide:

* Application logs
* Backend logs
* Kubernetes container logs
* Error logs
* Warning logs

### Traces

Distributed tracing can be added later using:

* OpenTelemetry
* Grafana Tempo
* AWS X-Ray

---

# ✅ Final Checklist

Before considering monitoring complete:

```text
[✓] Monitoring namespace created
[✓] Prometheus installed
[✓] Grafana installed
[✓] Loki installed
[✓] Grafana Alloy installed
[✓] ServiceMonitor configured
[✓] Application /metrics endpoint working
[✓] Grafana Prometheus datasource working
[✓] Grafana Loki datasource working
[✓] Alloy collecting logs
[✓] Loki receiving logs
[✓] Grafana displaying metrics
[✓] Grafana displaying logs
[✓] Monitoring Ingress configured
[✓] ServiceAccount/RBAC verified
[✓] Health/Readiness probes configured
```

---

# 🚀 Project Monitoring Stack

```text
Kubernetes
│
├── Prometheus
│   └── Metrics
│
├── Grafana
│   └── Dashboards
│
├── Loki
│   └── Logs
│
├── Grafana Alloy
│   └── Log Collection
│
├── ServiceMonitor
│   └── Application Metrics Discovery
│
└── Ingress
    └── External Monitoring Access
```

**Project:** Task Management Application
**Platform:** Kubernetes / AWS EKS
**Monitoring:** Prometheus + Grafana
**Logging:** Loki + Grafana Alloy
**Ingress:** NGINX Ingress
**Metrics Discovery:** Prometheus ServiceMonitor
