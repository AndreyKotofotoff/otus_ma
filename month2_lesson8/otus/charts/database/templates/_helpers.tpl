{{/* Generate database app label  */}}
{{- define "database.label" -}}
app_db: {{ print .Release.Name "-db" | quote }}
{{- end -}}
