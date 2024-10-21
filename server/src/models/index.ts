import sequelize from "../config/database";

async function serverInitialize(){
    sequelize.sync()
    .then(() => {
        console.log("Table synced!");
    })
}

export default serverInitialize;