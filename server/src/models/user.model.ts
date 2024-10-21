import sequelize from "../config/database";
import { BelongsTo, DataTypes,  Model, Sequelize} from "sequelize";

class User extends Model{
 public id!:number
 public firstname!:string
 public lastname!:string
public email!:string
public phone!:string
public gender!:"male" |"female"|"other"
public photopath!:string
public usertype!:"agency"|"jobseeker"
public cvpath!:string
public agency!:string
public hobbies!:string
public agencyid!:number
public password!:string
public status!: "pending" | "accepted" | "declined"
}

User.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        firstname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        phone:{
            type:DataTypes.STRING,
            allowNull:false
        },
        gender:{
            type:DataTypes.ENUM,
            allowNull:false,
            values:["male","female","other"],
        },
          photopath:{
            type:DataTypes.STRING,
            allowNull:false
        },
        usertype:{
            type:DataTypes.ENUM,
            values:["agency","jobseeker"],
            allowNull:false
        },
        cvpath:{
            type:DataTypes.STRING,
            allowNull:true
        },
      agency:{
        type:DataTypes.STRING,
        allowNull:true
      },
      hobbies:{
        type:DataTypes.STRING,
        allowNull:false
    },
    agencyid:{
        type:DataTypes.STRING,
        allowNull:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:true
    },
    status:{
        type:DataTypes.ENUM,
        values:["pending", "accepted", "declined"],
        allowNull: true
    },
        },
        {
            sequelize,
            tableName:"users",
            timestamps:true
        }
)

  
export default User






