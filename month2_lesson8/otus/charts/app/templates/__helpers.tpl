{{/* Generate app label  */}}
{{- define "app.label" -}}
app: {{ print .Release.Name | quote }}
{{- end -}}
