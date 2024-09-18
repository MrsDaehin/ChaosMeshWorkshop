#/bin/sh
kubectl patch sts postgres-postgresql --patch-file ./db-actions/fix-db.yaml
kubectl delete pod postgres-postgresql-0