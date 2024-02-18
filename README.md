# NodeJS Project Setup

## Project setup

```
npm install
```

## Sequelize Setup `cd src/app`

```
npx sequelize-cli init
```

## Create Models and Associate them

```
sequelize model:generate --name User --attributes firstName:string, lastName:string, email:string

sequelize model:generate --name Post --attributes title:string, content:text


sequelize db:migrate

```

## Run Tests

```
npm start
```
