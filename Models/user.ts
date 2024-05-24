import { Entity,PrimaryGeneratedColumn, Column } from "typeorm"; 

@Entity()
export default class Users {
    
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({ length:70 }) 
    email:string;

    @Column ({ length: 30 })
    password:string

    constructor (email:string, password:string){
        this.email = email;
        this.password = password;
    }
}