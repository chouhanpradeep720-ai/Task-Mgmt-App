# AWS Secrets Manager + External Secrets Operator

This directory contains the configuration and documentation for integrating **AWS Secrets Manager** with the Task Management Application running on Kubernetes.

The main purpose of this setup is to keep sensitive application credentials outside the Git repository and securely synchronize them from **AWS Secrets Manager → Kubernetes Secret → Backend Pod**.

---

## 📁 Directory Structure

```text
aws-secret-manager/
│
├── README.md
├── secret-store.yaml
└── external-secret.yaml
└── backend-deployment-asm.yaml
```

### Files

| File                   | Purpose                                                                    |
| ---------------------- | -------------------------------------------------------------------------- |
| `README.md`            | Documentation for the complete secret-management setup                     |
| `secret-store.yaml`    | Configures how External Secrets Operator connects to AWS Secrets Manager   |
| `external-secret.yaml` | Defines which AWS secret properties should be synchronized into Kubernetes |
| `backend-deployment-asm.yaml`| Contains the backend deployment configuration for retrieving secrets from AWS Secrets Manager.                                                 |

---

# 🏗️ Architecture

The secret-management architecture used by this project is:

```text
                    AWS
                     │
                     ▼
        ┌──────────────────────────┐
        │   AWS Secrets Manager    │
        │                          │
        │ task-management/         │
        │ backend/prod             │
        └────────────┬─────────────┘
                     │
                     │ GetSecretValue
                     ▼
        ┌──────────────────────────┐
        │          IAM             │
        │                          │
        │ GetSecretValue permission│
        └────────────┬─────────────┘
                     │
                     ▼
        ┌──────────────────────────┐
        │ External Secrets         │
        │ Operator (ESO)           │
        │                          │
        │ Kubernetes               │
        └────────────┬─────────────┘
                     │
                     │ Synchronization
                     ▼
        ┌──────────────────────────┐
        │ Kubernetes Secret        │
        │                          │
        │ backend-aws-secret       │
        └────────────┬─────────────┘
                     │
                     │ secretKeyRef
                     ▼
        ┌──────────────────────────┐
        │ Backend Deployment       │
        │                          │
        │ process.env.DB_PASSWORD  │
        │ process.env.ADMIN_PASS   │
        └──────────────────────────┘
```

---

# 🔐 Why AWS Secrets Manager?

Sensitive values should not be stored directly inside the Git repository.

Examples of sensitive values:

* Database username
* Database password
* Database endpoint
* Admin username
* Admin password
* API keys
* Application credentials

Instead of storing these values in Kubernetes YAML files or source code, this project stores them in **AWS Secrets Manager**.

The application receives them through Kubernetes Secrets.

---

# 🔄 Complete Secret Flow

The complete flow is:

```text
AWS Secrets Manager
        │
        │ GetSecretValue
        ▼
External Secrets Operator
        │
        │ Synchronize
        ▼
Kubernetes Secret
backend-aws-secret
        │
        │ Environment Variables
        ▼
Backend Pod
        │
        ▼
Node.js Application
        │
        ▼
process.env.*
```

The backend application does **not** directly communicate with AWS Secrets Manager.

---

# 1. Prerequisites

Make sure the following are available:

* AWS Account
* AWS Secrets Manager
* Kubernetes Cluster
* `kubectl`
* Helm
* External Secrets Operator
* PostgreSQL / Amazon RDS
* IAM permissions

Check the installed tools:

```bash
aws --version
```

```bash
kubectl version --client
```

```bash
helm version
```

---

# 2. AWS Secrets Manager

Create a secret in AWS Secrets Manager.

For this project, the secret name is:

```text
task-management/backend/prod
```

The secret contains the backend configuration.

Example:

```json
{
  "username": "<DB_USERNAME>",
  "password": "<DB_PASSWORD>",
  "engine": "postgres",
  "host": "<RDS_ENDPOINT>",
  "port": 5432,
  "dbInstanceIdentifier": "<RDS_INSTANCE_ID>",
  "dbname": "task_management",
  "adminUsername": "<ADMIN_USERNAME>",
  "adminPassword": "<ADMIN_PASSWORD>"
}
```

### Important

The values above are examples.

Do **not** put real passwords in:

* README
* Git repository
* Kubernetes YAML
* Dockerfile
* GitHub Actions workflow
* Screenshots

---

# 3. AWS Secret Properties

The AWS secret contains multiple properties.

| AWS Property    | Purpose                      |
| --------------- | ---------------------------- |
| `username`      | PostgreSQL username          |
| `password`      | PostgreSQL database password |
| `host`          | PostgreSQL/RDS endpoint      |
| `port`          | PostgreSQL port              |
| `dbname`        | Database name                |
| `adminUsername` | Application admin username   |
| `adminPassword` | Application admin password   |

The `ExternalSecret` maps these AWS properties to Kubernetes Secret keys.

For example:

```text
AWS Secrets Manager
        │
        ├── username
        │      ↓
        │   DB_USER
        │
        ├── password
        │      ↓
        │   DB_PASSWORD
        │
        ├── host
        │      ↓
        │   DB_HOST
        │
        └── adminPassword
               ↓
           ADMIN_PASSWORD
```

---

# 4. IAM Permission

External Secrets Operator needs permission to read the AWS secret.

The IAM identity used by the Kubernetes workload should have permission similar to:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue"
      ],
      "Resource": "arn:aws:secretsmanager:<AWS_REGION>:<AWS_ACCOUNT_ID>:secret:task-management/backend/prod-*"
    }
  ]
}
```

### Least Privilege

The application only needs to read the secret.

Therefore, the important permission is:

```text
secretsmanager:GetSecretValue
```

Avoid unnecessarily giving:

```text
secretsmanager:*
```

---

# 5. External Secrets Operator

External Secrets Operator, commonly called **ESO**, allows Kubernetes to retrieve secrets from external secret-management systems such as AWS Secrets Manager.

## Add Helm Repository

```bash
helm repo add external-secrets https://charts.external-secrets.io
```

Update the repository:

```bash
helm repo update
```

Install ESO:

```bash
helm install external-secrets \
  external-secrets/external-secrets \
  -n external-secrets \
  --create-namespace
```

---

# 6. Verify External Secrets Operator

Check the ESO namespace:

```bash
kubectl get pods -n external-secrets
```

You should see components similar to:

```text
external-secrets
external-secrets-cert-controller
external-secrets-webhook
```

All components should eventually show:

```text
Running
```

Example:

```text
NAME                                      READY   STATUS
external-secrets-xxxx                     1/1     Running
external-secrets-cert-controller-xxxx     1/1     Running
external-secrets-webhook-xxxx             1/1     Running
```

---

# 7. SecretStore

The `SecretStore` defines how External Secrets Operator connects to AWS Secrets Manager.

File:

```text
secret-store.yaml
```

Example:

```yaml
apiVersion: external-secrets.io/v1
kind: SecretStore

metadata:
  name: aws-secretsmanager
  namespace: task-management

spec:
  provider:
    aws:
      service: SecretsManager
      region: ap-south-1
```

### What does this file do?

It tells ESO:

```text
Use AWS Secrets Manager
        │
        ├── AWS Service: SecretsManager
        │
        └── Region: ap-south-1
```

It does **not** contain the actual database password.

---

# 8. Apply SecretStore

From the `aws-secret-manager` directory:

```bash
kubectl apply -f secret-store.yaml
```

Check the SecretStore:

```bash
kubectl get secretstore -n task-management
```

Expected:

```text
NAME                  READY
aws-secretsmanager    True
```

For more details:

```bash
kubectl describe secretstore \
  aws-secretsmanager \
  -n task-management
```

---

# 9. ExternalSecret

The `ExternalSecret` defines:

1. Which AWS secret should be used.
2. Which properties should be retrieved.
3. What Kubernetes Secret should be created.
4. How often ESO should refresh the secret.

File:

```text
external-secret.yaml
```

Example:

```yaml
apiVersion: external-secrets.io/v1
kind: ExternalSecret

metadata:
  name: backend-external-secret
  namespace: task-management

spec:
  refreshInterval: 1h

  secretStoreRef:
    name: aws-secretsmanager
    kind: SecretStore

  target:
    name: backend-aws-secret
    creationPolicy: Owner

  data:
    - secretKey: DB_USER
      remoteRef:
        key: task-management/backend/prod
        property: username

    - secretKey: DB_PASSWORD
      remoteRef:
        key: task-management/backend/prod
        property: password

    - secretKey: DB_HOST
      remoteRef:
        key: task-management/backend/prod
        property: host

    - secretKey: DB_PORT
      remoteRef:
        key: task-management/backend/prod
        property: port

    - secretKey: DB_NAME
      remoteRef:
        key: task-management/backend/prod
        property: dbname

    - secretKey: ADMIN_USERNAME
      remoteRef:
        key: task-management/backend/prod
        property: adminUsername

    - secretKey: ADMIN_PASSWORD
      remoteRef:
        key: task-management/backend/prod
        property: adminPassword
```

---

# 10. Understanding ExternalSecret

The most important part of the configuration is the mapping.

For example:

```yaml
- secretKey: DB_USER
  remoteRef:
    key: task-management/backend/prod
    property: username
```

This means:

```text
AWS Secrets Manager
        │
        │ task-management/backend/prod
        │
        └── username
              │
              ▼
      Kubernetes Secret
              │
              └── DB_USER
```

Similarly:

```text
AWS property             Kubernetes key
------------------------------------------------
username          →      DB_USER
password          →      DB_PASSWORD
host              →      DB_HOST
port              →      DB_PORT
dbname             →      DB_NAME
adminUsername     →      ADMIN_USERNAME
adminPassword     →      ADMIN_PASSWORD
```

---

# 11. Apply ExternalSecret

Run:

```bash
kubectl apply -f external-secret.yaml
```

Check:

```bash
kubectl get externalsecret -n task-management
```

Expected:

```text
NAME                     READY
backend-external-secret  True
```

---

# 12. Verify Synchronization

Describe the ExternalSecret:

```bash
kubectl describe externalsecret \
  backend-external-secret \
  -n task-management
```

A successful synchronization should show information similar to:

```text
Reason: SecretSynced
Message: secret synced
```

---

# 13. Kubernetes Secret

After successful synchronization, ESO creates:

```text
backend-aws-secret
```

Check it:

```bash
kubectl get secret backend-aws-secret \
  -n task-management
```

The Secret should contain:

```text
DB_USER
DB_PASSWORD
DB_HOST
DB_PORT
DB_NAME
ADMIN_USERNAME
ADMIN_PASSWORD
```

To inspect only the keys:

```bash
kubectl describe secret backend-aws-secret \
  -n task-management
```

> Do not share decoded secret values publicly.

---

# 14. Backend Integration

The backend deployment consumes the Kubernetes Secret using `secretKeyRef`.

Example:

```yaml
env:
  - name: DB_USER
    valueFrom:
      secretKeyRef:
        name: backend-aws-secret
        key: DB_USER

  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef:
        name: backend-aws-secret
        key: DB_PASSWORD

  - name: DB_HOST
    valueFrom:
      secretKeyRef:
        name: backend-aws-secret
        key: DB_HOST

  - name: DB_PORT
    valueFrom:
      secretKeyRef:
        name: backend-aws-secret
        key: DB_PORT

  - name: DB_NAME
    valueFrom:
      secretKeyRef:
        name: backend-aws-secret
        key: DB_NAME

  - name: ADMIN_USERNAME
    valueFrom:
      secretKeyRef:
        name: backend-aws-secret
        key: ADMIN_USERNAME

  - name: ADMIN_PASSWORD
    valueFrom:
      secretKeyRef:
        name: backend-aws-secret
        key: ADMIN_PASSWORD
```

The Node.js application can then access these values using:

```javascript
process.env.DB_USER
process.env.DB_PASSWORD
process.env.DB_HOST
process.env.DB_PORT
process.env.DB_NAME
process.env.ADMIN_USERNAME
process.env.ADMIN_PASSWORD
```

---

# 15. Why `process.env` Is Used

The application does not need to know where the secret came from.

From the application's point of view:

```text
process.env.DB_PASSWORD
```

is enough.

The actual flow is:

```text
AWS Secrets Manager
        ↓
External Secrets Operator
        ↓
Kubernetes Secret
        ↓
Pod Environment Variable
        ↓
process.env.DB_PASSWORD
```

This keeps the application code independent from AWS Secrets Manager.

---

# 16. Secret Refresh Interval

The configuration contains:

```yaml
refreshInterval: 1h
```

This tells External Secrets Operator to periodically check the external secret.

For testing, a shorter interval can be used:

```yaml
refreshInterval: 1m
```

For example:

```yaml
spec:
  refreshInterval: 1h
```

means ESO checks for changes according to the configured one-hour interval.

---

# 17. Secret Rotation

One important advantage of AWS Secrets Manager is secret rotation/change management.

For example, suppose the application admin password changes.

The flow becomes:

```text
Change adminPassword
        │
        ▼
AWS Secrets Manager
        │
        ▼
External Secrets Operator
        │
        ▼
backend-aws-secret
        │
        ▼
Backend Pod restart
        │
        ▼
Node.js application
        │
        ▼
createAdmin()
        │
        ▼
Admin password synchronized
```

---

# 18. Important Kubernetes Behavior

Updating a Kubernetes Secret does **not automatically update environment variables inside an already-running Pod** when those values were loaded through `env` / `secretKeyRef`.

Therefore, after a secret change, restart the backend deployment:

```bash
kubectl rollout restart deployment/backend-deployment \
  -n task-management
```

Check the rollout:

```bash
kubectl rollout status deployment/backend-deployment \
  -n task-management
```

Check the Pods:

```bash
kubectl get pods -n task-management
```

---

# 19. Testing Secret Rotation

To test the complete setup:

### Step 1

Change the required value in AWS Secrets Manager.

For example:

```text
adminPassword
```

Do not expose the actual password in Git or documentation.

### Step 2

Wait for ESO synchronization.

Check:

```bash
kubectl get externalsecret \
  backend-external-secret \
  -n task-management
```

### Step 3

Restart the backend:

```bash
kubectl rollout restart deployment/backend-deployment \
  -n task-management
```

### Step 4

Check rollout:

```bash
kubectl rollout status deployment/backend-deployment \
  -n task-management
```

### Step 5

Check backend logs:

```bash
kubectl logs deployment/backend-deployment \
  -n task-management
```

The application should successfully initialize and synchronize the admin account.

---

# 20. Troubleshooting

## ExternalSecret is not Ready

Run:

```bash
kubectl describe externalsecret \
  backend-external-secret \
  -n task-management
```

Check for:

* Wrong AWS secret name
* Wrong property name
* Incorrect AWS region
* Missing IAM permission
* SecretStore not ready
* ESO not running

---

## SecretStore is not Ready

Run:

```bash
kubectl get secretstore \
  -n task-management
```

Then:

```bash
kubectl describe secretstore \
  aws-secretsmanager \
  -n task-management
```

---

## Check ESO Pods

```bash
kubectl get pods -n external-secrets
```

If a Pod is failing:

```bash
kubectl describe pod <POD_NAME> \
  -n external-secrets
```

Check logs:

```bash
kubectl logs <POD_NAME> \
  -n external-secrets
```

---

## Webhook Timeout

If you see an error similar to:

```text
failed calling webhook
context deadline exceeded
```

check the ESO webhook:

```bash
kubectl get pods -n external-secrets
```

Check services:

```bash
kubectl get svc -n external-secrets
```

Check endpoints:

```bash
kubectl get endpoints -n external-secrets
```

Then inspect the webhook:

```bash
kubectl describe pod \
  -n external-secrets \
  -l app.kubernetes.io/name=external-secrets-webhook
```

---

## Backend Still Uses Old Secret

If AWS Secrets Manager has been updated but the backend still behaves as if it has the old value:

First check:

```bash
kubectl get externalsecret \
  backend-external-secret \
  -n task-management
```

Then restart:

```bash
kubectl rollout restart deployment/backend-deployment \
  -n task-management
```

Then verify:

```bash
kubectl rollout status deployment/backend-deployment \
  -n task-management
```

---

# 21. Security Best Practices

## Never commit real secrets

Never commit:

```text
DB_PASSWORD
ADMIN_PASSWORD
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
Private keys
API tokens
```

to Git.

---

## Do not store sensitive values in ConfigMaps

ConfigMaps should be used for non-sensitive configuration.

Example:

```text
PORT=5000
NODE_ENV=production
```

Sensitive values should come from Kubernetes Secrets.

---

## Use IAM Least Privilege

Only give the required permission:

```text
secretsmanager:GetSecretValue
```

and restrict access to the required AWS secret.

---

## Do not expose secret values in logs

Avoid:

```javascript
console.log(process.env.DB_PASSWORD);
```

or:

```javascript
console.log(process.env.ADMIN_PASSWORD);
```

---

## Do not decode secrets unnecessarily

Avoid exposing secret values using:

```bash
kubectl get secret backend-aws-secret \
  -o jsonpath='{.data.ADMIN_PASSWORD}' | base64 -d
```

unless you are performing a controlled local debugging operation.

Never paste the output into GitHub, Slack, documentation, or screenshots.

---

# 22. What Each Component Does

| Component                 | Responsibility                               |
| ------------------------- | -------------------------------------------- |
| AWS Secrets Manager       | Stores sensitive values                      |
| IAM                       | Controls who can read the secret             |
| SecretStore               | Defines AWS provider configuration           |
| ExternalSecret            | Defines secret synchronization/mapping       |
| External Secrets Operator | Synchronizes AWS → Kubernetes                |
| Kubernetes Secret         | Stores synchronized values inside Kubernetes |
| Backend Deployment        | Injects Secret values into the Pod           |
| Node.js Backend           | Reads values using `process.env.*`           |

---

# 23. Files in This Directory

```text
aws-secret-manager/
│
├── README.md
│
├── secret-store.yaml
│
└── external-secret.yaml
```

### `secret-store.yaml`

Responsible for configuring the AWS Secrets Manager provider:

```text
Kubernetes
    │
    ▼
SecretStore
    │
    ▼
AWS Secrets Manager
```

### `external-secret.yaml`

Responsible for mapping AWS secret properties into Kubernetes Secret keys:

```text
AWS Secrets Manager
        │
        ▼
ExternalSecret
        │
        ▼
backend-aws-secret
```

### `README.md`

Documents the complete setup and troubleshooting process.

---

# 24. Useful Commands

### Check ESO

```bash
kubectl get pods -n external-secrets
```

### Check SecretStore

```bash
kubectl get secretstore -n task-management
```

### Describe SecretStore

```bash
kubectl describe secretstore \
  aws-secretsmanager \
  -n task-management
```

### Check ExternalSecret

```bash
kubectl get externalsecret -n task-management
```

### Describe ExternalSecret

```bash
kubectl describe externalsecret \
  backend-external-secret \
  -n task-management
```

### Check Kubernetes Secret

```bash
kubectl get secret \
  backend-aws-secret \
  -n task-management
```

### Check backend Pods

```bash
kubectl get pods -n task-management
```

### Restart backend

```bash
kubectl rollout restart deployment/backend-deployment \
  -n task-management
```

### Check backend rollout

```bash
kubectl rollout status deployment/backend-deployment \
  -n task-management
```

### Check backend logs

```bash
kubectl logs deployment/backend-deployment \
  -n task-management
```

---

# 25. Complete Setup Flow

The complete setup can be remembered as:

```text
                         AWS
                          │
                          ▼
              ┌─────────────────────┐
              │ AWS Secrets Manager  │
              │                     │
              │ backend/prod        │
              └──────────┬──────────┘
                         │
                         │ GetSecretValue
                         ▼
              ┌─────────────────────┐
              │        IAM          │
              │                     │
              │ Read permission     │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ External Secrets    │
              │ Operator            │
              └──────────┬──────────┘
                         │
                         │ Sync
                         ▼
              ┌─────────────────────┐
              │ Kubernetes Secret   │
              │                     │
              │ backend-aws-secret  │
              └──────────┬──────────┘
                         │
                         │ secretKeyRef
                         ▼
              ┌─────────────────────┐
              │ Backend Deployment  │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ Backend Pod         │
              │                     │
              │ process.env.*       │
              └─────────────────────┘
```

---

# 26. Final Verification Checklist

Before considering the integration complete:

```text
[ ] AWS Secrets Manager secret created

[ ] Required secret properties configured

[ ] IAM GetSecretValue permission configured

[ ] External Secrets Operator installed

[ ] ESO Pods are Running

[ ] SecretStore created

[ ] SecretStore status is Ready

[ ] ExternalSecret created

[ ] ExternalSecret status is Ready

[ ] Kubernetes Secret backend-aws-secret created

[ ] Backend Deployment references backend-aws-secret

[ ] Backend Pod starts successfully

[ ] Database connection works

[ ] Admin authentication works

[ ] Secret rotation tested

[ ] No real secrets committed to Git
```

---

# 27. Summary

This project uses **AWS Secrets Manager** as the central source of truth for sensitive application configuration.

External Secrets Operator connects AWS Secrets Manager with Kubernetes and automatically synchronizes the required values into a Kubernetes Secret.

The final architecture is:

```text
AWS Secrets Manager
        ↓
       IAM
        ↓
External Secrets Operator
        ↓
Kubernetes Secret
        ↓
Backend Pod
        ↓
process.env.*
```

This approach keeps sensitive configuration separate from the application source code and Kubernetes configuration while providing a controlled mechanism for secret synchronization and rotation.

---

## Important Security Note

Never commit real credentials to this repository.

Use placeholders in documentation:

```text
<DB_USERNAME>
<DB_PASSWORD>
<RDS_ENDPOINT>
<ADMIN_USERNAME>
<ADMIN_PASSWORD>
```

The actual values should remain inside the configured secret-management system.
