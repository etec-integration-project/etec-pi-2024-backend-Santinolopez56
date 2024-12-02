# Santino Lopez

## Traer Proyecto
```
git clone https://github.com/etec-integration-project/etec-pi-2024-backend-Santinolopez56.git
```


## Entrar al Proyecto
Con este comando entrara en la carpeta
```
cd etec-pi-2024-backend-Santinolopez56
```

## Comandos
Utilizar estos comandos siguiendo su Orden y una por una 
```
docker compose up -d mysqldb
docker compose up -d --build app 
docker compose down app
docker compose up --build

```
## Registrar Usuario

Para poder crear su Usuario tiene que poner los siguientes comandos en una nueva terminal:
```
curl -X POST http://localhost:3000/creacionuser/registrar
    -H "Content-Type: application/json" \
    -d '{"username": "nuevo_usuario", "password": "contraseña123"}'
```
Esos comando le va a permitir crear sus usuarios con exito

## Obtener Usuarios
Y con este comando vas a poder ver los usuarios que has creado
```
curl -X GET http://localhost:3000/creacionuser/usuarios
```
