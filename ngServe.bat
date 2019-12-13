set tem_a=%date%
rd /s/q  ngLogs
mkdir ngLogs
ng serve --host localhost --port 4567 > ./ngLogs/%tem_a%.log
pause